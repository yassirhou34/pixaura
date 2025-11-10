"use client"

import { Reveal } from "@/components/reveal"

const services = [
  "Branding & Identité",
  "Photo & Video Production",
  "Gestion des réseaux sociaux",
  "Campagnes publicitaires",
  "Stratégie marketing & rédaction publicitaire",
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 px-6 bg-transparent">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <div className="flex flex-col gap-8 text-white md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm">
              Nos expertises
            </span>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Une équipe intégrée pour orchestrer l&apos;image, la production et l&apos;activation digitale de votre marque.
            </h2>
            <p className="text-base text-white/70 md:text-lg">
              Chaque offre associe direction créative, production, amplification sociale et pilotage data. Nous ajustons le rythme de tournage, les livrables et le mix paid selon vos enjeux (lancement produit, brand content régulier, activation événementielle...).
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service}
              delay={index * 120}
              className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 px-8 py-10 text-white backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-white/10"
            >
              <div className="absolute inset-0 translate-y-10 bg-gradient-to-br from-white/0 via-white/0 to-white/0 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:from-white/10 group-hover:via-white/6 group-hover:to-white/0" />
              <div className="relative flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.45em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold md:text-2xl">{service}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
