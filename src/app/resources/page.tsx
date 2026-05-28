import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ResourcesPageClient } from "@/components/resources-page/ResourcesPageClient";

export const metadata: Metadata = {
  title: "Resources",
  description: "Brand assets, fonts, design tokens, icon packs, code templates, and documentation — ready to download.",
};

export default function ResourcesPage() {
  return (
    <>
      <main className="pt-16 min-h-screen">
        <ResourcesPageClient />
      </main>
      <Footer />
    </>
  );
}
