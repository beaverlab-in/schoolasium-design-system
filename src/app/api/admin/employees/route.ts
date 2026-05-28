import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { hasPermission }      from "@/lib/rbac";
import { connectDB }          from "@/lib/db";
import { Employee }           from "@/models/Employee";
import { Activity }           from "@/models/Activity";
import { hashPassword }       from "@/lib/auth";
import type { Role }          from "@/lib/rbac";

// GET /api/admin/employees — list all employees (admin+)
export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user || !hasPermission(user.role, "admin:manage_employees")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search   = searchParams.get("search") ?? "";
    const role     = searchParams.get("role")   ?? "";
    const dept     = searchParams.get("dept")   ?? "";
    const status   = searchParams.get("status") ?? "";
    const page     = Number(searchParams.get("page")  ?? "1");
    const limit    = Number(searchParams.get("limit") ?? "50");

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name:  { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role)   query.role       = role;
    if (dept)   query.department = dept;
    if (status) query.status     = status;

    const [employees, total] = await Promise.all([
      Employee.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Employee.countDocuments(query),
    ]);

    const data = employees.map((e: any) => ({
      id:         String(e._id),
      name:       e.name,
      email:      e.email,
      role:       e.role,
      department: e.department,
      status:     e.status,
      avatar:     e.avatar,
      createdBy:  e.createdBy,
      lastLogin:  e.lastLogin?.toISOString() ?? null,
      createdAt:  e.createdAt.toISOString(),
    }));

    return NextResponse.json({ employees: data, total, page, limit });
  } catch (err) {
    console.error("[GET /api/admin/employees]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/employees — create new employee (admin+)
export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user || !hasPermission(user.role, "admin:manage_employees")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { name, email, role, department, tempPassword } = await request.json();

    if (!name || !email || !role || !department || !tempPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await connectDB();

    const existing = await Employee.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(tempPassword);

    const parts  = name.trim().split(/\s+/);
    const avatar = parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();

    const emp = await Employee.create({
      name:  name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role:  role as Role,
      department,
      status: "active",
      avatar,
      createdBy: user.sub,
    });

    await Activity.create({
      employeeId:   user.sub,
      employeeName: user.name,
      type: "account_created",
      detail: `Created employee account: ${name} (${email}) — role: ${role}`,
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      device: "unknown", browser: "unknown", os: "unknown", sessionId: "",
    });

    return NextResponse.json({ employee: (emp as any).toPublic() }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/employees]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
