import { NextRequest, NextResponse } from "next/server";
import { connectDB }      from "@/lib/db";
import { Employee }       from "@/models/Employee";
import { verifyPassword, signToken, setAuthCookie } from "@/lib/auth";
import { Activity }       from "@/models/Activity";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    await connectDB();

    // Find employee — include passwordHash which is excluded by default
    const emp = await Employee.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");

    if (!emp) {
      // Log failed attempt
      await Activity.create({
        employeeId: "unknown", employeeName: String(email),
        type: "failed_login", detail: `Failed login — no account found: ${email}`,
        ip: request.headers.get("x-forwarded-for") ?? "unknown",
        device: "unknown", browser: "unknown", os: "unknown", sessionId: "",
      });
      return NextResponse.json({ error: "No account found. Contact your admin." }, { status: 401 });
    }

    if (emp.status === "disabled") {
      await Activity.create({
        employeeId: String(emp._id), employeeName: emp.name,
        type: "failed_login", detail: "Failed login — account disabled",
        ip: request.headers.get("x-forwarded-for") ?? "unknown",
        device: "unknown", browser: "unknown", os: "unknown", sessionId: "",
      });
      return NextResponse.json({ error: "This account has been disabled. Contact your admin." }, { status: 403 });
    }

    const valid = await verifyPassword(password, emp.passwordHash);
    if (!valid) {
      await Activity.create({
        employeeId: String(emp._id), employeeName: emp.name,
        type: "failed_login", detail: "Failed login — incorrect password",
        ip: request.headers.get("x-forwarded-for") ?? "unknown",
        device: "unknown", browser: "unknown", os: "unknown", sessionId: "",
      });
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    // Update lastLogin
    emp.lastLogin = new Date();
    await emp.save();

    // Create JWT
    const token = signToken({
      sub:        String(emp._id),
      email:      emp.email,
      name:       emp.name,
      role:       emp.role,
      department: emp.department,
      avatar:     emp.avatar,
    });

    await setAuthCookie(token);

    // Log successful login
    await Activity.create({
      employeeId:   String(emp._id),
      employeeName: emp.name,
      type: "login",
      detail: "Signed in",
      ip:      request.headers.get("x-forwarded-for") ?? "unknown",
      device:  request.headers.get("user-agent")?.includes("Mobi") ? "Mobile" : "Desktop",
      browser: parseBrowser(request.headers.get("user-agent") ?? ""),
      os:      parseOS(request.headers.get("user-agent") ?? ""),
      sessionId: token.slice(-8),
    });

    return NextResponse.json({ user: (emp as any).toPublic() });
  } catch (err) {
    console.error("[POST /api/auth/signin]", err);
    return NextResponse.json({ error: "Server error. Try again." }, { status: 500 });
  }
}

function parseBrowser(ua: string): string {
  if (ua.includes("Edg"))     return "Edge";
  if (ua.includes("Chrome"))  return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari"))  return "Safari";
  return "Other";
}

function parseOS(ua: string): string {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac"))     return "macOS";
  if (ua.includes("Linux"))   return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Other";
}
