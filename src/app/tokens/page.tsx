import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TokensPageClient } from "@/components/tokens/TokensPageClient";

export const metadata: Metadata = {
  title: "Design Tokens",
  description: "120+ semantic design tokens — colors, typography, spacing, radius, shadows, and motion. Copy as CSS variable, Tailwind class, or raw value.",
};

export default function TokensPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <TokensPageClient />
      </main>
      <Footer />
    </>
  );
}
