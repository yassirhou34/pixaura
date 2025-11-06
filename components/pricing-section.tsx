"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

export function PricingSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="pricing" className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Section Separator - Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
      
      <div className="max-w-5xl mx-auto">
        <div className="relative group/pricing text-center">
          {/* Multi-Layer Glow Effects - Ultra Premium */}
          <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-3xl blur-4xl opacity-40 group-hover/pricing:opacity-70 transition-opacity duration-1000" style={{ animation: 'pack-glow-pulse 4s ease-in-out infinite' }} />
          <div className="absolute -inset-6 bg-gradient-to-r from-white/15 via-white/20 to-white/15 rounded-3xl blur-3xl opacity-30 group-hover/pricing:opacity-50 transition-opacity duration-1000" />
          <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-2xl blur-2xl opacity-20 group-hover/pricing:opacity-40 transition-opacity duration-1000" />
          
          {/* Light Sweep Effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ 
              animation: 'light-sweep-premium 3s ease-in-out infinite',
            }} />
          </div>
          
          {/* Main Container - Ultra Premium Royal */}
          <div className="relative bg-black/90 backdrop-blur-3xl rounded-3xl border-2 border-white/25 p-12 md:p-20 shadow-2xl shadow-black/70 group-hover/pricing:border-white/40 group-hover/pricing:shadow-cyan-400/20 group-hover/pricing:shadow-purple-500/20 transition-all duration-700 overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-purple-500/8 to-cyan-400/5 opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700" style={{
              backgroundSize: '200% 200%',
              animation: 'gradientShiftAdvanced 6s ease infinite',
            }} />
            
            {/* Floating Particles */}
            {mounted && [...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full opacity-0 group-hover/pricing:opacity-50 ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-white'}`}
                style={{
                  left: `${15 + i * 8}%`,
                  top: `${20 + i * 7}%`,
                  animation: `particle-float-premium ${2.5 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
            
            {/* Corner Glow Effects */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tl-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-tr-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-bl-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
            
            <div className="relative z-10">
              {/* Title - Ultra Premium */}
              <div className="relative mb-8">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50 group-hover/pricing:opacity-80 transition-opacity duration-700" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white relative z-10 mb-6 group-hover/pricing:text-transparent group-hover/pricing:bg-clip-text group-hover/pricing:bg-gradient-to-r group-hover/pricing:from-cyan-400 group-hover/pricing:via-purple-500 group-hover/pricing:to-cyan-400 transition-all duration-700" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                }}>
                  Nos Offres
                </h2>
                {/* Professional Underline */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60 group-hover/pricing:opacity-100 group-hover/pricing:w-48 transition-all duration-700" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
              </div>
              
              {/* Text Content - Professional */}
              <div className="space-y-6 mb-12">
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto group-hover/pricing:text-white transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Des solutions marketing complètes adaptées à votre ambition. Découvrez nos packs Starter, Croissance et Signature, conçus pour accompagner votre marque à chaque étape de son développement.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto group-hover/pricing:text-gray-100 transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Production intégrée, créativité stratégique et suivi mesurable pour des résultats concrets.
                </p>
              </div>
              
              {/* Premium Button - Centered */}
              <div className="flex justify-center">
                <Link
                  href="/offre"
                  className="group/button relative px-12 py-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 text-white font-bold text-lg rounded-2xl hover:scale-110 transition-all duration-500 shadow-2xl shadow-cyan-400/30 hover:shadow-cyan-400/50 hover:shadow-purple-500/30 flex items-center justify-center gap-4 overflow-hidden"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {/* Multi-Layer Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-2xl blur-xl opacity-50 group-hover/button:opacity-80 transition-opacity duration-500" style={{ animation: 'pack-glow-pulse 2s ease-in-out infinite' }} />
                  
                  {/* Light Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000" />
                  
                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover/button:border-cyan-400/60 group-hover/button:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-500" />
                  
                  {/* Content */}
                  <span className="relative z-10">Découvrir nos offres</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover/button:translate-x-2 transition-transform duration-500" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-500" />
                </Link>
              </div>
            </div>
            
            {/* Corner Accents - Main Container */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700" style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }} />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-purple-500/40 rounded-tr-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }} />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700" style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }} />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-500/40 rounded-br-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }} />
          </div>
        </div>
      </div>
      
      {/* Section Separator - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
    </section>
  )
}
