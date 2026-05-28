import { create } from "zustand";

export type ActivityType =
  | "login" | "logout" | "download" | "preview"
  | "failed_login" | "page_view" | "password_reset"
  | "account_created" | "account_disabled" | "account_enabled";

export interface ActivityEvent {
  id:           string;
  employeeId:   string;
  employeeName: string;
  type:         ActivityType;
  detail:       string;
  resourceId:   string | null;
  ip:           string;
  device:       string;
  browser:      string;
  os:           string;
  sessionId:    string;
  timestamp:    string;
}

interface ActivityState {
  events:  ActivityEvent[];
  total:   number;
  loading: boolean;
  // Fetch from API (admin use)
  fetchEvents: (params?: {
    employeeId?: string; type?: string; page?: number; limit?: number;
  }) => Promise<void>;
  // Log a new event via API
  log: (data: {
    type: ActivityType;
    detail: string;
    resourceId?: string;
    employeeName?: string;
  }) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  events:  [],
  total:   0,
  loading: false,

  async fetchEvents(params = {}) {
    set({ loading: true });
    try {
      const qs = new URLSearchParams();
      if (params.employeeId) qs.set("employeeId", params.employeeId);
      if (params.type)       qs.set("type",       params.type);
      if (params.page)       qs.set("page",        String(params.page));
      if (params.limit)      qs.set("limit",       String(params.limit));

      const res  = await fetch(`/api/admin/activity?${qs}`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        set({ events: data.events, total: data.total, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },

  async log({ type, detail, resourceId, employeeName }) {
    try {
      await fetch("/api/activity", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type, detail, resourceId, employeeName }),
      });
    } catch { /* best-effort */ }
  },
}));
