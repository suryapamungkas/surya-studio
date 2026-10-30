import { DockNav } from "@/components/layout/DockNav";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { InteractiveCostCalculator } from "@/components/sections/InteractiveCostCalculator";
import { PricingSection } from "@/components/sections/PricingSection";
import { WorkflowTimeline } from "@/components/sections/WorkflowTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { FooterCta } from "@/components/sections/FooterCta";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-alabaster focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Lewati ke konten utama
      </a>
      <DockNav />
      <main id="main">
        <Hero />
        <BentoGrid />
        <ProjectShowcase />
        <InteractiveCostCalculator />
        <PricingSection />
        <WorkflowTimeline />
        <Testimonials />
        <FaqSection />
      </main>
      <FooterCta />
      <FloatingWhatsApp />
    </>
  );
}
