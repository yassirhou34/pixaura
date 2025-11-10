"use client"

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"

const featuredEpisode = {
  title: "Elliott Meunier — transformer le doute en moteur",
  description:
    "Un échange sans filtre autour de la créativité, de la résilience et de la place des médias dans le parcours d'un entrepreneur moderne.",
  image: "/Banque d_images/Copie de M7_03385.jpg",
  duration: "32 min",
  format: "YouTube & Podcast",
}

const episodeSnippets = [
  {
    id: 1,
    title: "Siam Lee — Construire une marque média sur TikTok",
    duration: "28 min",
  },
  {
    id: 2,
    title: "Marie Rutt — La stratégie LinkedIn qui performe",
    duration: "24 min",
  },
  {
    id: 3,
    title: "Pape Seck — L'art du storytelling pour les athlètes",
    duration: "30 min",
  },
]

export function HumindSection() {
  return (
    <section id="humind" className="relative bg-transparent py-24 px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 text-white lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <div className="space-y-10 lg:flex lg:flex-col lg:justify-between">
          <Reveal className="space-y-5">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm">
              Humind
            </span>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Humind, notre média long format qui amplifie les voix inspirantes et leurs trajectoires.
            </h2>
            <p className="text-base text-white/70 md:text-lg">
              Chaque épisode est produit comme un mini-docu : écriture éditoriale, captation multicam, versions verticales et distribution multicanale. L'objectif ? Créer des contenus sincères qui performent sur YouTube, Spotify et les réseaux sociaux.
            </p>
          </Reveal>

          <Reveal delay={120} className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Formats</p>
              <p className="mt-3 text-lg font-semibold">Interview studio, podcast audio & pastilles verticales</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Diffusion</p>
              <p className="mt-3 text-lg font-semibold">YouTube, Spotify, TikTok, Instagram & newsletters</p>
            </div>
          </Reveal>

          <Reveal delay={200} className="flex flex-wrap items-center gap-4">
            <Link
              href="/humind"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/15"
            >
              Explorer les épisodes
              <span className="text-sm">→</span>
            </Link>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              1 nouvel épisode toutes les 2 semaines
            </span>
          </Reveal>
        </div>

        <Reveal delay={240} className="flex w-full items-stretch">
          <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/5 backdrop-blur-md lg:ml-auto">
            <div className="relative h-[520px] w-full lg:h-[680px]">
              <Image
                src={featuredEpisode.image}
                alt={featuredEpisode.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
