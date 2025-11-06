"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Aperçu de quelques projets pour la page d'accueil
const previewProjects = [
  {
    id: 1,
    title: "Halloween avec Touraine Cars — Shooting Éphémère",
    category: "Film / Vidéo",
    image: "/Banque d_images/Copie de M7_01248.jpg",
    sector: "Automobile",
  },
  {
    id: 2,
    title: "Mr Microbe — Projet Artistique & Thérapeutique",
    category: "Photo",
    image: "/Banque d_images/art1.jpg",
    sector: "Artistes & Créateurs",
  },
  {
    id: 3,
    title: "BSD/UFC Paris — Stage MMA",
    category: "Film / Vidéo",
    image: "/Banque d_images/StageUfc.jpg",
    sector: "Sport & Bien-être",
  },
]

export function PortfolioSection() {
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
    <section ref={sectionRef} id="portfolio" className="relative py-20 px-6 bg-black overflow-hidden">
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
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }}>
            Nos Réalisations
          </h2>
          <p className="text-xl md:text-2xl text-white mb-4 font-medium">
            Des images qui captivent, des campagnes qui marquent.
          </p>
          <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Explorez les projets qui incarnent l'aura visuelle et stratégique de Pixaura_IT. Films, photos et campagnes sociales conçus pour sublimer les marques et inspirer leur audience.
          </p>
        </div>

        {/* Aperçu des projets - 3 cartes premium ultra attirantes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {previewProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-[32px] bg-black border-2 border-white/10 hover:border-primary/60 transition-all duration-700 transform hover:scale-[1.06] hover:-translate-y-6 shadow-2xl hover:shadow-[#0073FF]/50 hover:shadow-2xl"
              style={{
                animation: `slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms forwards`,
                opacity: 0,
              }}
            >
              {/* Ultra Premium Multi-layer Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-muted/0 group-hover:from-primary/40 group-hover:via-primary/25 group-hover:to-muted/35 transition-all duration-700 rounded-[32px] opacity-0 group-hover:opacity-100 blur-2xl animate-pulse-glow" />
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/0 via-cyan-400/0 to-muted/0 group-hover:from-primary/25 group-hover:via-cyan-400/18 group-hover:to-muted/25 transition-all duration-900 rounded-[32px] opacity-0 group-hover:opacity-100 blur-3xl" />
              
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary/30 via-cyan-400/30 to-primary/30 p-[2px] animate-gradient-shift">
                  <div className="w-full h-full rounded-[32px] bg-black" />
                </div>
              </div>
              
              {/* Image */}
              <div className="relative h-72 overflow-hidden rounded-t-[32px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-125 transition-transform duration-1000 ease-out brightness-110 saturate-120 group-hover:brightness-120 group-hover:saturate-130"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                  loading="lazy"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-700" />
                
                {/* Animated Light Rays */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-primary/30 via-transparent to-transparent blur-2xl transform -skew-x-12 animate-pulse" />
                  <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-b from-cyan-400/25 via-transparent to-transparent blur-2xl transform skew-x-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                {/* Premium Badge with Enhanced Glow - Intelligent Format Detection */}
                <div className="absolute top-5 left-5 z-10">
                  {(() => {
                    // Détection intelligente du format principal basé sur le titre et le secteur
                    let badgeText = project.category
                    
                    // Logique intelligente pour déterminer le badge le plus significatif
                    if (project.sector === "Artistes & Créateurs") {
                      badgeText = "Création Artistique"
                    } else if (project.sector === "Immobilier") {
                      badgeText = "Production Immobilière"
                    } else if (project.sector === "Automobile") {
                      if (project.title.toLowerCase().includes("halloween") || project.title.toLowerCase().includes("shooting")) {
                        badgeText = "Shooting Créatif"
                      } else if (project.title.toLowerCase().includes("rally")) {
                        badgeText = "Coverage Événementiel"
                      } else {
                        badgeText = "Production Automobile"
                      }
                    } else if (project.sector === "Sport & Bien-être") {
                      if (project.title.toLowerCase().includes("stage") || project.title.toLowerCase().includes("mma") || project.title.toLowerCase().includes("ufc")) {
                        badgeText = "Production Sportive"
                      } else {
                        badgeText = "Production Sportive"
                      }
                    } else if (project.title.toLowerCase().includes("interview")) {
                      badgeText = "Interview Vidéo"
                    } else if (project.title.toLowerCase().includes("rally")) {
                      badgeText = "Coverage Événementiel"
                    } else if (project.title.toLowerCase().includes("halloween") || project.title.toLowerCase().includes("shooting")) {
                      badgeText = "Shooting Créatif"
                    } else if (project.category === "Photo") {
                      badgeText = "Shooting Photo"
                    } else if (project.category === "Film / Vidéo") {
                      badgeText = "Production Vidéo"
                    }
                    
                    return (
                      <span className="px-5 py-2 bg-gradient-to-r from-primary via-[#1AA3FF] to-primary text-white text-xs font-black rounded-full backdrop-blur-md shadow-xl shadow-primary/60 border-2 border-white/40 uppercase tracking-wider group-hover:scale-110 transition-transform duration-500">
                        {badgeText}
                      </span>
                    )
                  })()}
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-8 bg-gradient-to-b from-transparent via-black/30 to-black/70 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,115,255,0.15),transparent_50%)]" />
                </div>
                
                <h3 className="relative text-2xl font-black text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-cyan-400 group-hover:to-muted transition-all duration-700 group-hover:scale-105 transform" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.02em',
                }}>
                  {project.title}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-cyan-400/20 to-muted/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </h3>
                
                {/* Enhanced Decorative Separator */}
                <div className="relative mb-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 group-hover:w-24 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/50" />
                  <div className="absolute inset-0 w-12 h-1 bg-gradient-to-r from-primary/50 to-cyan-400/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="flex items-center gap-3 text-sm text-white/70 group-hover:text-primary/90 transition-all duration-700 group-hover:scale-105">
                  <span className="w-3 h-3 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/50 animate-pulse" />
                  <span className="font-bold group-hover:font-black transition-all duration-300">{project.sector}</span>
                </div>
              </div>
              
              {/* Enhanced Corner Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 via-cyan-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 blur-lg" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-muted/30 via-primary/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-12 blur-lg" />
              
              {/* Top Right Corner Light */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
              
              {/* Bottom Left Corner Light */}
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-muted/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          ))}
        </div>

        {/* CTA Button - Premium Design Ultra Attractif */}
        <div className="text-center relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-r from-primary/20 via-cyan-400/15 to-primary/20 rounded-full blur-3xl animate-pulse opacity-50" />
          </div>
          
          <Link
            href="/realisations"
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-primary via-[#1AA3FF] to-cyan-400 text-white font-black rounded-full overflow-hidden transition-all duration-500 hover:scale-110 shadow-2xl shadow-primary/60 hover:shadow-primary/80 border-2 border-white/20 hover:border-white/40"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontWeight: 900,
              boxShadow: '0 8px 32px rgba(0,115,255,0.5), inset 0 2px 0 rgba(255,255,255,0.2)',
            }}
          >
            {/* Multi-layer Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#1AA3FF] to-cyan-400 opacity-100 group-hover:opacity-110 transition-opacity duration-500 rounded-full" />
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 via-[#1AA3FF]/50 to-cyan-400/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-[#1AA3FF]/30 to-cyan-400/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-full" />
            
            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.3s' }} />
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.6s' }} />
            </div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-4">
              <span className="text-lg font-black tracking-wider transition-all duration-500 group-hover:tracking-widest group-hover:scale-105" style={{ 
                textShadow: '0 2px 16px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3)',
              }}>
                Voir toutes les réalisations
              </span>
              <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center border-2 border-white/50 transition-all duration-500 group-hover:bg-white/35 group-hover:border-white/70 group-hover:translate-x-2 group-hover:scale-125 group-hover:rotate-12 shadow-lg shadow-white/20">
                <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110" />
              </div>
            </span>
            
            {/* Inner Glow */}
            <div className="absolute inset-[2px] bg-gradient-to-t from-white/15 via-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full border-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 bg-white/30 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute top-0 right-0 w-6 h-6 bg-white/30 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute bottom-0 left-0 w-6 h-6 bg-white/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white/30 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </Link>
        </div>
      </div>
      
      {/* Section Separator - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
    </section>
  )
}
