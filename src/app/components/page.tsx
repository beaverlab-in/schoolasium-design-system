import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ComponentsPageClient } from "@/components/components-page/ComponentsPageClient";

export const metadata: Metadata = {
  title: "Components",
  description: "40+ production-ready components with live previews, code snippets, props tables, and accessibility notes.",
};

export default function ComponentsPage() {
  return (
    <>
      <main className="pt-16 min-h-screen">
        <ComponentsPageClient />
      </main>
      <Footer />
    </>
  );
}
