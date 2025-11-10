"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <div className="flex flex-col gap-10 text-left text-white">
          <div className="space-y-4">
            <Reveal>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-md">
                Production audiovisuelle premium
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.08] md:text-6xl lg:text-7xl">
                Nous sublimons les marques par l&apos;image, le sens et l&apos;accompagnement sur mesure.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="max-w-2xl text-base text-white/70 md:text-lg">
                Une agence créative française qui révèle l&apos;aura unique de chaque marque à travers la production audiovisuelle, la stratégie digitale et un accompagnement data-driven.
              </p>
            </Reveal>
          </div>

          <Reveal delay={360}>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact#rendez-vous"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-wider text-black transition duration-300 hover:scale-105 hover:bg-white/90"
                >
                  Lancer un projet
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/realisations"
                  className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition duration-300 hover:border-white/70 hover:bg-white/20"
                >
                  Voir nos réalisations
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
