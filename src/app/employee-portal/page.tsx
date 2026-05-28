import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmployeePortalClient } from "@/components/employee-portal/EmployeePortalClient";

export const metadata: Metadata = {
  title: "Employee Portal",
  description: "Internal Schoolasium employee portal — team resources, private assets, announcements, and collaboration tools.",
};

export default function EmployeePortalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <EmployeePortalClient />
      </main>
      <Footer />
    </>
  );
}
