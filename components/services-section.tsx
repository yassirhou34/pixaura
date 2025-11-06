"use client"

import { useState, useEffect, useRef } from "react"

const services = [
  { 
    title: "Branding & Identité",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  { 
    title: "Photo & Video Production",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    title: "Gestion des réseaux sociaux",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    )
  },
  { 
    title: "Campagnes publicitaires",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    )
  },
  { 
    title: "Stratégie marketing & rédaction publicitaire",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
]

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative py-16 px-6 bg-black overflow-hidden">
      {/* Section Separator - Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Enhanced Background - Deep dark with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/50 to-black" />
      
      {/* Animated gradient overlay - Follows mouse */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 200, 255, 0.15) 0%, rgba(124, 58, 237, 0.1) 30%, transparent 60%)`,
        }}
      />
      
      {/* Enhanced digital patterns - Animated */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(0, 200, 255, 0.08) 100px),
              repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(124, 58, 237, 0.08) 100px)
            `,
            backgroundSize: '200px 200px',
            animation: 'patternMove 20s linear infinite',
          }}
        />
      </div>

      {/* Enhanced scattered light points - More dynamic */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const seed = i * 0.1375 // Deterministic seed based on index
            const left = ((seed * 100) % 100)
            const top = ((seed * 137.5) % 100)
            const duration = 4 + ((seed * 4) % 4)
            const delay = (seed * 3) % 3
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-15"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `floatAdvanced ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            )
          })}
        </div>
      )}

      {/* Subtle light streaks - Enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Creative Header Section - Refined */}
        <div id="nos-expertises" className="text-center mb-8 scroll-mt-40">
          <div className="relative inline-block mb-4">
            {/* Animated background glow - Refined */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-cyan-400/20 to-primary/20 rounded-full blur-3xl opacity-40 animate-pulse-slow" />
            
            {/* Reduced title size */}
            <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-[1.1] tracking-tight" style={{ letterSpacing: '-0.03em', fontWeight: 900 }}>
              <span className="relative inline-block">
                Nos Expertises
                {/* Enhanced animated underline */}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/70 to-transparent rounded-full animate-expand-width" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-primary to-cyan-400 rounded-full animate-expand-width-delayed" />
              </span>
            </h2>
          </div>
          
          {/* Enhanced subtitle with better spacing */}
          <p className="text-base md:text-lg text-white/90 max-w-4xl mx-auto leading-[1.5] font-light tracking-normal mb-2" style={{ letterSpacing: '0.01em', fontWeight: 300 }}>
            Une offre globale de services conçus pour{" "}
            <span className="text-white font-semibold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent" style={{ fontWeight: 600 }}>
              sublimer votre marque
            </span>{" "}
            et générer de l&apos;impact mesurable.
          </p>
        </div>

        {/* Enhanced Services Grid - Ultra Creative Cards with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gradient-to-br from-slate-900/75 via-slate-800/65 to-slate-900/75 border-2 border-white/18 rounded-[2rem] hover:border-cyan-400/90 hover:bg-gradient-to-br hover:from-slate-900/85 hover:via-slate-800/75 hover:to-slate-900/85 transition-all duration-700 backdrop-blur-xl overflow-hidden cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Global Corner Glow Effects - Top Left & Bottom Right */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 via-cyan-400/10 to-transparent rounded-br-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 via-primary/10 to-transparent rounded-tl-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Global Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />
              {/* 3D Card Effect - Subtle */}
              {mounted && (
                <div
                  className="absolute inset-0 rounded-[2rem] transition-transform duration-700"
                  style={{
                    transform: hoveredCard === index && typeof window !== 'undefined'
                      ? `rotateY(${(mousePosition.x - window.innerWidth / 2) / 60}deg) rotateX(${(mousePosition.y - window.innerHeight / 2) / 60}deg)`
                      : "rotateY(0deg) rotateX(0deg)",
                  }}
                />
              )}

              {/* Multi-layer glow effects - Refined */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${hoveredCard === index ? "animate-pulse" : ""}`} />
              <div className={`absolute -inset-2 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${hoveredCard === index ? "animate-pulse" : ""}`} />
              <div className={`absolute -inset-3 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1200`} />
              
              {/* Enhanced inner glow - Multi-directional */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/8 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/0 via-cyan-400/6 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2rem]" />
              
              {/* Enhanced shine effect - More elegant */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500 ease-out" />
              
              {/* Enhanced outer border frame - Premium */}
              <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-md" />
              
              {/* Elegant animated border effect - Refined */}
              <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-[2rem] border-2 border-cyan-400/40 animate-spin-slow" style={{ animation: "borderRotate 3s linear infinite" }} />
              </div>
              
              
              {/* Decorative border lines - Subtle */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-8 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-8 bottom-8 right-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Animated corner lights - Enhanced */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400/60 rounded-full blur-sm animate-pulse shadow-lg shadow-cyan-400/50" />
                <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400/60 rounded-full blur-sm animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.2s' }} />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400/60 rounded-full blur-sm animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.4s' }} />
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-cyan-400/60 rounded-full blur-sm animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.6s' }} />
              </div>

              {/* Professional Icon - Global Modern Structure */}
              <div className="relative z-10 flex justify-center mb-3">
                <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 border border-white/15 group-hover:border-cyan-400/70 group-hover:bg-gradient-to-br group-hover:from-slate-800/95 group-hover:via-slate-700/90 group-hover:to-slate-800/95 transition-all duration-700 group-hover:scale-105 group-hover:rotate-2 shadow-lg group-hover:shadow-cyan-400/30">
                  {/* Inner structure frame */}
                  <div className="absolute inset-0.5 rounded-xl border border-white/8 group-hover:border-cyan-400/30 transition-all duration-700" />
                  
                  {/* Global corner accents for icon frame */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/12 group-hover:border-cyan-400/50 rounded-tl-2xl transition-all duration-700" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/12 group-hover:border-cyan-400/50 rounded-tr-2xl transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/12 group-hover:border-cyan-400/50 rounded-bl-2xl transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/12 group-hover:border-cyan-400/50 rounded-br-2xl transition-all duration-700" />
                  
                  {/* Global icon corner glows */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-cyan-400/15 to-transparent rounded-br-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary/15 to-transparent rounded-tl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/8 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                  
                  {/* Icon content */}
                  <div className="relative text-white group-hover:text-cyan-400 transition-colors duration-700 flex items-center justify-center">
                    {service.icon}
                  </div>
                  
                  {/* Icon glow effect - Global */}
                  <div className="absolute -inset-2 bg-cyan-400/0 group-hover:bg-cyan-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>

              {/* Enhanced Service Title - Premium Typography */}
              <h3 className="relative z-10 text-base md:text-lg text-white text-center leading-[1.3] group-hover:text-white transition-all duration-500" style={{ fontWeight: 500, letterSpacing: '0.02em' }}>
                <span className="relative inline-block">
                  {service.title}
                  {/* Elegant animated underline on hover */}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-primary to-cyan-400 group-hover:w-full transition-all duration-700 rounded-full" />
                </span>
              </h3>
            </div>
          ))}
        </div>
      </div>
      
      {/* Section Separator - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <style jsx>{`
        @keyframes patternMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(200px, 200px);
          }
        }
        @keyframes floatAdvanced {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.15;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(-5px) scale(1.1);
            opacity: 0.25;
          }
          75% {
            transform: translateY(-15px) translateX(-10px) scale(1.15);
            opacity: 0.35;
          }
        }
        @keyframes expand-width {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes expand-width-delayed {
          0%, 40% {
            width: 0%;
          }
          100% {
            width: 80%;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes borderRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-expand-width {
          animation: expand-width 1.2s ease-out forwards;
        }
        .animate-expand-width-delayed {
          animation: expand-width-delayed 1.5s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: borderRotate 3s linear infinite;
        }
      `}</style>
    </section>
  )
}
