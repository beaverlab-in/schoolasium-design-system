import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, hashPassword } from "@/lib/auth";
import { hasPermission, canManageRole }     from "@/lib/rbac";
import { connectDB }  from "@/lib/db";
import { Employee }   from "@/models/Employee";
import { Activity }   from "@/models/Activity";
import mongoose       from "mongoose";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/admin/employees/[id] — update role, status, department, or reset password
export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = getUserFromRequest(request);
  if (!user || !hasPermission(user.role, "admin:manage_employees")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectDB();
    const target = await Employee.findById(id);
    if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Check role hierarchy — cannot modify someone of equal or higher role
    if (!canManageRole(user.role, target.role) && String(target._id) !== user.sub) {
      return NextResponse.json({ error: "Insufficient permissions to modify this account." }, { status: 403 });
    }

    const body = await request.json();
    const allowed = ["name", "role", "department", "status"] as const;
    const updates: Record<string, unknown> = {};

    for (const key of allowed) {
      if (key in body) updates[key] = body[key];
    }

    // Password reset
    if (body.newPassword) {
      updates.passwordHash = await hashPassword(body.newPassword);
    }

    Object.assign(target, updates);
    await target.save();

    // Audit
    const detail = body.status
      ? `${body.status === "disabled" ? "Disabled" : "Enabled"} account: ${target.name}`
      : body.newPassword
        ? `Reset password for: ${target.name}`
        : `Updated account: ${target.name} — ${Object.keys(updates).join(", ")}`;

    await Activity.create({
      employeeId:   user.sub,
      employeeName: user.name,
      type: body.status === "disabled" ? "account_disabled"
           : body.status === "active"  ? "account_enabled"
           : body.newPassword           ? "password_reset"
           : "page_view",
      detail,
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      device: "unknown", browser: "unknown", os: "unknown", sessionId: "",
    });

    return NextResponse.json({ employee: (target as any).toPublic() });
  } catch (err) {
    console.error("[PATCH /api/admin/employees/[id]]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/admin/employees/[id] — remove employee (super_admin only)
export async function DELETE(request: NextRequest, ctx: Ctx) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "super_admin") {
    return NextResponse.json({ error: "Only super admins can delete accounts." }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  if (id === user.sub) {
    return NextResponse.json({ error: "Cannot delete your own account." }, { status: 400 });
  }

  try {
    await connectDB();
    const target = await Employee.findByIdAndDelete(id);
    if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await Activity.create({
      employeeId:   user.sub,
      employeeName: user.name,
      type: "account_disabled",
      detail: `Deleted employee account: ${target.name} (${target.email})`,
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      device: "unknown", browser: "unknown", os: "unknown", sessionId: "",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/admin/employees/[id]]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
