"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { HomeVideoCarousel } from "@/components/home-video-carousel"
import { ClientHighlights } from "@/components/client-highlights"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { OffreSection } from "@/components/offre-section"
import { AgenceHomeSection } from "@/components/agence-home-section"
import { HumindSection } from "@/components/humind-section"
import { ContactHomeSection } from "@/components/contact-home-section"
import { SectionDivider } from "@/components/section-divider"
import { GlobalAtmosphere } from "@/components/global-atmosphere"
import { ImmersiveIntro } from "@/components/immersive-intro"

export default function Home() {
  // Always start with false to avoid hydration mismatch
  const [introComplete, setIntroComplete] = useState(false)

  // Preload hero section images immediately - before first render
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return

    // Preload the first hero image (Night Drive Experience) immediately
    const firstHeroImage = "/Banque d_images/Copie de M7_03225 - Copie.jpg"
    
    // Multiple preload methods for maximum speed
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = firstHeroImage
    link.fetchPriority = 'high'
    document.head.appendChild(link)

    // Also preload via Image constructor
    const img = new window.Image()
    img.src = firstHeroImage
    img.loading = 'eager'
  }, [])

  // Use useLayoutEffect to check URL parameter and handle scroll
  // This runs synchronously before paint, preventing intro from showing
  useLayoutEffect(() => {
    // Check URL parameter directly (available immediately on client)
    const urlParams = new URLSearchParams(window.location.search)
    const skipIntroParam = urlParams.get('skipIntro')
    const hash = window.location.hash.substring(1) // Remove the # symbol
    
    if (skipIntroParam === 'true') {
      // Skip intro immediately - before any paint happens
      setIntroComplete(true)
      
      // Remove the parameter from URL without reload
      urlParams.delete('skipIntro')
      const newUrl = urlParams.toString() 
        ? `${window.location.pathname}?${urlParams.toString()}${hash ? `#${hash}` : ''}`
        : `${window.location.pathname}${hash ? `#${hash}` : ''}`
      window.history.replaceState({}, '', newUrl)
      
      // Don't scroll here - let useEffect handle it after content renders
      // Just ensure we're at top initially
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      // Always ensure page starts at top if not skipping intro
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  // Handle scroll to section after content is rendered
  useEffect(() => {
    if (introComplete) {
      const hash = window.location.hash.substring(1)
      if (hash) {
        // Check if we came from realisations or humind (via sessionStorage)
        const cameFromSpecialPage = sessionStorage.getItem('navFromSpecialPage') === 'true'
        sessionStorage.removeItem('navFromSpecialPage')
        
        // Scroll immediately if coming from special page, otherwise wait a bit
        const scrollToSection = () => {
          try {
            const element = document.getElementById(hash)
            if (element) {
              // Calculate offset for navbar
              const navbarHeight = 80
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
              const offsetPosition = elementPosition - navbarHeight
              
              // Use instant scroll if coming from realisations/humind to avoid white flash
              window.scrollTo({
                top: offsetPosition,
                behavior: cameFromSpecialPage ? 'instant' : 'smooth'
              })
            }
          } catch (error) {
            // Silent error handling - don't break navigation
          }
        }
        
        if (cameFromSpecialPage) {
          // Try immediately, then retry if element not ready
          scrollToSection()
          const timer = setTimeout(() => {
            scrollToSection()
          }, 10)
          return () => clearTimeout(timer)
        } else {
          const timer = setTimeout(scrollToSection, 200)
          return () => clearTimeout(timer)
        }
      }
    }
  }, [introComplete])

  // Check if coming from special page for instant render
  const [cameFromSpecialPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('navFromSpecialPage') === 'true'
    }
    return false
  })
  
  const contentTransition = useMemo(
    () =>
      [
        "relative z-10",
        // Instant render if coming from special page, otherwise use transition
        cameFromSpecialPage 
          ? "opacity-100 translate-y-0 scale-100 blur-0" 
          : introComplete 
            ? "transition-all duration-[1400ms] ease-[cubic-bezier(0.16,0.84,0.34,1)] opacity-100 translate-y-0 scale-100 blur-0" 
            : "pointer-events-none opacity-0 translate-y-6 scale-[0.97] blur-sm",
      ].join(" "),
    [introComplete, cameFromSpecialPage]
  )

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Background image - visible on desktop */}
        <img
          src="/Banque d_images/ippppp1.png"
          alt="Background"
          className="hidden md:block h-full w-full object-cover"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
        {/* Background image - visible only on mobile */}
        <img
          src="/Banque d_images/backnoiree.png"
          alt="Background"
          className="block md:hidden h-full w-full object-cover"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {!introComplete && (
        <div data-intro-wrapper>
          <ImmersiveIntro onComplete={handleIntroComplete} />
        </div>
      )}

      {introComplete && (
        <>
          <Navbar />
          <GlobalAtmosphere />

          <div className={contentTransition}>
            <HeroSection />
            <HomeVideoCarousel />
            <ClientHighlights />
            <SectionDivider label="Services" />
            <ServicesSection />
            <SectionDivider label="Réalisations" />
            <PortfolioSection />
            <SectionDivider label="Humind" />
            <HumindSection />
            <SectionDivider label="Offres" />
            <OffreSection />
            <SectionDivider label="Agence" />
            <AgenceHomeSection />
            <SectionDivider label="Contact" />
            <ContactHomeSection />
            <Footer />
          </div>
        </>
      )}
    </main>
  )
}
