import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { GuidePageClient } from "@/components/guide/GuidePageClient";

export const metadata: Metadata = {
  title: "User Guide",
  description: "Getting started, developer integration, employee workflows, and branding rules for the Schoolasium Design System.",
};

export default function GuidePage() {
  return (
    <>
      <main className="pt-16 min-h-screen">
        <GuidePageClient />
      </main>
      <Footer />
    </>
  );
}
