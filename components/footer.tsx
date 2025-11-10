"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Music2, Youtube, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-transparent border-t border-white/10 py-20 px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 text-white">
        <div className="flex flex-col gap-12 md:grid md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div className="space-y-8">
            <Image
              src="/Pixaura_it .png"
              alt="Pixaura International"
              width={320}
              height={96}
              className="h-20 w-auto"
            />
            <p className="text-sm text-white/65">
              Une image qui vous ressemble, une stratégie qui vous élève, une aura qui vous distingue.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/50 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-cyan-400" /> Production • Stratégie • Social
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {[{
                href: "https://www.instagram.com/pixaura_it",
                icon: Instagram,
              },
              {
                href: "https://www.linkedin.com/company/pixaura",
                icon: Linkedin,
              },
              {
                href: "https://www.tiktok.com/@pixaura_it",
                icon: Music2,
              },
              {
                href: "https://www.youtube.com/@Humind_Pixaura",
                icon: Youtube,
              }].map(({ href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition duration-300 hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Contact</p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-3 hover:text-white transition">
                  <Mail className="h-4 w-4 text-white/60" />
                  <a href="mailto:contact@pixaura.eu">contact@pixaura.eu</a>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition">
                  <Phone className="h-4 w-4 text-white/60" />
                  <a href="tel:+33617488801">+33 6 17 48 88 01</a>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <MapPin className="h-4 w-4" />
                  Lyon, France
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Clock className="h-4 w-4" />
                  Lun–Ven, 9h–18h30
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Navigation</p>
              <ul className="space-y-3 text-sm text-white/70">
                <li><Link className="transition hover:text-white" href="/">Accueil</Link></li>
                <li><Link className="transition hover:text-white" href="#services">Services</Link></li>
                <li><Link className="transition hover:text-white" href="/realisations">Réalisations</Link></li>
                <li><Link className="transition hover:text-white" href="/realisations">Cas Clients</Link></li>
                <li><Link className="transition hover:text-white" href="/offre">Offre</Link></li>
                <li><Link className="transition hover:text-white" href="/agence">Agence</Link></li>
                <li><Link className="transition hover:text-white" href="#humind">Ressources</Link></li>
                <li><Link className="transition hover:text-white" href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/50 md:text-sm">
          <p>© 2025 Pixaura International — Tous droits réservés.</p>
          <p>
            Design et développement par <span className="text-white hover:text-cyan-400 transition">Pixaura_IT</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
