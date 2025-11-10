"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const teamHighlights = [
  {
    title: "Direction créative",
    description: "Moodboards, identité, rédaction et concept pour chaque campagne.",
  },
  {
    title: "Production intégrée",
    description: "Films, photos, motion, podcasts — du set à la post-production.",
  },
  {
    title: "Amplification",
    description: "Social media, paid, influence, newsletters et monitoring data.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative bg-transparent py-24 px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 text-white lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
        <div className="space-y-10">
          <Reveal className="space-y-5">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm">
              L&apos;agence
            </span>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Une maison créative qui combine design, production et pilotage stratégique.
            </h2>
            <p className="text-base text-white/70 md:text-lg">
              Pixaura_IT, c’est une équipe de créateurs, producteurs et stratèges habitués aux cadences intenses et aux exigences premium. Nous imaginons des dispositifs qui marient émotions, data et résultats concrets.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <Link
              href="/agence"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/15"
            >
              Découvrir notre équipe
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="space-y-8">
          <Reveal className="rounded-[2.5rem] border border-white/12 bg-white/5 p-10 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Manifeste</p>
            <p className="mt-4 text-2xl font-semibold md:text-[28px]">
              « Nous produisons des histoires qui touchent, qui performent et qui laissent une empreinte. »
            </p>
            <p className="mt-6 text-sm text-white/70 md:text-base">
              Chaque projet est dirigé par un duo créatif + stratège, soutenu par les pôles production, motion et growth. Nous croyons aux collaborations durables, à la transparence et à l’audace.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
