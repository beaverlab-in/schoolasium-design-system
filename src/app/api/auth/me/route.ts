import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB }  from "@/lib/db";
import { Employee }   from "@/models/Employee";

export async function GET(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    await connectDB();
    const emp = await Employee.findById(payload.sub);
    if (!emp || emp.status === "disabled") {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({ user: (emp as any).toPublic() });
  } catch (err) {
    console.error("[GET /api/auth/me]", err);
    // Fall back to JWT payload if DB is temporarily unreachable
    return NextResponse.json({
      user: {
        id:         payload.sub,
        email:      payload.email,
        name:       payload.name,
        role:       payload.role,
        department: payload.department,
        avatar:     payload.avatar,
      },
    });
  }
}
