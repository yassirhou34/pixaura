"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"

const values = [
  {
    badge: "Créativité",
    title: "Créativité contemporaine",
    description: "Direction artistique, storytelling visuel, esthétique inspirée des codes cinématiques.",
    gradient: "from-purple-500 via-pink-500 to-purple-600",
  },
  {
    badge: "Intelligence",
    title: "Intelligence stratégique",
    description: "Maîtrise des algorithmes, data, performance marketing et ciblage digital.",
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
  },
  {
    badge: "Transmission",
    title: "Transmission & accompagnement",
    description: "Formations, ateliers, accompagnement stratégique pour faire grandir les marques.",
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
  },
]

export function AgenceHomeSection() {
  const { t } = useTranslation()
  
  const founders = [
    {
      name: t("agenceHome.franckName"),
      role: t("agenceHome.franckRole"),
      image: "/Banque d_images/Copie de M7_03372.jpg",
      description: t("agenceHome.franckDesc"),
      vision: t("agenceHome.franckVision"),
    },
    {
      name: t("agenceHome.julienName"),
      role: t("agenceHome.julienRole"),
      image: "/Banque d_images/Copie de M7_01248.jpg",
      description: t("agenceHome.julienDesc"),
      vision: t("agenceHome.julienVision"),
    },
  ]

  const commitments = [
    {
      badge: "Transparence",
      title: "Transparence & contrat clair",
      description: "CGV et droit à l'image sécurisés.",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
    },
    {
      badge: "Excellence",
      title: "Excellence mesurable",
      description: "KPI, reporting, ROI mensuel.",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
    },
    {
      badge: "Vision",
      title: "Vision responsable",
      description: "Production locale, engagement durable et éthique.",
      gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    },
  ]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="agence" className="relative bg-transparent py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Manifester Valeurs */}
        <Reveal>
          <div className="mb-20 text-left">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              {t("agenceHome.valuesBadge")}
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-left">
              {t("agenceHome.valuesTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base text-white/70 md:text-lg text-left">
              {t("agenceHome.valuesDesc")}
            </p>
          </div>
        </Reveal>

        {/* Values Cards - Style Réalisations Premium */}
        <div className="mb-32 grid gap-8 md:grid-cols-3">
          {values.map((value, index) => {
            return (
              <Reveal key={index} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/8 text-white backdrop-blur-2xl transition duration-700 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:border-white/30 hover:bg-white/12 hover:shadow-[0_45px_140px_rgba(0,0,0,0.55)]">
                  {/* Premium Glow Effects - Style Réalisations */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-primary/20 via-white/10 to-cyan-400/20 blur-3xl animate-pulse" />
                    <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-60" />
                  </div>

                  {/* Badge Header Section - Replacing Icon - Same height as original */}
                  <div className="relative h-64 w-full overflow-hidden flex items-center justify-center">
                    {/* Background Gradient - More Visible */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/8 to-white/15" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Badge - Centered - Larger size */}
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="inline-block rounded-full border border-white/25 bg-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.35em] text-white backdrop-blur-md">
                        {value.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content Section - Centered */}
                  <div className="flex flex-col gap-5 px-8 pt-8 pb-10 text-white text-center">
                    <h3 className="text-2xl font-bold leading-tight md:text-3xl text-white">
                      {value.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-white/90 font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Section Separator */}
        <div className="relative mb-20 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/25 to-transparent">
              <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-blue-400/50 via-purple-400/70 to-cyan-400/50" />
            </div>
          </div>
        </div>

        {/* Section Les Fondateurs */}
        <Reveal>
          <div className="mb-16 text-left">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              {t("agenceHome.teamBadge")}
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-left">
              {t("agenceHome.teamTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base text-white/70 md:text-lg text-left">
              {t("agenceHome.teamDesc")}
            </p>
          </div>
        </Reveal>

        {/* Founders Cards - Mobile: Style NOS EXPERTISES, Desktop: Split Layout */}
        <div className="mb-32 grid gap-10 md:grid-cols-2">
          {founders.map((founder, index) => (
            <Reveal key={index} delay={index * 150}>
              {/* Mobile: THE ULTIMATE PREMIUM VERSION - BEST CREATION */}
              <div className="md:hidden group relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/25 bg-gradient-to-br from-white/10 via-white/8 to-white/6 p-8 sm:p-12 text-white backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/40 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/10 hover:to-white/8 hover:shadow-[0_20px_60px_rgba(0,115,255,0.4),0_0_0_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.3)]">
                {/* Ultimate Multi-Layer Glow Effects - Always Visible */}
                <div className="pointer-events-none absolute -inset-6 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-cyan-400/25 via-purple-500/25 to-cyan-400/25 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/15 via-transparent to-white/15 blur-2xl" />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-purple-500/10 via-transparent to-cyan-400/10 blur-xl" />
                </div>

                {/* Premium Animated Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                    animation: 'patternMove 20s linear infinite',
                  }} />
                </div>

                {/* Image - MAXIMUM CLARITY & BEAUTY - Ultra Clear */}
                <div className="absolute top-0 right-0 h-full w-full sm:w-2/5 overflow-hidden rounded-r-[32px] sm:rounded-r-[40px] opacity-85 sm:opacity-90">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-center scale-110 group-hover:scale-115 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    sizes="100vw"
                    priority
                  />
                  {/* Ultra light gradient - maximum image visibility */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/25 to-black/10 sm:from-black/50 sm:via-black/20 sm:to-black/40" />
                  {/* Premium light effects on image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/15 to-cyan-400/15 opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  {/* Animated light sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{
                    transform: 'translateX(-100%)',
                    animation: 'lightSweep 3s ease-in-out infinite',
                  }} />
                </div>

                {/* Content - Ultimate Premium Typography & Perfect Spacing */}
                <div className="relative flex flex-col gap-6 sm:gap-8 z-10">
                  {/* Ultimate Premium Badge - Extraordinary */}
                  <span className="inline-flex w-fit items-center gap-3 sm:gap-3.5 rounded-full border-2 border-white/30 bg-gradient-to-r from-white/20 via-white/18 to-white/20 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-[0.45em] sm:tracking-[0.5em] text-white shadow-[0_0_50px_rgba(89,129,255,0.45),0_0_80px_rgba(56,189,248,0.3),0_6px_20px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(89,129,255,0.55),0_0_100px_rgba(56,189,248,0.4),0_8px_24px_rgba(0,0,0,0.5)] group-hover:border-white/40 group-hover:bg-gradient-to-r group-hover:from-white/25 group-hover:via-white/20 group-hover:to-white/25 group-hover:scale-105">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] animate-pulse" style={{ animationDuration: '2s' }} />
                    • {t("agenceHome.founder")}
                  </span>
                  
                  {/* Ultimate Premium Name - Extra Large & Beautiful */}
                  <h3 className="max-w-2xl text-4xl sm:text-5xl md:text-6xl font-black leading-[1.02] text-white tracking-tight" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '-0.03em',
                    textShadow: '0 3px 25px rgba(0,0,0,0.6), 0 6px 50px rgba(0,0,0,0.4), 0 0 80px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.8)',
                    lineHeight: '1.02',
                  }}>
                    {founder.name}
                  </h3>
                  
                  {/* Ultimate Premium Role - Beautiful Gradient */}
                  <p className="max-w-2xl text-sm sm:text-base font-extrabold uppercase tracking-[0.25em] leading-tight bg-gradient-to-r from-purple-400 via-purple-300 via-cyan-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_3px_15px_rgba(168,85,247,0.5),0_0_30px_rgba(56,189,248,0.3)]" style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease infinite',
                  }}>
                    {founder.role}
                  </p>
                  
                  {/* Ultimate Premium Description - Perfect Readability */}
                  <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white leading-relaxed font-semibold" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.7)',
                    lineHeight: '1.8',
                  }}>
                    {founder.description}
                  </p>
                  
                  {/* Ultimate Premium Separator - Extraordinary Glow */}
                  <div className="max-w-2xl pt-6 border-t-2 border-white/35 relative">
                    <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-cyan-400/80 via-purple-500/80 to-cyan-400/80 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-cyan-400/60 via-purple-500/60 to-transparent blur-sm" />
                    <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-medium pt-6" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.7)',
                      lineHeight: '1.85',
                    }}>
                      {founder.vision}
                    </p>
                  </div>
                </div>

                {/* Ultimate Premium Corner Accents - Enhanced */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-[32px] opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:border-white/50" />
                <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/30 rounded-bl-[32px] opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:border-white/50" />
                
                {/* Premium Light Rays */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Desktop: Original Split Layout */}
              <div className="hidden md:block group relative overflow-hidden rounded-[32px] border border-white/25 bg-gradient-to-br from-white/12 via-white/8 to-white/5 text-white backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01] hover:border-white/40 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-white/7 hover:shadow-[0_30px_100px_rgba(0,115,255,0.25),0_0_0_1px_rgba(255,255,255,0.1)]">
                {/* Premium Multi-Layer Glow Effects */}
                <div className="pointer-events-none absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-primary/25 via-white/15 to-cyan-400/25 blur-3xl" />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/10 via-transparent to-white/10 blur-2xl" />
                </div>
                
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                  }} />
                </div>
                
                {/* Content Layout - Horizontal */}
                <div className="relative flex flex-row h-full min-h-[321px]">
                  {/* Image Container - Left Side (42%) */}
                  <div className="relative w-[42%] overflow-hidden">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    {/* Enhanced Gradient Overlays for Better Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />
                    
                    {/* Premium Badge - Enhanced Visibility */}
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-gradient-to-br from-white/25 via-white/20 to-white/15 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.35em] text-white backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                        {t("agenceHome.founder")}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Container - Right Side (58%) */}
                  <div className="relative w-[58%] p-10 flex flex-col justify-center z-10">
                    {/* Enhanced Background for Better Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 rounded-r-[32px]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/15 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-r-[32px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
                    
                    {/* Name - Ultra Large Bold with Premium Typography */}
                    <h3 className="relative text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-5 tracking-tight" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '-0.03em',
                      textShadow: '0 3px 25px rgba(0,0,0,0.5), 0 0 50px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.8)',
                    }}>
                      {founder.name}
                    </h3>
                    
                    {/* Premium Divider Line with Glow */}
                    <div className="relative w-full h-[1px] mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-cyan-400/40 to-primary/40 blur-sm opacity-70" />
                    </div>
                    
                    {/* Role - Enhanced Readability */}
                    <p className="relative text-white text-[13px] font-bold uppercase tracking-[0.4em] leading-tight mb-8" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '0.35em',
                      textShadow: '0 2px 15px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.7)',
                    }}>
                      {founder.role}
                    </p>
                    
                    {/* Description - Ultra Clear & Readable */}
                    <p className="relative text-white text-[16px] leading-[1.75] font-medium mb-8" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      lineHeight: '1.75',
                      textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.8)',
                    }}>
                      {founder.description}
                    </p>
                    
                    {/* Vision - Premium Separated Section */}
                    <div className="relative pt-6 border-t border-white/25">
                      <p className="text-white text-[14px] leading-[1.8] font-normal" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.8',
                        textShadow: '0 2px 18px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.75)',
                      }}>
                        {founder.vision}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Section Separator */}
        <div className="relative mb-20 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/25 to-transparent">
              <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-blue-400/50 via-purple-400/70 to-cyan-400/50" />
            </div>
          </div>
        </div>

        {/* Section Labels & Engagements */}
        <Reveal>
          <div className="mb-16 text-left">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              {t("agenceHome.commitmentsBadge")}
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-left">
              {t("agenceHome.commitmentsTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base text-white/70 md:text-lg text-left whitespace-pre-line">
              {t("agenceHome.commitmentsDesc")}
            </p>
          </div>
        </Reveal>

        {/* Commitments Cards - Style Réalisations Premium */}
        <div className="grid gap-8 md:grid-cols-3 md:items-stretch">
          {commitments.map((commitment, index) => {
            return (
              <Reveal key={index} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/8 text-white backdrop-blur-2xl transition duration-700 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:border-white/30 hover:bg-white/12 hover:shadow-[0_45px_140px_rgba(0,0,0,0.55)] h-full flex flex-col">
                  {/* Premium Glow Effects - Style Réalisations */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-primary/20 via-white/10 to-cyan-400/20 blur-3xl animate-pulse" />
                    <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-60" />
                  </div>

                  {/* Badge Header Section - Replacing Icon - Same height as original */}
                  <div className="relative h-64 w-full overflow-hidden flex items-center justify-center">
                    {/* Background Gradient - More Visible */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/8 to-white/15" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Badge - Centered - Larger size */}
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="inline-block rounded-full border border-white/25 bg-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.35em] text-white backdrop-blur-md">
                        {commitment.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content Section - Centered */}
                  <div className="flex flex-col gap-5 px-8 pt-8 pb-10 text-white text-center flex-1">
                    <h3 className="text-2xl font-bold leading-tight md:text-3xl text-white">
                      {commitment.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-white/90 font-medium">
                      {commitment.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

