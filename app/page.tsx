import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { PricingSection } from "@/components/pricing-section"
import { AboutSection } from "@/components/about-section"
import { HumindSection } from "@/components/humind-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <HumindSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
