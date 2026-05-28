// ─── Role definitions ─────────────────────────────────────────────────────────

export type Role = "super_admin" | "admin" | "employee" | "viewer";

export type Permission =
  | "admin:view"
  | "admin:manage_employees"
  | "admin:manage_roles"
  | "admin:view_activity"
  | "admin:manage_resources"
  | "resources:download_public"
  | "resources:download_internal"
  | "resources:preview"
  | "resources:upload"
  | "portal:access"
  | "guide:access";

// ─── Role → permission map ────────────────────────────────────────────────────

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    "admin:view",
    "admin:manage_employees",
    "admin:manage_roles",
    "admin:view_activity",
    "admin:manage_resources",
    "resources:download_public",
    "resources:download_internal",
    "resources:preview",
    "resources:upload",
    "portal:access",
    "guide:access",
  ],
  admin: [
    "admin:view",
    "admin:manage_employees",
    "admin:view_activity",
    "admin:manage_resources",
    "resources:download_public",
    "resources:download_internal",
    "resources:preview",
    "portal:access",
    "guide:access",
  ],
  employee: [
    "resources:download_public",
    "resources:download_internal",
    "resources:preview",
    "portal:access",
    "guide:access",
  ],
  viewer: [
    "resources:download_public",
    "resources:preview",
    "guide:access",
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin:       "Admin",
  employee:    "Employee",
  viewer:      "Viewer",
};

export const ROLE_HIERARCHY: Role[] = ["super_admin", "admin", "employee", "viewer"];

export function canManageRole(actorRole: Role, targetRole: Role): boolean {
  const actorIdx  = ROLE_HIERARCHY.indexOf(actorRole);
  const targetIdx = ROLE_HIERARCHY.indexOf(targetRole);
  return actorIdx < targetIdx; // lower index = higher privilege
}
