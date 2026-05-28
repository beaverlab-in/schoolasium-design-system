import { Suspense } from "react";
import type { Metadata } from "next";
import { EmployeePortalClient } from "@/components/employee-portal/EmployeePortalClient";

export const metadata: Metadata = {
  title: "Employee Portal",
  description: "Internal Schoolasium employee portal — team resources, private assets, and collaboration tools.",
  robots: { index: false, follow: false },
};

export default function EmployeePortalPage() {
  return (
    <main className="pt-16 min-h-screen">
      <Suspense>
        <EmployeePortalClient />
      </Suspense>
    </main>
  );
}
