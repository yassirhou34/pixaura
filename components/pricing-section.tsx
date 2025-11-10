"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const plans = [
  {
    name: "Starter",
    price: "1 499 € puis 11 × 375 €",
    description:
      "Idéal pour lancer une dynamique de contenus réguliers, calibrés pour vos réseaux prioritaires.",
    items: [
      "Production vidéo/photo mensuelle",
      "Stratégie éditoriale et calendrier",
      "Montage vertical + pack stories",
      "Reporting consolidé",
    ],
  },
  {
    name: "Croissance",
    price: "Sur devis",
    description:
      "Un accompagnement 360° pour accélérer l&apos;impact : plus de contenus, paid media et pilotage data.",
    items: [
      "2 à 3 tournages/mois + capsules studio",
      "Gestion social media & paid",
      "Activation influence & newsletters",
      "Workshop trimestriel performance",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative bg-transparent py-24 px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 text-white lg:grid lg:grid-cols-[1fr] lg:items-start lg:gap-16">
        <Reveal className="space-y-8">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm">
            Nos offres
          </span>
          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            Des packs sur 12 mois, modulables selon votre cadence de production et vos objectifs business.
          </h2>
          <p className="text-base text-white/70 md:text-lg">
            Chaque offre associe direction créative, production, amplification sociale et pilotage data. Nous ajustons le rythme de tournage, les livrables et le mix paid selon vos enjeux (lancement produit, brand content régulier, activation événementielle...).
          </p>
          <Link
            href="/offre"
            className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/15"
          >
            Télécharger la plaquette
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
