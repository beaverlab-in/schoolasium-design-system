import { create } from "zustand";
import type { Role } from "@/lib/rbac";
import { hasPermission } from "@/lib/rbac";
import type { Permission } from "@/lib/rbac";

export interface SessionUser {
  id:         string;
  email:      string;
  name:       string;
  role:       Role;
  department: string;
  avatar:     string;
  createdAt?: string;
}

interface AuthState {
  user:    SessionUser | null;
  loading: boolean;
  // Actions
  fetchMe:  () => Promise<void>;
  signIn:   (email: string, password: string) => Promise<{ error?: string }>;
  signOut:  () => Promise<void>;
  can:      (permission: Permission) => boolean;
  isAdmin:  () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user:    null,
  loading: true,

  async fetchMe() {
    set({ loading: true });
    try {
      const res  = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      set({ user: data.user ?? null, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  async signIn(email, password) {
    try {
      const res  = await fetch("/api/auth/signin", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error ?? "Sign-in failed." };
      set({ user: data.user });
      return {};
    } catch {
      return { error: "Network error. Check your connection." };
    }
  },

  async signOut() {
    try {
      await fetch("/api/auth/signout", { method: "POST", credentials: "include" });
    } catch { /* best-effort */ }
    set({ user: null });
  },

  can(permission) {
    const { user } = get();
    if (!user) return false;
    return hasPermission(user.role, permission);
  },

  isAdmin() {
    const { user } = get();
    return user?.role === "admin" || user?.role === "super_admin";
  },
}));
