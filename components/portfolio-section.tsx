"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

// Aperçu de quelques projets pour la page d'accueil
const previewProjects = [
  {
    id: 1,
    title: "Halloween avec Touraine Cars — Shooting Éphémère",
    image: "/Banque d_images/Copie de M7_01248.jpg",
    category: "Film / Vidéo",
  },
  {
    id: 2,
    title: "Mr Microbe — Projet Artistique & Thérapeutique",
    image: "/Banque d_images/art1.jpg",
    category: "Photo",
  },
  {
    id: 3,
    title: "BSD/UFC Paris — Stage MMA",
    image: "/Banque d_images/StageUfc.jpg",
    category: "Film / Vidéo",
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-24 px-6 bg-transparent">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <div className="flex flex-col gap-8 text-white md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm">
              Nos réalisations
            </span>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Des campagnes qui allient puissance visuelle, storytelling et performance.
            </h2>
            <p className="text-base text-white/70 md:text-lg">
              Un aperçu de productions récentes : mix de films, shootings et activations sociales conçus pour révéler l&apos;ADN des marques que nous accompagnons.
            </p>
          </Reveal>
          <Reveal delay={150} className="inline-flex items-center">
            <Link
              href="/realisations"
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/15"
            >
              Voir toutes les réalisations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {previewProjects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 120}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 text-white backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-white/10"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                  priority={project.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/75 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-col gap-4 px-8 py-8 text-white">
                <h3 className="text-xl font-semibold leading-tight md:text-2xl">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-white/50">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-white/50" />
                    {project.category}
                  </span>
                  <span className="h-px flex-1 bg-white/20" />
                  <Link
                    href="/realisations"
                    className="flex items-center gap-2 text-white transition duration-300 hover:text-white/70"
                  >
                    Explorer
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
