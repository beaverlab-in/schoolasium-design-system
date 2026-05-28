import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIGuidelinesPageClient } from "@/components/ai-guidelines/AIGuidelinesPageClient";

export const metadata: Metadata = {
  title: "AI Guidelines",
  description: "Prompt templates, usage rules, do/don'ts, and AI workflows for building consistently with the Schoolasium Design System.",
};

export default function AIGuidelinesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <AIGuidelinesPageClient />
      </main>
      <Footer />
    </>
  );
}
