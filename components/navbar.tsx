"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/translation-context"
import { Globe, Sparkles } from "lucide-react"

export function Navbar() {
  const { t, language, setLanguage } = useTranslation()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prefetch home page immediately when navbar mounts (especially on humind/realisations pages)
  useEffect(() => {
    const currentPath = window.location.pathname
    if (currentPath === '/humind' || currentPath === '/realisations') {
      router.prefetch('/?skipIntro=true')
    }
  }, [router])

  // Helper function to handle smooth navigation transitions
  const handleNavigationTransition = (targetUrl: string, shouldSetNavFromSpecialPage: boolean = false) => {
    // Remove any existing overlay first
    const existingOverlay = document.getElementById('nav-transition-overlay')
    if (existingOverlay) {
      existingOverlay.remove()
    }
    
    // Mark navigation if needed
    if (shouldSetNavFromSpecialPage) {
      sessionStorage.setItem('navFromSpecialPage', 'true')
    }
    
    // Add instant black overlay to prevent white flash
    const overlay = document.createElement('div')
    overlay.id = 'nav-transition-overlay'
    overlay.style.cssText = 'position: fixed; inset: 0; background: #000; z-index: 40; pointer-events: none; opacity: 1; transition: opacity 0ms;'
    document.body.appendChild(overlay)
    
    // Ensure navbar stays visible above overlay
    const navbar = document.querySelector('nav') as HTMLElement
    if (navbar) {
      navbar.style.setProperty('z-index', '9999')
      navbar.style.setProperty('position', 'fixed')
    }
    
    // Set black background for smooth transition
    document.documentElement.style.backgroundColor = '#000000'
    document.body.style.backgroundColor = '#000000'
    
    // Prefetch for instant navigation
    router.prefetch(targetUrl)
    
    // Disable smooth scroll during navigation
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.scrollBehavior = 'auto'
    
    // Navigate immediately
    router.push(targetUrl)
    
    // Wait for navigation to complete before removing overlay
    const removeOverlay = () => {
      const overlayEl = document.getElementById('nav-transition-overlay')
      if (overlayEl) {
        // Check if page has loaded
        if (document.readyState === 'complete') {
          overlayEl.style.opacity = '0'
          overlayEl.style.transition = 'opacity 300ms ease-out'
          setTimeout(() => {
            overlayEl.remove()
            // Remove black background after overlay is removed
            setTimeout(() => {
              document.documentElement.style.backgroundColor = ''
              document.body.style.backgroundColor = ''
            }, 50)
          }, 300)
        } else {
          // Wait for page to load
          window.addEventListener('load', () => {
            setTimeout(() => {
              const el = document.getElementById('nav-transition-overlay')
              if (el) {
                el.style.opacity = '0'
                el.style.transition = 'opacity 300ms ease-out'
                setTimeout(() => {
                  el.remove()
                  document.documentElement.style.backgroundColor = ''
                  document.body.style.backgroundColor = ''
                }, 300)
              }
            }, 100)
          }, { once: true })
        }
      } else {
        // If overlay was already removed, just remove background
        document.documentElement.style.backgroundColor = ''
        document.body.style.backgroundColor = ''
      }
      document.documentElement.style.scrollBehavior = ''
      document.body.style.scrollBehavior = ''
    }
    
    // Use a longer timeout to ensure page is fully loaded on Vercel
    setTimeout(removeOverlay, 150)
  }

  const navItems = [
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.realisations"), href: "/realisations" },
    { label: t("nav.offre"), href: "/#offre" },
    { label: t("nav.agence"), href: "/#agence" },
    { label: t("nav.humind"), href: "/humind" },
    { label: t("nav.contact"), href: "/#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-700 ease-out ${
        scrolled
          ? [
              "border border-white/12",
              "bg-white/[0.03]",
              "supports-[backdrop-filter]:bg-white/[0.03]",
              "backdrop-blur-[28px]",
              "shadow-[0_18px_60px_-18px_rgba(15,23,42,0.65)]",
              "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(120deg,rgba(69,123,247,0.22)_0%,rgba(255,255,255,0.06)_45%,rgba(69,123,247,0.22)_100%)] before:opacity-90 before:transition before:duration-700 before:content-['']",
              "after:pointer-events-none after:absolute after:left-1/2 after:top-full after:-z-20 after:h-32 after:w-[80%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[999px] after:bg-[radial-gradient(circle,rgba(59,130,246,0.24)_0%,transparent_75%)] after:opacity-60 after:blur-3xl after:content-['']",
            ].join(" ")
          : "bg-transparent"
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-[1920px] items-center justify-between px-6 lg:px-16 transition-all duration-700 ${
          scrolled ? "py-1.5" : "py-3"
        }`}
      >
        <a 
          href="/?skipIntro=true" 
          className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            const currentPath = window.location.pathname
            const isOnRealisationsOrHumind = currentPath === '/realisations' || currentPath === '/humind'
            
            // Always redirect to home page and skip intro, go directly to Hero Section
            if (currentPath === "/") {
              // If already on home page, just scroll to top (Hero Section)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
              // Prevent white flash during navigation from realisations/humind
              if (isOnRealisationsOrHumind) {
                handleNavigationTransition('/?skipIntro=true', true)
              } else {
                // For other pages, use router.push for faster navigation
                router.push('/?skipIntro=true')
              }
            }
          }}
        >
          <Image
            src="/Pixaura_it .png"
            alt="Pixaura International Logo"
            width={500}
            height={150}
            className="h-28 w-auto object-contain"
            priority
          />
        </a>

        <div className="relative hidden items-center gap-3 rounded-3xl border border-white/10 bg-black/20 px-5 py-1.5 text-white backdrop-blur-xl xl:flex">
          <div className="absolute inset-0 rounded-3xl border border-white/10 opacity-40" />
          {navItems.map((item, index) => {
            // Check if link points to a section on home page (starts with /#)
            const isHomeSection = item.href.startsWith("/#")
            const sectionId = isHomeSection ? item.href.substring(2) : null
            
            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              const currentPath = window.location.pathname
              const isOnRealisationsOrHumind = currentPath === '/realisations' || currentPath === '/humind'
              
              if (isHomeSection && sectionId) {
                e.preventDefault()
                
                if (currentPath === "/") {
                  // Already on home page, just scroll to section
                  const element = document.getElementById(sectionId)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                } else {
                  // Prevent white flash during navigation from realisations/humind
                  if (isOnRealisationsOrHumind) {
                    // Mark that we're navigating from special page
                    sessionStorage.setItem('navFromSpecialPage', 'true')
                    
                    // Add instant black overlay to prevent white flash (below navbar z-50, above content)
                    const overlay = document.createElement('div')
                    overlay.id = 'nav-transition-overlay'
                    overlay.style.cssText = 'position: fixed; inset: 0; background: #000; z-index: 40; pointer-events: none; opacity: 1;'
                    document.body.appendChild(overlay)
                    
                    // Ensure navbar stays visible above overlay
                    const navbar = document.querySelector('nav') as HTMLElement
                    if (navbar) {
                      navbar.style.setProperty('z-index', '9999')
                      navbar.style.setProperty('position', 'fixed')
                    }
                    
                    // Set black background for smooth transition
                    document.documentElement.style.backgroundColor = '#000000'
                    document.body.style.backgroundColor = '#000000'
                    
                    // Prefetch the home page for instant navigation
                    router.prefetch(`/?skipIntro=true#${sectionId}`)
                    
                    // Disable smooth scroll during navigation
                    document.documentElement.style.scrollBehavior = 'auto'
                    document.body.style.scrollBehavior = 'auto'
                    
                    // Navigate immediately
                    router.push(`/?skipIntro=true#${sectionId}`)
                    
                    // Remove overlay and restore after navigation completes
                    setTimeout(() => {
                      const overlayEl = document.getElementById('nav-transition-overlay')
                      if (overlayEl) {
                        overlayEl.style.opacity = '0'
                        overlayEl.style.transition = 'opacity 200ms'
                        setTimeout(() => {
                          overlayEl.remove()
                          // Remove black background after overlay is removed
                          setTimeout(() => {
                            document.documentElement.style.backgroundColor = ''
                            document.body.style.backgroundColor = ''
                          }, 100)
                        }, 200)
                      } else {
                        // If overlay was already removed, just remove background
                        document.documentElement.style.backgroundColor = ''
                        document.body.style.backgroundColor = ''
                      }
                      document.documentElement.style.scrollBehavior = ''
                      document.body.style.scrollBehavior = ''
                    }, 300)
                  } else {
                    router.push(`/?skipIntro=true#${sectionId}`)
                  }
                }
              } else {
                e.preventDefault()
                
                // Add overlay when navigating FROM realisations/humind to any other page
                // This includes navigating between realisations and humind
                // When navigating TO humind/realisations from home, no overlay needed
                const isNavigatingToHumindOrRealisations = item.href === '/humind' || item.href === '/realisations'
                const isNavigatingFromHome = currentPath === '/'
                
                if (isOnRealisationsOrHumind && !isNavigatingFromHome) {
                  // Add instant black overlay to prevent white flash (below navbar z-50, above content)
                  const overlay = document.createElement('div')
                  overlay.id = 'nav-transition-overlay'
                  overlay.style.cssText = 'position: fixed; inset: 0; background: #000; z-index: 40; pointer-events: none; opacity: 1;'
                  document.body.appendChild(overlay)
                  
                  // Ensure navbar stays visible above overlay
                  const navbar = document.querySelector('nav') as HTMLElement
                  if (navbar) {
                    navbar.style.setProperty('z-index', '9999')
                    navbar.style.setProperty('position', 'fixed')
                  }
                  
                  // Set black background for smooth transition
                  document.documentElement.style.backgroundColor = '#000000'
                  document.body.style.backgroundColor = '#000000'
                  
                  // Prefetch for instant navigation
                  router.prefetch(item.href)
                  
                  // Disable smooth scroll during navigation
                  document.documentElement.style.scrollBehavior = 'auto'
                  document.body.style.scrollBehavior = 'auto'
                  
                  // Navigate immediately
                  router.push(item.href)
                  
                  // Remove overlay after navigation completes
                  setTimeout(() => {
                    const overlayEl = document.getElementById('nav-transition-overlay')
                    if (overlayEl) {
                      overlayEl.style.opacity = '0'
                      overlayEl.style.transition = 'opacity 200ms'
                      setTimeout(() => {
                        overlayEl.remove()
                        // Remove black background after overlay is removed
                        setTimeout(() => {
                          document.documentElement.style.backgroundColor = ''
                          document.body.style.backgroundColor = ''
                        }, 100)
                      }, 200)
                    } else {
                      // If overlay was already removed, just remove background
                      document.documentElement.style.backgroundColor = ''
                      document.body.style.backgroundColor = ''
                    }
                    document.documentElement.style.scrollBehavior = ''
                    document.body.style.scrollBehavior = ''
                  }, 300)
                } else {
                  // Navigate normally without overlay (especially when going TO humind/realisations from home)
                  router.push(item.href)
                }
              }
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className="group relative overflow-hidden rounded-xl px-5 py-2 text-sm font-bold text-white/95 transition-all duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`absolute inset-0 rounded-xl bg-primary/15 opacity-0 transition-opacity duration-500 ${
                    hoveredItem === item.href ? "opacity-100" : "group-hover:opacity-70"
                  }`}
                />
                <div
                  className={`absolute bottom-1 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 ${
                    hoveredItem === item.href ? "w-[calc(100%-1rem)] opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute top-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-all duration-500 ${
                    hoveredItem === item.href ? "w-[calc(100%-1rem)] opacity-100" : "opacity-0"
                  }`}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full bg-primary transition-all duration-500 ${
                      hoveredItem === item.href ? "scale-150 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="hidden xl:flex items-center gap-4">
          {/* Language Switcher - Ultra Premium Design */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="group relative flex items-center gap-2.5 rounded-full border border-white/25 bg-gradient-to-br from-white/10 via-white/5 to-white/10 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-500 hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:via-primary/10 hover:to-primary/20 hover:shadow-[0_0_30px_rgba(0,115,255,0.4)] backdrop-blur-xl overflow-hidden"
              aria-label="Change language"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-cyan-400/20 to-primary/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              {/* Sparkle effect */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-cyan-300 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-180 group-hover:scale-125" />
                </div>
              </div>
              
              {/* Premium Globe Icon */}
              <div className="relative z-10">
                <Globe className="h-4 w-4 transition-all duration-500 group-hover:text-cyan-300 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Language text with glow */}
              <span className="relative z-10 transition-all duration-500 group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                {language}
              </span>
              
              {/* Animated border glow */}
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-500" />
            </button>
            
            {showLangMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowLangMenu(false)}
                />
                <div className="absolute right-0 top-full mt-3 z-50 rounded-2xl border border-white/25 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-2 duration-300">
                  {/* Premium glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-cyan-400/5 to-primary/10 pointer-events-none" />
                  
                  <button
                    onClick={() => {
                      setLanguage('fr')
                      setShowLangMenu(false)
                    }}
                    className={`group relative w-full px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 overflow-hidden ${
                      language === 'fr' 
                        ? 'bg-gradient-to-r from-primary/25 via-primary/15 to-primary/25 text-cyan-200' 
                        : 'hover:bg-white/10 text-white/90 hover:text-white'
                    }`}
                  >
                    {/* Active indicator */}
                    {language === 'fr' && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-primary" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {language === 'fr' && (
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      )}
                      Français
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setShowLangMenu(false)
                    }}
                    className={`group relative w-full px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 overflow-hidden ${
                      language === 'en' 
                        ? 'bg-gradient-to-r from-primary/25 via-primary/15 to-primary/25 text-cyan-200' 
                        : 'hover:bg-white/10 text-white/90 hover:text-white'
                    }`}
                  >
                    {/* Active indicator */}
                    {language === 'en' && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-primary" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {language === 'en' && (
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      )}
                      English
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </>
            )}
          </div>

          <Link
            href="/#rendez-vous"
            onClick={(e) => {
              const currentPath = window.location.pathname
              const isOnRealisationsOrHumind = currentPath === '/realisations' || currentPath === '/humind'
              
              if (currentPath !== "/") {
                e.preventDefault()
                
                // Use the same smooth navigation logic as "Agence" button
                if (isOnRealisationsOrHumind) {
                  handleNavigationTransition(`/?skipIntro=true#rendez-vous`, true)
                } else {
                  router.push(`/?skipIntro=true#rendez-vous`)
                }
              }
            }}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Premium Glassmorphism Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 group-hover:border-white/30 transition-all duration-500" />
            
            {/* Subtle gradient glow on hover */}
            <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease infinite',
            }} />
            
            {/* Premium shine effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            </div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <span className="relative z-10 text-sm font-bold text-white/95 group-hover:text-white transition-colors duration-500 tracking-wide">
              {t("nav.takeAppointment")}
            </span>
            
            <svg
              className="relative z-10 h-4 w-4 text-white/90 group-hover:text-white transition-all duration-500 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-white/20 bg-black/30 p-4 text-white transition-colors duration-300 hover:border-primary hover:text-primary xl:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-xl transition-all duration-300 ease-out xl:hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6 text-white">
          {navItems.map((item) => {
            // Check if link points to a section on home page (starts with /#)
            const isHomeSection = item.href.startsWith("/#")
            const sectionId = isHomeSection ? item.href.substring(2) : null
            
            const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              setIsOpen(false)
              const currentPath = window.location.pathname
              const isOnRealisationsOrHumind = currentPath === '/realisations' || currentPath === '/humind'
              
              if (isHomeSection && sectionId) {
                e.preventDefault()
                
                if (currentPath === "/") {
                  // Already on home page, just scroll to section
                  setTimeout(() => {
                    const element = document.getElementById(sectionId)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 100)
                } else {
                  // Prevent white flash during navigation from realisations/humind
                  if (isOnRealisationsOrHumind) {
                    handleNavigationTransition(`/?skipIntro=true#${sectionId}`, true)
                  } else {
                    router.push(`/?skipIntro=true#${sectionId}`)
                  }
                }
              } else {
                e.preventDefault()
                
                // Add overlay when navigating FROM realisations/humind to any other page
                // This includes navigating between realisations and humind
                // When navigating TO humind/realisations from home, no overlay needed
                const isNavigatingToHumindOrRealisations = item.href === '/humind' || item.href === '/realisations'
                const isNavigatingFromHome = currentPath === '/'
                
                if (isOnRealisationsOrHumind && !isNavigatingFromHome) {
                  handleNavigationTransition(item.href, false)
                } else {
                  // Navigate normally without overlay (especially when going TO humind/realisations from home)
                  router.push(item.href)
                }
              }
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMobileClick}
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-lg font-semibold transition-colors duration-300 hover:border-primary/60 hover:bg-primary/20"
              >
                {item.label}
              </Link>
            )
          })}

          {/* Mobile Language Switcher - Ultra Premium Design */}
          <div className="relative flex items-center gap-2.5 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-1.5 backdrop-blur-xl">
            {/* Premium glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-cyan-400/10 to-primary/20 opacity-0 transition-opacity duration-500" />
            
            <button
              onClick={() => {
                setLanguage('fr')
                setIsOpen(false)
              }}
              className={`group relative flex-1 rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden ${
                language === 'fr' 
                  ? 'bg-gradient-to-br from-primary/30 via-primary/20 to-primary/30 text-cyan-200 shadow-[0_0_20px_rgba(0,115,255,0.4)] border border-primary/40' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {/* Active glow */}
              {language === 'fr' && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-primary/20 to-cyan-400/20 blur-sm" />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {language === 'fr' && (
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                )}
                FR
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={() => {
                setLanguage('en')
                setIsOpen(false)
              }}
              className={`group relative flex-1 rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden ${
                language === 'en' 
                  ? 'bg-gradient-to-br from-primary/30 via-primary/20 to-primary/30 text-cyan-200 shadow-[0_0_20px_rgba(0,115,255,0.4)] border border-primary/40' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {/* Active glow */}
              {language === 'en' && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-primary/20 to-cyan-400/20 blur-sm" />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {language === 'en' && (
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                )}
                EN
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <Link
            href="/#rendez-vous"
            className="group relative w-full flex items-center justify-between px-7 py-5 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] active:duration-150"
            onClick={(e) => {
              setIsOpen(false)
              const currentPath = window.location.pathname
              const isOnRealisationsOrHumind = currentPath === '/realisations' || currentPath === '/humind'
              
              if (currentPath !== "/") {
                e.preventDefault()
                
                // Use the same smooth navigation logic as "Agence" button
                if (isOnRealisationsOrHumind) {
                  handleNavigationTransition(`/?skipIntro=true#rendez-vous`, true)
                } else {
                  router.push(`/?skipIntro=true#rendez-vous`)
                }
              }
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12), inset 0 1px 0 0 rgba(255,255,255,0.2)',
            }}
          >
            {/* Ultra-Premium Multi-Layer Glow System */}
            <div className="absolute -inset-[3px] rounded-3xl opacity-0 group-active:opacity-100 transition-opacity duration-700" style={{
              background: 'linear-gradient(135deg, rgba(0,115,255,0.4) 0%, rgba(26,163,255,0.4) 50%, rgba(124,51,255,0.4) 100%)',
              filter: 'blur(24px)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 4s ease infinite',
            }} />
            
            {/* Subtle ambient glow - always present */}
            <div className="absolute -inset-[1px] rounded-3xl opacity-30 group-active:opacity-60 transition-opacity duration-700" style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(0,115,255,0.3) 0%, transparent 70%)',
              filter: 'blur(16px)',
            }} />
            
            {/* Animated gradient overlay - world-class */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-active:opacity-100 transition-opacity duration-700" style={{
              background: 'linear-gradient(135deg, rgba(0,115,255,0.08) 0%, rgba(26,163,255,0.12) 50%, rgba(0,115,255,0.08) 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 5s ease infinite',
            }} />
            
            {/* Premium light sweep - Apple-style */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-active:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-active:translate-x-[150%] transition-transform duration-1200 ease-out" style={{
                transform: 'skewX(-20deg)',
              }} />
            </div>
            
            {/* Inner depth layers - premium depth effect */}
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-60 group-active:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-30" />
            
            {/* Top highlight - premium glass effect */}
            <div className="absolute top-0 left-0 right-0 h-[45%] rounded-t-3xl bg-gradient-to-b from-white/12 via-white/4 to-transparent opacity-70 group-active:opacity-100 transition-opacity duration-700" />
            
            {/* Content wrapper */}
            <div className="relative z-10 flex items-center gap-4 flex-1">
              {/* Text with premium typography */}
              <span 
                className="text-[15px] font-semibold text-white leading-tight tracking-[-0.01em] group-active:text-transparent group-active:bg-clip-text group-active:bg-gradient-to-r group-active:from-white group-active:via-cyan-100 group-active:to-white transition-all duration-700"
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)',
                  letterSpacing: '0.02em',
                  fontWeight: 600,
                }}
              >
                {t("nav.takeAppointment")}
              </span>
            </div>
            
            {/* Arrow container with premium effects */}
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-active:bg-white/10 transition-all duration-700" style={{
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 1px 3px rgba(0,0,0,0.2)',
            }}>
              <svg
                className="h-4 w-4 text-white/90 group-active:text-white transition-all duration-700 group-active:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              
              {/* Arrow glow on active */}
              <div className="absolute inset-0 rounded-full bg-primary opacity-0 blur-md group-active:opacity-40 transition-opacity duration-700" />
            </div>
            
            {/* Subtle border glow on active */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-active:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 24px rgba(0,115,255,0.2)',
            }} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
