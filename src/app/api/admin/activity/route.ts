import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { hasPermission }      from "@/lib/rbac";
import { connectDB }  from "@/lib/db";
import { Activity }   from "@/models/Activity";

// GET /api/admin/activity — paginated audit log (admin+)
export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user || !hasPermission(user.role, "admin:view_activity")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get("employeeId") ?? "";
    const type       = searchParams.get("type")       ?? "";
    const page       = Number(searchParams.get("page")  ?? "1");
    const limit      = Number(searchParams.get("limit") ?? "100");

    const query: Record<string, unknown> = {};
    if (employeeId) query.employeeId = employeeId;
    if (type)       query.type       = type;

    const [events, total] = await Promise.all([
      Activity.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Activity.countDocuments(query),
    ]);

    const data = events.map((e: any) => ({
      id:           String(e._id),
      employeeId:   e.employeeId,
      employeeName: e.employeeName,
      type:         e.type,
      detail:       e.detail,
      resourceId:   e.resourceId ?? null,
      ip:           e.ip,
      device:       e.device,
      browser:      e.browser,
      os:           e.os,
      sessionId:    e.sessionId,
      timestamp:    e.createdAt.toISOString(),
    }));

    return NextResponse.json({ events: data, total, page, limit });
  } catch (err) {
    console.error("[GET /api/admin/activity]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
