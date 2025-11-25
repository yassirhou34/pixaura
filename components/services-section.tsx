"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"

export function ServicesSection() {
  const { t } = useTranslation()
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

const offers = [
  {
      tag: t("services.brandingTag"),
      title: t("services.brandingTitle"),
      description: t("services.brandingDesc"),
    deliverables: [
        t("services.brandingDeliverable1"),
        t("services.brandingDeliverable2"),
        t("services.brandingDeliverable3"),
    ],
  },
  {
      tag: t("services.productionTag"),
      title: t("services.productionTitle"),
      description: t("services.productionDesc"),
    deliverables: [
        t("services.productionDeliverable1"),
        t("services.productionDeliverable2"),
        t("services.productionDeliverable3"),
    ],
  },
  {
      tag: t("services.socialTag"),
      title: t("services.socialTitle"),
      description: t("services.socialDesc"),
    deliverables: [
        t("services.socialDeliverable1"),
        t("services.socialDeliverable2"),
        t("services.socialDeliverable3"),
    ],
  },
  {
      tag: t("services.campaignTag"),
      title: t("services.campaignTitle"),
      description: t("services.campaignDesc"),
    deliverables: [
        t("services.campaignDeliverable1"),
        t("services.campaignDeliverable2"),
        t("services.campaignDeliverable3"),
    ],
  },
  {
      tag: t("services.strategyTag"),
      title: t("services.strategyTitle"),
      description: t("services.strategyDesc"),
    deliverables: [
        t("services.strategyDeliverable1"),
        t("services.strategyDeliverable2"),
        t("services.strategyDeliverable3"),
    ],
  },
]
  return (
    <section id="services" className="relative px-4 sm:px-6 pb-16 sm:pb-20 md:pb-28 pt-12 sm:pt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:gap-16 md:gap-20">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-white/15 bg-white/5 p-6 sm:p-8 md:p-10 lg:p-14 text-white backdrop-blur-xl">
          <div className="absolute inset-y-0 -left-20 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(0,115,255,0.35),_transparent_70%)] opacity-70 md:block" />
          
          {/* Image - Right Side */}
          <div className="absolute top-0 right-0 h-full w-full md:w-1/3 overflow-hidden rounded-r-[24px] sm:rounded-r-[32px] md:rounded-r-[40px] opacity-30 md:opacity-50">
            <Image
              src="/Banque d_images/Copie de M7_00487.jpg"
              alt="Nos expertises"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-black/40 md:from-transparent md:via-black/40 md:to-black/80" />
          </div>

          <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between z-10">
            <Reveal className="max-w-3xl space-y-4 sm:space-y-6">
              <span className="inline-flex w-fit items-center gap-2.5 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
                {t("services.badge")}
              </span>
              <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-black leading-tight">
                {t("services.title")}
              </h2>
              <p className="max-w-2xl text-sm sm:text-base text-white/90 md:text-white/80 md:text-lg leading-relaxed whitespace-pre-line text-justify">
                {t("services.description")}
              </p>
            </Reveal>
          </div>

          {/* Process & Team - Below the main card */}
          <Reveal delay={300} className="relative z-10 mt-6 sm:mt-8">
            <div className="relative rounded-xl sm:rounded-2xl border border-white/20 bg-white/8 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-2xl">
              {/* Subtle Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-xl opacity-50" />
              
              <div className="relative space-y-8">
                {/* Process - Ultra Modern Design */}
                <div className="group/process">
                  <div className="flex items-start gap-4">
                    {/* Animated Circle Indicator */}
                    <div className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '2s' }} />
                      <div className="absolute inset-0 rounded-full border border-white/40" />
                      <div className="relative h-3 w-3 rounded-full bg-white/80" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/80">{t("services.process")}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/40 via-white/25 to-transparent" />
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed group-hover/process:text-white/95 transition-colors duration-500">
                        {t("services.processDesc")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Elegant Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                {/* Team - Ultra Modern Design */}
                <div className="group/team">
                  <div className="flex items-start gap-4">
                    {/* Animated Circle Indicator */}
                    <div className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                      <div className="absolute inset-0 rounded-full border border-white/40" />
                      <div className="relative h-3 w-3 rounded-full bg-white/80" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/80">{t("services.team")}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/40 via-white/25 to-transparent" />
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed group-hover/team:text-white/95 transition-colors duration-500">
                        {t("services.teamDesc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {offers.map((offer, index) => {
            const isExpanded = expandedCards.has(index)
            const toggleExpanded = () => {
              setExpandedCards(prev => {
                const newSet = new Set(prev)
                if (newSet.has(index)) {
                  newSet.delete(index)
                } else {
                  newSet.add(index)
                }
                return newSet
              })
            }

            return (
              <Reveal
                key={offer.title}
                delay={index * 120}
                className={`group relative overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[38px] border border-white/12 bg-white/[0.06] p-6 sm:p-8 md:p-10 text-white backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] flex flex-col ${index === 4 ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''} ${isExpanded ? 'md:h-full' : 'md:h-full'}`}
              >
                <div className="pointer-events-none absolute -inset-x-16 top-[-40%] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(0,115,255,0.36)_0%,_transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[url('/Banque d_images/noise.png')] opacity-[0.12] mix-blend-screen" />

                <div className="relative flex flex-col gap-4 sm:gap-6 flex-1">
                  {/* Header - Always visible */}
                  <div className="flex items-start justify-between h-[70px] sm:h-[80px] md:h-[85px] flex-shrink-0">
                    <div className="flex flex-col gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.42em] text-white/60 sm:text-white/55">
                      <span>{offer.tag}</span>
                      <span className="h-px w-8 sm:w-9 bg-white/25 sm:bg-white/20" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black text-white/20 sm:text-white/15 md:text-5xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Expandable content on mobile, always visible on desktop */}
                  <div className={`flex flex-col gap-4 sm:gap-6 flex-1 transition-all duration-500 md:block ${isExpanded ? 'block' : 'hidden md:block'}`}>
                    <h3 className="text-xl sm:text-2xl font-semibold md:text-[30px] leading-tight flex-shrink-0">{offer.title}</h3>
                    <p className="text-sm text-white/70 md:text-base text-justify min-h-[80px] sm:min-h-[90px] md:min-h-[100px] flex-shrink-0">{offer.description}</p>

                    <div className="flex flex-col gap-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/45 flex-shrink-0">
                      {offer.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between gap-4 border-b border-white/12 pb-3 transition-colors duration-500 group-hover:border-white/25"
                        >
                          <span className="flex-1 text-left text-white/65 transition-colors duration-500 group-hover:text-white/95">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse button - Mobile only */}
                  <button
                    onClick={toggleExpanded}
                    className="md:hidden flex items-center justify-center gap-2 mt-2 py-2 text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white/90 transition-colors duration-300"
                    aria-label={isExpanded ? t("services.seeLess") : t("services.seeMore")}
                  >
                    <span>{isExpanded ? t("services.seeLess") : t("services.seeMore")}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200} className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-white/12 bg-white/[0.06] px-6 py-5 sm:px-8 sm:py-6 text-white backdrop-blur-2xl">
          <div className="flex flex-col gap-2 sm:gap-1">
            <span className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white/90 sm:text-white">{t("services.ctaTitle")}</span>
            <p className="text-xs sm:text-sm text-white/75 sm:text-white/70 leading-relaxed">
              {t("services.ctaDesc")}
            </p>
          </div>
          <LinkCTA />
        </Reveal>
      </div>
    </section>
  )
}

function LinkCTA() {
  const { t } = useTranslation()
  return (
    <a
      href="/#rendez-vous"
      className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 rounded-full border-2 sm:border border-white/30 sm:border-white/25 bg-white/15 sm:bg-white/10 px-6 py-3 sm:px-8 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white transition-all duration-500 hover:border-white hover:bg-white/20 sm:hover:bg-white/15 active:scale-95 sm:active:scale-100"
    >
      {t("services.ctaButton")}
    </a>
  )
}
