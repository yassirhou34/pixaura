"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Play, Clock, ArrowRight } from "lucide-react"

// Structure de données pour les épisodes
interface Episode {
  id: string
  title: string
  guest: string
  category: "Sport" | "Réinsertion" | "Artisanat" | "Création" | "Luxe"
  duration: string
  date: string
  youtubeId: string
  description: string
}

// Données des épisodes
const episodes: Episode[] = [
  {
    id: "1",
    title: "IL A JOUÉ AVEC MARADONA: RAÚL VARGAS RÍOS SUR HUMIND",
    guest: "Raúl Vargas Ríos",
    category: "Sport",
    duration: "43:00",
    date: "il y a 2 semaines",
    youtubeId: "EMCtYNYLwyE",
    description: "Interview exclusive avec Raúl Vargas Ríos sur son parcours exceptionnel."
  },
  {
    id: "2",
    title: "DE BRAQUEUR À PROF: KAMEL MADANI SUR HUMIND",
    guest: "Kamel Madani",
    category: "Réinsertion",
    duration: "24:55",
    date: "il y a 4 semaines",
    youtubeId: "sRM6w8wUk2s",
    description: "Parcours de transformation et seconde chance."
  },
  {
    id: "3",
    title: "ON VISITE LA FONDERIE AUDIARD: CONFIDENCE ALEX CHOUSSY",
    guest: "Alex Choussy",
    category: "Artisanat",
    duration: "24:53",
    date: "il y a 1 mois",
    youtubeId: "ztysZbvECf8",
    description: "Découverte de l'artisanat d'exception avec Alex Choussy."
  },
  {
    id: "4",
    title: "MICHEL AUDIARD SCULPTEUR AUTODIDACTE: 50 ANS D'HISTOIRE",
    guest: "Michel Audiard",
    category: "Création",
    duration: "44:14",
    date: "il y a 1 mois",
    youtubeId: "puawY9rH6T0",
    description: "Retour sur 50 ans d'histoire et de création artistique."
  },
  {
    id: "5",
    title: "ÉPISODE 5",
    guest: "Invité à définir",
    category: "Luxe",
    duration: "30:00",
    date: "il y a 2 mois",
    youtubeId: "SfaIXswMO_c",
    description: "Un épisode exceptionnel à découvrir."
  }
]

const categories = ["Tous", "Sport", "Réinsertion", "Artisanat", "Création", "Luxe"] as const

export default function HumindPage() {
  const [activeFilter, setActiveFilter] = useState<"Tous" | string>("Tous")
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

  // Filtrer les épisodes
  const filteredEpisodes = useMemo(() => {
    if (activeFilter === "Tous") {
      return episodes
    }
    return episodes.filter(ep => ep.category === activeFilter)
  }, [activeFilter])

  // Compteurs par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    counts["Tous"] = episodes.length
    categories.slice(1).forEach(cat => {
      counts[cat] = episodes.filter(ep => ep.category === cat).length
    })
    return counts
  }, [])

  return (
    <main ref={sectionRef} className="relative bg-black min-h-screen overflow-hidden">
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

      {/* Enhanced scattered light points */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => {
            const seed = i * 0.1375
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

      {/* Subtle light streaks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Section Hero - Ultra Premium Design */}
        <section className="relative py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            {/* Premium Decorative Elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-3xl opacity-50 animate-pulse" />
            
            {/* Brand Name - Ultra Premium */}
            <div className="relative">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white relative z-10" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}>
                <span className="relative inline-block">
                  Humind
                  <sup className="text-xl md:text-2xl ml-1 top-[-0.5em] relative">®</sup>
                  {/* Animated Glow Behind Text */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Humind®
                  </span>
                </span>
              </h1>
              {/* Premium Underline Animation */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm opacity-60 animate-pulse" />
            </div>
            
            {/* Tagline - Premium Typography */}
            <div className="relative pt-4">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.01em' }}>
                <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                  Le visage humain de ceux qui font bouger le monde
                </span>
              </p>
            </div>
            
            {/* Description - Enhanced */}
            <div className="relative pt-6 max-w-3xl mx-auto">
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-light" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.01em' }}>
                Une plateforme d'interviews authentiques où des personnalités inspirantes partagent leurs parcours, leurs résiliences et leurs histoires.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed font-light mt-3" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.01em' }}>
                Formats courts pour les réseaux, formats longs pour YouTube et podcast.
              </p>
            </div>
            
            {/* CTA Button - Ultra Premium Professional Frame */}
            <div className="pt-10">
              <div className="relative inline-block mx-auto">
                {/* Premium Frame Container */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                
                {/* Decorative Corner Elements */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500/50 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-purple-500/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Main Button */}
                <button className="group relative px-10 py-5 border-2 border-cyan-400/70 rounded-xl text-cyan-400 font-bold hover:border-cyan-400 transition-all duration-500 flex items-center gap-3 mx-auto overflow-hidden backdrop-blur-md bg-gradient-to-br from-black/60 via-black/40 to-black/60 hover:from-black/80 hover:via-black/60 hover:to-black/80 shadow-2xl shadow-cyan-400/20 hover:shadow-cyan-400/40 hover:scale-105" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/15 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  
                  {/* Inner Glow */}
                  <div className="absolute inset-[2px] bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="relative">
                      <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
                      <span className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-400 blur-md opacity-50 animate-pulse" />
                    </span>
                    <span className="text-base md:text-lg uppercase tracking-wider">Nouveau contenu chaque semaine</span>
                  </span>
                  
                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/40 via-purple-500/40 to-cyan-400/40 p-[2px] animate-gradient-shift">
                      <div className="w-full h-full rounded-xl bg-black/80" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section Filtres + Grille - Ultra Premium & Distinctive */}
        <section className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Premium Frame Container - Distinctive from other blocks */}
            <div className="relative group/filters">
              {/* Premium Glow Effects - Multi-layer */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-purple-500/20 rounded-3xl blur-2xl opacity-40 group-hover/filters:opacity-60 transition-opacity duration-700 animate-pulse" />
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/10 via-cyan-400/10 to-purple-500/10 rounded-3xl blur-3xl opacity-20 group-hover/filters:opacity-40 transition-opacity duration-700" />
              
              {/* Premium Frame Border - Distinctive */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 group-hover/filters:border-white/20 transition-all duration-700 bg-gradient-to-br from-black/95 via-black/85 to-black/95 backdrop-blur-2xl shadow-2xl shadow-black/50 group-hover/filters:shadow-purple-500/20">
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/filters:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/40 via-cyan-400/40 to-purple-500/40 p-[2px] animate-gradient-shift">
                    <div className="w-full h-full rounded-3xl bg-black/90" />
                  </div>
                </div>
                
                {/* Decorative Corner Elements - Premium */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-purple-500/40 rounded-tl-3xl opacity-0 group-hover/filters:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl opacity-0 group-hover/filters:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-purple-500/40 rounded-bl-3xl opacity-0 group-hover/filters:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl opacity-0 group-hover/filters:opacity-100 transition-opacity duration-700" />
                
                {/* Content Container */}
                <div className="relative z-10 p-8 md:p-12">
                  {/* Filters - Ultra Premium & Modern Professional - No Blue, No Hover */}
                  <div className="mb-12">
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-6">
                      {categories.map((category) => {
                        const isActive = activeFilter === category
                        const count = categoryCounts[category] || 0
                        
                        return (
                          <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`relative flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                              isActive
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {/* Premium Background - Active */}
                            {isActive && (
                              <>
                                {/* Premium Background - White/Gold Elegant */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/10 to-white/15 backdrop-blur-xl rounded-lg border border-white/30 shadow-2xl shadow-white/10" />
                                
                                {/* Elegant Border Glow */}
                                <div className="absolute inset-0 rounded-lg pointer-events-none">
                                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 via-white/30 to-white/20 p-[1px]">
                                    <div className="w-full h-full rounded-lg bg-black/50" />
                                  </div>
                                </div>
                                
                                {/* Inner Light */}
                                <div className="absolute inset-[1px] bg-gradient-to-t from-white/8 via-transparent to-transparent rounded-lg" />
                              </>
                            )}
                            
                            {/* Premium Background - Inactive */}
                            {!isActive && (
                              <>
                                {/* Elegant Subtle Background */}
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 shadow-lg shadow-black/50" />
                                
                                {/* Inner Subtle Light */}
                                <div className="absolute inset-[1px] bg-gradient-to-t from-white/3 via-transparent to-transparent rounded-lg" />
                              </>
                            )}
                            
                            {/* Content */}
                            <span className="relative z-10 flex items-center gap-3">
                              <span className="font-semibold tracking-wide">{category}</span>
                              {count > 0 && (
                                <span className={`text-[11px] px-2.5 py-1 rounded-md font-bold transition-all duration-300 ${
                                  isActive 
                                    ? "bg-white/25 text-white backdrop-blur-sm border border-white/25 shadow-lg shadow-white/10" 
                                    : "bg-white/8 text-gray-400 border border-white/8"
                                }`}>
                                  {count}
                                </span>
                              )}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    
                    {/* Count Message - Ultra Premium with Enhanced Lines */}
                    <div className="mt-8 flex items-center gap-4">
                      {/* Left Decorative Line - Enhanced */}
                      <div className="flex-1 relative">
                        <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-white/40" />
                        <div className="absolute top-0 left-0 h-[1.5px] w-32 bg-gradient-to-r from-white/50 to-transparent blur-sm opacity-60" />
                        <div className="absolute top-0 right-0 h-[1.5px] w-24 bg-gradient-to-l from-white/30 to-transparent opacity-40" />
                      </div>
                      
                      {/* Count Text - Premium */}
                      <div className="relative px-6 py-2">
                        <p className="text-white text-sm font-bold tracking-wider uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          <span className="text-white font-black text-lg">{filteredEpisodes.length}</span>
                          <span className="mx-2 text-white/80">épisode{filteredEpisodes.length > 1 ? 's' : ''} trouvé{filteredEpisodes.length > 1 ? 's' : ''}</span>
                        </p>
                        {/* Text Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-md opacity-50" />
                      </div>
                      
                      {/* Right Decorative Line - Enhanced */}
                      <div className="flex-1 relative">
                        <div className="h-[1.5px] bg-gradient-to-l from-transparent via-white/30 to-white/40" />
                        <div className="absolute top-0 right-0 h-[1.5px] w-32 bg-gradient-to-l from-white/50 to-transparent blur-sm opacity-60" />
                        <div className="absolute top-0 left-0 h-[1.5px] w-24 bg-gradient-to-r from-white/30 to-transparent opacity-40" />
                      </div>
                    </div>
                  </div>

                  {/* Section Title - Ultra Premium Enhanced */}
                  <div className="relative mb-16">
                    <div className="relative">
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.03em' }}>
                        <span className="relative inline-block">
                          Tous les épisodes
                          {/* Animated Glow Behind Text - Enhanced */}
                          <span className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent blur-3xl opacity-40 animate-pulse" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Tous les épisodes
                          </span>
                        </span>
                      </h2>
                      
                      {/* Premium Underline - Enhanced */}
                      <div className="absolute -bottom-3 left-0 w-40 h-1.5 bg-gradient-to-r from-white/60 via-white/80 to-transparent blur-sm opacity-70" />
                      <div className="absolute -bottom-2 left-0 w-32 h-0.5 bg-gradient-to-r from-white/80 to-transparent opacity-50" />
                    </div>
                  </div>

                  {/* Episodes Grid - Ultra Premium World-Class Cards - Revolutionary Advanced Animations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredEpisodes.map((episode, index) => (
                      <a
                        key={episode.id}
                        href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/95 via-black/80 to-black/95 border border-white/20 transition-all duration-1500 cursor-pointer transform hover:scale-[1.05] hover:-translate-y-4 shadow-2xl hover:shadow-white/30 block"
                        style={{
                          animation: `slideInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 200}ms forwards`,
                          opacity: 0,
                        }}
                      >
                        {/* Ultra Premium Multi-Layer Glow Effects - Revolutionary */}
                        <div className="absolute -inset-3 bg-gradient-to-br from-white/8 via-white/15 to-white/8 rounded-3xl opacity-0 group-hover:opacity-100 blur-4xl transition-all duration-1500 animate-energy-pulse" />
                        <div className="absolute -inset-2 bg-gradient-to-br from-white/10 via-white/20 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-1500" style={{ transitionDelay: '150ms' }} />
                        <div className="absolute -inset-1 bg-gradient-to-br from-white/15 via-white/25 to-white/15 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-1500" style={{ transitionDelay: '300ms' }} />
                        
                        {/* Holographic Animated Border Glow - World-Class */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500">
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/40 via-white/60 via-white/50 to-white/40 p-[2px] animate-holographic-shift" style={{
                            backgroundSize: '200% 200%',
                            animation: 'holographic-shift 4s ease-in-out infinite',
                          }}>
                            <div className="w-full h-full rounded-3xl bg-black/95 backdrop-blur-2xl" />
                          </div>
                        </div>
                        
                        {/* Morphing Wave Effect - Revolutionary */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500 pointer-events-none overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 animate-morph-wave" style={{
                            animation: 'morph-wave 8s ease-in-out infinite',
                            mixBlendMode: 'screen',
                          }} />
                        </div>
                        
                        {/* Liquid Flow Background - Advanced */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1500 pointer-events-none overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-white/3" style={{
                            backgroundSize: '400% 400%',
                            animation: 'liquid-flow 6s ease-in-out infinite',
                          }} />
                        </div>
                        
                        {/* Ultra Premium Decorative Corner Elements - Revolutionary */}
                        <div className="absolute top-0 left-0 w-24 h-24 border-t-[4px] border-l-[4px] border-white/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-cosmic-rotation" style={{ animation: 'cosmic-rotation 4s linear infinite' }} />
                        <div className="absolute top-0 right-0 w-24 h-24 border-t-[4px] border-r-[4px] border-white/40 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-cosmic-rotation" style={{ animation: 'cosmic-rotation 4s linear infinite', animationDirection: 'reverse' }} />
                        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[4px] border-l-[4px] border-white/40 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-cosmic-rotation" style={{ animation: 'cosmic-rotation 4s linear infinite' }} />
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[4px] border-r-[4px] border-white/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-cosmic-rotation" style={{ animation: 'cosmic-rotation 4s linear infinite', animationDirection: 'reverse' }} />
                        
                        {/* Ripple Effects from Corners - Advanced */}
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border-2 border-white/20 opacity-0 group-hover:opacity-100"
                            style={{
                              width: '20px',
                              height: '20px',
                              top: i < 2 ? '0' : 'auto',
                              bottom: i >= 2 ? '0' : 'auto',
                              left: i % 2 === 0 ? '0' : 'auto',
                              right: i % 2 === 1 ? '0' : 'auto',
                              transform: i < 2 ? 'translate(-50%, -50%)' : i === 2 ? 'translate(-50%, 50%)' : 'translate(50%, 50%)',
                              animation: `ripple-expand ${2 + i * 0.5}s ease-out infinite`,
                              animationDelay: `${i * 0.3}s`,
                            }}
                          />
                        ))}
                        
                        {/* Multi-Layer Inner Ambient Light - Revolutionary */}
                        <div className="absolute inset-[3px] bg-gradient-to-t from-white/12 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500" />
                        <div className="absolute inset-[3px] bg-gradient-to-b from-transparent via-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500" />
                        <div className="absolute inset-[3px] bg-gradient-to-r from-white/8 via-transparent to-white/8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500" />
                        
                        {/* Light Sweep Effect - Advanced */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1500 pointer-events-none overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-light-sweep" style={{
                            width: '200%',
                            height: '200%',
                            animation: 'light-sweep 3s ease-in-out infinite',
                          }} />
                        </div>
                        
                        {/* Content Container - Premium Spacing */}
                        <div className="relative z-10 p-8 space-y-5">
                          {/* Play Icon - Ultra Premium Revolutionary with World-Class Animations */}
                          <div className="absolute top-6 left-6 w-20 h-20 bg-gradient-to-br from-white/25 via-white/20 to-white/25 backdrop-blur-2xl rounded-2xl flex items-center justify-center border-[3px] border-white/40 shadow-2xl shadow-white/30 group-hover:scale-[1.4] group-hover:rotate-[20deg] transition-all duration-1000" style={{ animation: 'energy-pulse 3s ease-in-out infinite' }}>
                            {/* Multi-Layer Icon Glow - Revolutionary */}
                            <div className="absolute -inset-3 bg-white/25 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 animate-pulse" />
                            <div className="absolute -inset-2 bg-white/35 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-1000" style={{ transitionDelay: '100ms' }} />
                            <div className="absolute -inset-1 bg-white/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-1000" style={{ transitionDelay: '200ms' }} />
                            
                            <Play className="w-10 h-10 text-white relative z-10 animate-prismatic-glow" fill="currentColor" style={{ animation: 'prismatic-glow 2s ease-in-out infinite' }} />
                            
                            {/* Advanced Inner Icon Glow */}
                            <div className="absolute inset-3 bg-gradient-to-br from-white/30 via-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-md" />
                            
                            {/* Multi Rotating Glow Rings - Revolutionary */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-spin" style={{ animationDuration: '2s', animationTimingFunction: 'linear' }} />
                            <div className="absolute inset-1 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-spin" style={{ animationDuration: '3s', animationTimingFunction: 'linear', animationDirection: 'reverse' }} />
                            
                            {/* Orbiting Particles - Advanced */}
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100"
                                style={{
                                  animation: `particle-orb ${3 + i}s linear infinite`,
                                  animationDelay: `${i * 0.5}s`,
                                  transformOrigin: 'center',
                                }}
                              />
                            ))}
                          </div>

                          {/* Content - Premium Typography */}
                          <div className="pt-20 space-y-4">
                            {/* Title - Ultra Premium */}
                            <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-tight group-hover:text-white transition-all duration-700" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.03em', textShadow: '0 2px 20px rgba(255,255,255,0.1)' }}>
                              {episode.title}
                            </h3>
                            
                            {/* Episode Info - Premium Layout */}
                            <div className="flex items-center gap-3 text-gray-300 text-sm">
                              <span className="font-bold text-white text-sm">{episode.guest}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                              <span className="text-gray-300 text-sm font-medium">{episode.duration}</span>
                            </div>
                            
                            {/* Date - Premium */}
                            <div className="text-gray-400 text-xs font-semibold tracking-wide uppercase">
                              {episode.date}
                            </div>
                            
                            {/* YouTube Link - Ultra Premium with Advanced Animation */}
                            <div className="pt-3">
                              <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-bold transition-all duration-700 group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-xl group-hover:shadow-white/20">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-lg" />
                                
                                {/* Inner Glow */}
                                <div className="absolute inset-[1px] bg-gradient-to-t from-white/10 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                <span className="relative z-10">Voir sur YouTube</span>
                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-700 group-hover:translate-x-2 group-hover:scale-110" />
                              </div>
                            </div>
                          </div>

                          {/* Category Badge - Ultra Premium with Advanced Effects */}
                          <div className="absolute bottom-6 right-6">
                            <div className="relative">
                              {/* Badge Glow Layers */}
                              <div className="absolute -inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 animate-pulse" />
                              <div className="absolute -inset-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700" />
                              
                              <span className="relative px-4 py-2 bg-gradient-to-r from-white/25 via-white/20 to-white/25 backdrop-blur-xl text-white text-[11px] font-black rounded-full uppercase tracking-wider shadow-2xl shadow-white/20 border-2 border-white/30 group-hover:scale-110 group-hover:border-white/40 transition-all duration-700">
                                {episode.category}
                              </span>
                              
                              {/* Badge Inner Glow */}
                              <div className="absolute inset-[2px] bg-gradient-to-t from-white/15 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Revolutionary Floating Particles - Advanced Multi-Layer Animation */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1.5 h-1.5 bg-white/40 rounded-full opacity-0 group-hover:opacity-100"
                              style={{
                                left: `${10 + (i * 8)}%`,
                                top: `${15 + (i * 7)}%`,
                                animation: `floatAdvanced ${2 + (i % 4)}s ease-in-out infinite`,
                                animationDelay: `${i * 0.15}s`,
                                transition: 'opacity 0.8s ease-in-out',
                                boxShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
                              }}
                            />
                          ))}
                          {/* Secondary Particle Layer */}
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={`secondary-${i}`}
                              className="absolute w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100"
                              style={{
                                left: `${20 + (i * 15)}%`,
                                top: `${25 + (i * 12)}%`,
                                animation: `particle-orb ${4 + (i % 3)}s linear infinite`,
                                animationDelay: `${i * 0.4}s`,
                                transition: 'opacity 0.8s ease-in-out',
                              }}
                            />
                          ))}
                        </div>
                        
                        {/* Revolutionary Background Pattern - Advanced Matrix Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1500 rounded-3xl overflow-hidden pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/8" style={{
                            backgroundImage: `
                              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px),
                              repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(255,255,255,0.02) 15px, rgba(255,255,255,0.02) 30px)
                            `,
                            backgroundSize: '200% 200%',
                            animation: 'liquid-flow 8s ease-in-out infinite',
                          }} />
                        </div>
                        
                        {/* Matrix Rain Effect - Revolutionary */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1500 rounded-3xl overflow-hidden pointer-events-none">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={`rain-${i}`}
                              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/10 to-white/20"
                              style={{
                                left: `${15 + (i * 20)}%`,
                                animation: `matrix-rain ${3 + (i % 2)}s linear infinite`,
                                animationDelay: `${i * 0.5}s`,
                              }}
                            />
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

