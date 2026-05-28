import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Schoolasium Design System — internal admin dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="pt-16 min-h-screen">
      <AdminDashboard />
    </main>
  );
}
