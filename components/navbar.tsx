"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const navItems = [
    { label: "Services", href: "/#nos-expertises" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Offre", href: "/offre" },
    { label: "Agence", href: "/agence" },
    { label: "Ressources", href: "#humind" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-1000 ease-out ${
          scrolled
            ? "bg-gradient-to-r from-black via-black/98 to-black backdrop-blur-3xl shadow-2xl shadow-primary/40"
            : "bg-gradient-to-r from-black/90 via-black/70 to-black/90 backdrop-blur-2xl"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(0,30,60,0.95) 25%, rgba(0,20,40,0.95) 75%, rgba(0,0,0,0.98) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,30,60,0.7) 25%, rgba(0,20,40,0.7) 75%, rgba(0,0,0,0.85) 100%)",
        }}
      >
        {/* Dynamic animated gradient overlay - Multiple layers */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 115, 255, 0.3) 0%, rgba(124, 51, 255, 0.2) 30%, transparent 60%)`,
          }}
        />
        
        {/* Secondary gradient layer */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-1500"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x + 100}px ${mousePosition.y - 50}px, rgba(26, 163, 255, 0.2) 0%, rgba(0, 115, 255, 0.15) 40%, transparent 70%)`,
          }}
        />

        {/* Decorative animated light lines - Multiple layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-shimmer" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
        </div>

        {/* Advanced floating particles with trails */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full opacity-50 animate-float-advanced shadow-xl shadow-primary/60"
              style={{
                left: `${15 + i * 18}%`,
                top: "50%",
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.7}s`,
                filter: "blur(0.5px)",
              }}
            >
              {/* Particle trail */}
              <div className="absolute inset-0 bg-primary rounded-full opacity-30 animate-pulse" style={{ transform: "scale(1.5)" }} />
            </div>
          ))}
        </div>

        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from ${mousePosition.x / 20}deg at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 115, 255, 0.1), rgba(124, 51, 255, 0.1), rgba(26, 163, 255, 0.1), rgba(0, 115, 255, 0.1))`,
              transition: "all 0.3s ease-out",
            }}
          />
        </div>

        <div className="relative max-w-[1920px] mx-auto px-6 lg:px-16 py-0 flex items-center justify-between">
          {/* Logo - Simple Image Only - Extra Large */}
          <Link
            href="/"
            className="group relative z-10 transition-all duration-300 hover:opacity-90"
          >
            <Image
              src="/Pixaura_it .png"
              alt="Pixaura International Logo"
              width={500}
              height={150}
              className="h-36 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Ultra Innovative Design */}
          <div className="hidden xl:flex items-center gap-3 px-6 py-3 rounded-3xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-2xl border-2 border-white/10 shadow-2xl shadow-primary/20 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer-slow" />
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />
            
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-6 py-3 text-sm font-bold text-white/95 hover:text-white transition-all duration-700 group rounded-xl relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg ${hoveredItem === item.href ? "animate-pulse-glow" : ""}`} />
                
                {/* Animated background */}
                <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/15 transition-all duration-700" />
                
                {/* Text with glow */}
                <span className="relative z-20 flex items-center gap-2 drop-shadow-lg">
                  <span className={`w-2 h-2 rounded-full bg-primary transition-all duration-700 ${hoveredItem === item.href ? "opacity-100 scale-150 animate-pulse-glow" : "opacity-0 scale-0"}`} />
                  {item.label}
                </span>
                
                {/* Animated underline with gradient */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-transparent via-primary via-50% to-transparent rounded-full transition-all duration-700 ${hoveredItem === item.href ? "w-[calc(100%-1rem)] opacity-100" : "w-0 opacity-0"}`} />
                
                {/* Top decorative line */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent transition-all duration-700 ${hoveredItem === item.href ? "w-[calc(100%-1rem)] opacity-100" : "w-0 opacity-0"}`} />
                
                {/* Side glow lines */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[60%] bg-gradient-to-r from-primary/50 to-transparent transition-all duration-700 ${hoveredItem === item.href ? "w-1 opacity-100" : "w-0 opacity-0"}`} />
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-0 h-[60%] bg-gradient-to-l from-primary/50 to-transparent transition-all duration-700 ${hoveredItem === item.href ? "w-1 opacity-100" : "w-0 opacity-0"}`} />
              </Link>
            ))}
          </div>

          {/* CTA Button - Modern Clean Design - Stays Rounded */}
          <div className="hidden xl:block relative z-10">
            <Link
              href="/contact#rendez-vous"
              className="group relative px-10 py-4 font-bold text-sm tracking-wide rounded-full overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, #0073ff 0%, #1aa3ff 50%, #0073ff 100%)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 3s ease infinite",
              }}
              onMouseEnter={() => setHoveredItem("cta")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Subtle blue glow on hover - keeps rounded shape */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-[#1aa3ff] to-primary rounded-full opacity-0 blur-xl group-hover:opacity-60 transition-opacity duration-500 -z-10" />
              
              {/* Subtle light effect that passes through - keeps rounded shape */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out opacity-0 group-hover:opacity-100" />
              
              <span className="relative z-10 text-white font-extrabold flex items-center gap-2.5">
                Prendre un rendez-vous
                <svg
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button - Premium */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden relative p-4 text-white hover:text-primary transition-all duration-700 group z-10 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 rounded-xl bg-white/5 group-hover:bg-white/15 transition-all duration-700" />
            <svg
              className="relative w-7 h-7 transition-transform duration-700"
              style={{ transform: isOpen ? "rotate(180deg) scale(1.1)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Ultra Premium */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-1000 ease-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className="bg-gradient-to-b from-black/99 via-black/97 to-black/99 backdrop-blur-3xl border-t-2 border-primary/40 p-8 space-y-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.99) 0%, rgba(0,30,60,0.97) 50%, rgba(0,0,0,0.99) 100%)",
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-6 py-5 text-white hover:text-primary rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:from-primary/20 hover:via-primary/15 hover:to-primary/20 border-2 border-white/10 hover:border-primary/50 transition-all duration-700 hover:translate-x-4 group relative overflow-hidden"
                onClick={() => setIsOpen(false)}
                style={{
                  animationDelay: `${index * 80}ms`,
                  animation: isOpen ? "slideInLeft 0.6s ease-out forwards" : "none",
                }}
              >
                {/* Multiple glow layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
                
                <span className="relative z-20 flex items-center gap-4">
                  <span className="w-3 h-3 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-700 opacity-0 group-hover:opacity-100 shadow-xl shadow-primary/60 group-hover:scale-150" />
                  <span className="font-black text-lg">{item.label}</span>
                  <svg
                    className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                
                {/* Decorative lines */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-700 rounded-full" />
                <div className="absolute top-0 left-0 w-0 h-px bg-gradient-to-r from-primary/70 to-transparent group-hover:w-full transition-all duration-700" />
              </Link>
            ))}
            
            <Link
              href="/contact#rendez-vous"
              className="block mt-8 px-10 py-5 text-white font-bold rounded-full text-center transition-all duration-500 shadow-xl relative overflow-hidden group"
              onClick={() => setIsOpen(false)}
              style={{
                background: "linear-gradient(135deg, #0073ff 0%, #1aa3ff 50%, #0073ff 100%)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 3s ease infinite",
              }}
            >
              {/* Subtle blue glow on hover - keeps rounded shape */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-[#1aa3ff] to-primary rounded-full opacity-0 blur-xl group-hover:opacity-60 transition-opacity duration-500 -z-10" />
              
              {/* Subtle light effect that passes through - keeps rounded shape */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out opacity-0 group-hover:opacity-100" />
              
              <span className="relative z-10 flex items-center justify-center gap-2.5 font-extrabold text-base">
                Prendre un rendez-vous
                <svg
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
