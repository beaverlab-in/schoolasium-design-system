import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie, getUserFromRequest } from "@/lib/auth";
import { connectDB }   from "@/lib/db";
import { Activity }    from "@/models/Activity";

export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (user) {
    try {
      await connectDB();
      await Activity.create({
        employeeId:   user.sub,
        employeeName: user.name,
        type: "logout",
        detail: "Signed out",
        ip:      request.headers.get("x-forwarded-for") ?? "unknown",
        device:  "unknown", browser: "unknown", os: "unknown",
        sessionId: "",
      });
    } catch { /* best-effort */ }
  }

  await clearAuthCookie();
  return NextResponse.json({ ok: true });
}
