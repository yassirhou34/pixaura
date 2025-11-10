import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { PricingSection } from "@/components/pricing-section"
import { AboutSection } from "@/components/about-section"
import { HumindSection } from "@/components/humind-section"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/Banque d_images/backv1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <SectionDivider label="Services" />
        <ServicesSection />
        <SectionDivider label="Réalisations" />
        <PortfolioSection />
        <SectionDivider label="Humind" />
        <HumindSection />
        <SectionDivider label="Offres" />
        <PricingSection />
        <SectionDivider label="Agence" />
        <AboutSection />
        <Footer />
      </div>
    </main>
  )
}
