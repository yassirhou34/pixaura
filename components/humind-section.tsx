"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export function HumindSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [cardHovered, setCardHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

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
      
      // 3D Card Effect
      if (cardRef.current && cardHovered) {
        const cardRect = cardRef.current.getBoundingClientRect()
        const cardX = e.clientX - cardRect.left - cardRect.width / 2
        const cardY = e.clientY - cardRect.top - cardRect.height / 2
        
        const rotateX = (cardY / cardRect.height) * 10
        const rotateY = (cardX / cardRect.width) * -10
        
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cardHovered])

  const handleCardMouseLeave = () => {
    setCardHovered(false)
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }

  return (
    <section ref={sectionRef} id="humind" className="relative py-8 px-6 bg-black overflow-hidden min-h-screen flex items-center">
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

      {/* Subtle light streaks - Enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* Logo "N" in bottom-left corner */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="text-white text-4xl font-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          N
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Indicator - Top of Card - Ultra Premium Decorated */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative flex items-center gap-4">
            {/* Left Decorative Line - Enhanced */}
            <div className="relative">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/80 to-cyan-400/80 opacity-90" />
              <div className="absolute inset-0 w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/40 blur-sm opacity-60 animate-pulse" />
            </div>
            
            {/* Center Indicator - Ultra Premium Decorated */}
            <div className="relative flex flex-col items-center gap-3">
              {/* Main Dot with Multi-layer Glow */}
              <div className="relative">
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 blur-xl opacity-60 animate-pulse" />
                {/* Middle Glow Ring */}
                <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-cyan-400/50 blur-lg opacity-70 animate-pulse" style={{ animationDelay: '0.2s' }} />
                {/* Main Dot */}
                <div className="relative w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 shadow-2xl shadow-cyan-400/80 animate-pulse" />
                {/* Inner Glow */}
                <div className="absolute inset-0.5 w-3 h-3 rounded-full bg-white/30 blur-sm" />
              </div>
              
              {/* "Humind" Label - Ultra Premium Typography */}
              <div className="relative">
                <span className="relative text-xs font-black text-white/90 uppercase tracking-widest drop-shadow-2xl z-10" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  textShadow: '0 0 30px rgba(0, 200, 255, 0.5), 0 0 60px rgba(124, 51, 255, 0.3)' 
                }}>
                  Humind
                </span>
                {/* Text Glow Background */}
                <span className="absolute inset-0 text-xs font-black uppercase tracking-widest bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Humind
                </span>
              </div>
              
              {/* Decorative Elements Below Label */}
              <div className="relative flex items-center gap-2 mt-1">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-60" />
                <div className="w-1 h-1 rounded-full bg-cyan-400/60 animate-pulse" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent via-purple-500/60 to-transparent opacity-60" />
              </div>
            </div>
            
            {/* Right Decorative Line - Enhanced */}
            <div className="relative">
              <div className="w-24 h-0.5 bg-gradient-to-l from-transparent via-purple-500/80 to-purple-500/80 opacity-90" />
              <div className="absolute inset-0 w-24 h-0.5 bg-gradient-to-l from-transparent via-purple-500/40 to-purple-500/40 blur-sm opacity-60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Ultra Premium Card - Revolutionary Design */}
        <div 
          ref={cardRef}
          className="relative group"
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={handleCardMouseLeave}
          style={{ transition: 'transform 0.1s ease-out' }}
        >
          {/* Multi-layer Glow Effects - Enhanced */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/50 via-cyan-400/40 via-purple-500/40 to-cyan-400/50 rounded-[2rem] blur-3xl opacity-70 animate-pulse" />
          <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-[2rem] blur-4xl opacity-50" />
          <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-[2rem] blur-5xl opacity-30" />
          
          {/* Main Card Container - Ultra Premium Glassmorphism with Creative Effects */}
          <div className="relative rounded-[2rem] overflow-hidden border border-cyan-400/40 shadow-2xl shadow-cyan-400/50 bg-gradient-to-br from-black/95 via-slate-900/95 to-black/95 backdrop-blur-2xl group-hover:shadow-cyan-400/70 transition-shadow duration-700">
            {/* Animated Border Glow - Premium */}
            <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-cyan-400/40 via-purple-500/40 to-cyan-400/40 p-[1.5px] animate-gradient-shift">
                <div className="w-full h-full rounded-[2rem] bg-black/95 backdrop-blur-2xl" />
              </div>
            </div>
            
            {/* Card Content Grid - Asymmetrical Premium Layout - Compact */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0">
              {/* Left Content Section - Premium Typography - Compact */}
              <div className="p-6 lg:p-8 flex flex-col justify-center space-y-4 relative z-10">
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/8 via-transparent to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Tag - Premium Badge with Creative Movement */}
                <div className="inline-flex relative z-10 group-hover:-translate-y-1 transition-transform duration-500">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-400/90 via-cyan-500/90 to-cyan-400/90 backdrop-blur-xl text-white text-xs font-black rounded-full uppercase tracking-wider shadow-xl shadow-cyan-400/60 border border-cyan-400/50 animate-pulse-slow group-hover:scale-105 transition-transform duration-500">
                    Média & Influence
                  </span>
                </div>
                
                {/* Heading - Ultra Premium Typography - Smaller */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <span className="text-white block mb-1">Découvrez</span>
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 via-purple-400 to-purple-500 bg-clip-text text-transparent animate-gradient-shift">
                      Humind
                    </span>
                    {/* Animated Underline */}
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                  </span>
                </h2>
                
                {/* Paragraph 1 - Premium Typography - Uniform Color - Smaller */}
                <p className="text-white/95 text-sm md:text-base leading-relaxed font-light relative z-10 tracking-wide">
                  Une plateforme d'interviews YouTube et podcast qui met en lumière des personnalités inspirantes avec authenticité et sincérité.
                </p>
                
                {/* Paragraph 2 - Premium Typography - Uniform Color - Smaller */}
                <p className="text-white/90 text-sm md:text-base leading-relaxed font-light relative z-10 tracking-wide">
                  À travers des récits authentiques, nos invités partagent leurs parcours, leurs doutes, leurs résiliences. Interviews adaptées à chaque réseau social.
                </p>
                
                {/* CTA Button - Ultra Premium Design - Smaller */}
                <div className="relative z-10 pt-2">
                  <Link
                    href="/humind"
                    className="group/btn relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 text-white font-black rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl shadow-cyan-400/60 hover:shadow-cyan-400/80"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {/* Multi-layer Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 opacity-100 group-hover/btn:opacity-110 transition-opacity duration-500" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/50 via-cyan-500/50 to-cyan-400/50 rounded-xl blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                    
                    {/* Button Content */}
                    <span className="relative z-10 text-xs uppercase tracking-widest flex items-center gap-2">
                      Explorer tous les épisodes
                      <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center border border-white/30 transition-all duration-300 group-hover/btn:bg-white/30 group-hover/btn:translate-x-1">
                        <span className="text-[10px]">→</span>
                      </span>
                    </span>
                    
                    {/* Inner Glow */}
                    <div className="absolute inset-[2px] bg-gradient-to-t from-white/10 via-transparent to-transparent rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  </Link>
                </div>
              </div>
              
              {/* Right Visual Section - Ultra Premium Image Display with Creative Movement - Compact */}
              <div className="relative min-h-[300px] lg:min-h-[350px] overflow-hidden group/image">
                {/* Image Background - Full Display with Bottom Movement on Hover */}
                <div className="absolute inset-0 group-hover/image:translate-y-8 transition-transform duration-1000 ease-out">
                  <Image
                    src="/Banque d_images/Copie de M7_03385.jpg"
                    alt="Humind Platform"
                    fill
                    className="object-cover brightness-105 saturate-110 group-hover/image:brightness-115 group-hover/image:saturate-120 group-hover/image:scale-105 transition-all duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                  />
                </div>
                
                {/* Ultra Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 group-hover/image:from-black/5 group-hover/image:via-transparent group-hover/image:to-black/15 transition-all duration-700" />
                
                {/* Premium Light Rays - Ultra Subtle */}
                <div className="absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-1000">
                  <div className="absolute top-0 left-1/3 w-1/3 h-full bg-gradient-to-b from-cyan-400/8 via-transparent to-transparent blur-3xl transform -skew-x-12 animate-pulse" />
                  <div className="absolute top-0 right-1/3 w-1/3 h-full bg-gradient-to-b from-purple-500/8 via-transparent to-transparent blur-3xl transform skew-x-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                {/* Premium Floating Badge - Top Right Corner with Creative Movement */}
                <div className="absolute top-8 right-8 z-20 opacity-0 group-hover/image:opacity-100 transition-all duration-700 transform translate-y-6 group-hover/image:translate-y-0 group-hover/image:translate-x-2">
                  <div className="relative px-5 py-2.5 bg-gradient-to-r from-cyan-400/95 via-cyan-500/95 to-cyan-400/95 backdrop-blur-xl rounded-full border border-cyan-400/60 shadow-2xl shadow-cyan-400/60 group-hover/image:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/60 to-cyan-500/60 rounded-full blur-xl animate-pulse" />
                    <span className="relative text-white text-xs font-black uppercase tracking-wider">Humind</span>
                  </div>
                </div>
                
                {/* Minimalist Geometric Elements - Ultra Modern with Creative Movement */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top Left Corner - Premium Lines with Movement */}
                  <div className="absolute top-8 left-8 w-20 h-0.5 bg-gradient-to-r from-cyan-400/70 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-700 group-hover/image:translate-x-2" />
                  <div className="absolute top-8 left-8 w-0.5 h-20 bg-gradient-to-b from-cyan-400/70 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-700 group-hover/image:translate-y-2" />
                  
                  {/* Bottom Right Corner - Premium Lines with Movement */}
                  <div className="absolute bottom-8 right-8 w-20 h-0.5 bg-gradient-to-l from-purple-500/70 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-700 group-hover/image:-translate-x-2" />
                  <div className="absolute bottom-8 right-8 w-0.5 h-20 bg-gradient-to-t from-purple-500/70 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-700 group-hover/image:-translate-y-2" />
                  
                  {/* Floating Orbs - Premium Effect with Creative Movement */}
                  <div className="absolute top-1/4 right-1/4 w-2.5 h-2.5 bg-cyan-400/50 rounded-full blur-sm opacity-0 group-hover/image:opacity-100 animate-pulse transition-all duration-700 group-hover/image:translate-y-4 group-hover/image:translate-x-2" style={{ animationDelay: '0.2s' }} />
                  <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-500/50 rounded-full blur-sm opacity-0 group-hover/image:opacity-100 animate-pulse transition-all duration-700 group-hover/image:-translate-y-4 group-hover/image:-translate-x-2" style={{ animationDelay: '0.4s' }} />
                  
                  {/* Additional Creative Elements - Floating Particles */}
                  <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-400/40 rounded-full blur-sm opacity-0 group-hover/image:opacity-100 animate-pulse transition-all duration-700 group-hover/image:translate-y-6" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-purple-500/40 rounded-full blur-sm opacity-0 group-hover/image:opacity-100 animate-pulse transition-all duration-700 group-hover/image:-translate-y-6" style={{ animationDelay: '0.8s' }} />
                  
                  {/* Creative Lines - Diagonal Movement */}
                  <div className="absolute top-1/2 left-0 w-24 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-700 group-hover/image:translate-x-4 group-hover/image:rotate-12" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute bottom-1/2 right-0 w-24 h-0.5 bg-gradient-to-l from-purple-500/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-700 group-hover/image:-translate-x-4 group-hover/image:-rotate-12" style={{ animationDelay: '0.5s' }} />
                </div>
                
                {/* Premium Border Glow Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover/image:border-cyan-400/40 rounded-[2rem] transition-all duration-700 opacity-0 group-hover/image:opacity-100" />
              </div>
            </div>
            
            {/* Corner Decorative Elements - Premium */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-500/40 rounded-bl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500/40 rounded-br-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>
      
      {/* Section Separator - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
    </section>
  )
}
