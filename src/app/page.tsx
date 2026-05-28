import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TokensPreviewSection } from "@/components/home/TokensPreviewSection";
import { ComponentsShowcaseSection } from "@/components/home/ComponentsShowcaseSection";
import { AISection } from "@/components/home/AISection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TokensPreviewSection />
        <ComponentsShowcaseSection />
        <AISection />
        <ResourcesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
