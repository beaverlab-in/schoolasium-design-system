import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { TokensPageClient } from "@/components/tokens/TokensPageClient";

export const metadata: Metadata = {
  title: "Design Tokens",
  description: "120+ semantic design tokens — colors, typography, spacing, radius, shadows, and motion.",
};

export default function TokensPage() {
  return (
    <>
      <main className="pt-16 min-h-screen">
        <TokensPageClient />
      </main>
      <Footer />
    </>
  );
}
