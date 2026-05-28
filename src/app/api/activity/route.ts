import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB }  from "@/lib/db";
import { Activity }   from "@/models/Activity";
import type { ActivityType } from "@/models/Activity";

// POST /api/activity — log an audit event (any authenticated user)
export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);
  // Allow unauthenticated for failed_login events; block everything else
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { type, detail, resourceId } = body as {
    type: ActivityType;
    detail: string;
    resourceId?: string;
  };

  const allowedUnauthenticated: ActivityType[] = ["failed_login"];
  if (!user && !allowedUnauthenticated.includes(type)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const ua = request.headers.get("user-agent") ?? "";
    function parseBrowser(s: string) {
      if (s.includes("Edg"))     return "Edge";
      if (s.includes("Chrome"))  return "Chrome";
      if (s.includes("Firefox")) return "Firefox";
      if (s.includes("Safari"))  return "Safari";
      return "Other";
    }
    function parseOS(s: string) {
      if (s.includes("Windows")) return "Windows";
      if (s.includes("Mac"))     return "macOS";
      if (s.includes("Linux"))   return "Linux";
      if (s.includes("Android")) return "Android";
      if (s.includes("iPhone") || s.includes("iPad")) return "iOS";
      return "Other";
    }

    await Activity.create({
      employeeId:   user?.sub        ?? "unknown",
      employeeName: user?.name       ?? (body.employeeName ?? "Guest"),
      type,
      detail,
      resourceId:   resourceId       ?? null,
      ip:      request.headers.get("x-forwarded-for") ?? "unknown",
      device:  ua.includes("Mobi") ? "Mobile" : "Desktop",
      browser: parseBrowser(ua),
      os:      parseOS(ua),
      sessionId: user?.sub?.slice(-6) ?? "",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/activity]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
