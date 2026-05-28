import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourcesPageClient } from "@/components/resources-page/ResourcesPageClient";

export const metadata: Metadata = {
  title: "Resources",
  description: "Brand assets, fonts, design tokens, icon packs, code templates, and internal documentation — organized and ready to download.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <ResourcesPageClient />
      </main>
      <Footer />
    </>
  );
}
