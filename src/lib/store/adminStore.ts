import { create } from "zustand";
import type { Role } from "@/lib/rbac";

export interface Employee {
  id:         string;
  name:       string;
  email:      string;
  role:       Role;
  department: string;
  status:     "active" | "disabled";
  avatar:     string;
  createdBy:  string;
  lastLogin:  string | null;
  createdAt:  string;
}

interface AdminState {
  employees: Employee[];
  total:     number;
  loading:   boolean;
  error:     string | null;
  // Actions
  fetchEmployees: (params?: {
    search?: string; role?: string; dept?: string;
    status?: string; page?: number; limit?: number;
  }) => Promise<void>;
  createEmployee: (data: {
    name: string; email: string; role: Role;
    department: string; tempPassword: string;
  }) => Promise<{ error?: string; employee?: Employee; tempPassword?: string }>;
  updateEmployee: (id: string, data: Partial<{
    name: string; role: Role; department: string; status: string; newPassword: string;
  }>) => Promise<{ error?: string }>;
  deleteEmployee: (id: string) => Promise<{ error?: string }>;
}

async function apiFetch(path: string, init?: RequestInit) {
  const res  = await fetch(path, { credentials: "include", ...init });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export const useAdminStore = create<AdminState>((set, get) => ({
  employees: [],
  total:     0,
  loading:   false,
  error:     null,

  async fetchEmployees(params = {}) {
    set({ loading: true, error: null });
    try {
      const qs = new URLSearchParams();
      if (params.search) qs.set("search", params.search);
      if (params.role)   qs.set("role",   params.role);
      if (params.dept)   qs.set("dept",   params.dept);
      if (params.status) qs.set("status", params.status);
      if (params.page)   qs.set("page",   String(params.page));
      if (params.limit)  qs.set("limit",  String(params.limit));

      const { ok, data } = await apiFetch(`/api/admin/employees?${qs}`);
      if (ok) {
        set({ employees: data.employees, total: data.total, loading: false });
      } else {
        set({ error: data.error ?? "Failed to load employees", loading: false });
      }
    } catch (err) {
      set({ error: "Network error", loading: false });
    }
  },

  async createEmployee({ name, email, role, department, tempPassword }) {
    const { ok, data } = await apiFetch("/api/admin/employees", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role, department, tempPassword }),
    });
    if (!ok) return { error: data.error ?? "Failed to create employee" };

    // Optimistically add to list
    set((s) => ({ employees: [data.employee, ...s.employees], total: s.total + 1 }));
    return { employee: data.employee, tempPassword };
  },

  async updateEmployee(id, updates) {
    const { ok, data } = await apiFetch(`/api/admin/employees/${id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!ok) return { error: data.error ?? "Update failed" };

    set((s) => ({
      employees: s.employees.map((e) => e.id === id ? { ...e, ...data.employee } : e),
    }));
    return {};
  },

  async deleteEmployee(id) {
    const { ok, data } = await apiFetch(`/api/admin/employees/${id}`, {
      method: "DELETE",
    });
    if (!ok) return { error: data.error ?? "Delete failed" };

    set((s) => ({
      employees: s.employees.filter((e) => e.id !== id),
      total:     s.total - 1,
    }));
    return {};
  },
}));
