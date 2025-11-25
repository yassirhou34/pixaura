"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Music2, Youtube, Sparkles } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative bg-transparent border-t border-white/10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Premium Animated Background Effects - Mobile Only */}
      <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12 md:gap-16 text-white z-10">
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 md:grid md:grid-cols-[1.3fr_1fr] md:gap-16">
          {/* Brand Section - Premium Mobile Design */}
          <div className="space-y-6 sm:space-y-8">
            {/* Mobile: Logo first, Desktop: Tagline first */}
            <div className="relative group md:hidden">
              {/* Glow Effect Behind Logo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/Pixaura_it .png"
                alt="Pixaura International"
                width={320}
                height={96}
                className="relative h-16 sm:h-20 w-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed relative md:mt-7">
              <span className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 to-purple-500/50 opacity-0 md:opacity-100" />
              <span className="md:pl-4 block">{t("footer.tagline")}</span>
            </p>
            
            {/* Desktop: Logo second */}
            <div className="hidden md:block relative group md:-mt-30">
              {/* Glow Effect Behind Logo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/Pixaura_it .png"
                alt="Pixaura International"
                width={320}
                height={96}
                className="relative h-16 sm:h-20 w-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Premium Badge */}
            <div className="relative group inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 px-4 py-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-md overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
              }} />
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-500" />
              <Sparkles className="relative h-3 w-3 text-cyan-400 animate-pulse" />
              <span className="relative">{t("footer.production")}</span>
            </div>

            {/* Premium Social Icons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {[{
                href: "https://www.instagram.com/pixaura_it",
                icon: Instagram,
                color: "from-pink-500 to-purple-600",
              },
              {
                href: "https://www.linkedin.com/company/pixaura",
                icon: Linkedin,
                color: "from-blue-500 to-blue-700",
              },
              {
                href: "https://www.tiktok.com/@pixaura_it",
                icon: Music2,
                color: "from-black to-gray-800",
              },
              {
                href: "https://www.youtube.com/@Humind_Pixaura",
                icon: Youtube,
                color: "from-red-500 to-red-700",
              }].map(({ href, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full overflow-hidden transition-all duration-500"
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-500 backdrop-blur-sm" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <Icon className="relative h-4 w-4 sm:h-5 sm:w-5 text-white/80 group-hover:text-white transition-all duration-500 group-hover:scale-110 z-10" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Link>
              ))}
            </div>
          </div>

          {/* Ultra Premium Contact & Navigation - Mobile Only */}
          <div className="md:hidden relative">
            {/* Elegant Vertical Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />
            
            <div className="grid grid-cols-2 gap-6">
              {/* Ultra Premium Contact Section */}
              <div className="relative">
                {/* Subtle Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 rounded-lg blur opacity-0 hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative">
                  {/* Elegant Title with Underline */}
                  <div className="mb-4 pb-3 border-b border-white/10">
                    <h3 className="text-[11px] uppercase tracking-[0.4em] text-white/40 font-medium mb-1">{t("footer.contact")}</h3>
                    <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
                  </div>
                  
                  {/* Premium Contact Items */}
                  <ul className="space-y-3.5">
                    <li className="group/item">
                      <a 
                        href="mailto:contact@pixaura.eu" 
                        className="flex items-start gap-3 text-xs text-white/70 hover:text-white transition-all duration-400"
                      >
                        <div className="relative mt-0.5 flex-shrink-0">
                          <div className="absolute inset-0 bg-cyan-400/20 rounded blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-400" />
                          <Mail className="relative h-3.5 w-3.5 text-white/40 group-hover/item:text-cyan-400 transition-all duration-400" />
                        </div>
                        <span className="break-all leading-relaxed group-hover/item:translate-x-1 transition-transform duration-400">
                          contact@pixaura.eu
                        </span>
                      </a>
                    </li>
                    
                    <li className="group/item">
                      <a 
                        href="tel:+33617488801" 
                        className="flex items-start gap-3 text-xs text-white/70 hover:text-white transition-all duration-400"
                      >
                        <div className="relative mt-0.5 flex-shrink-0">
                          <div className="absolute inset-0 bg-cyan-400/20 rounded blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-400" />
                          <Phone className="relative h-3.5 w-3.5 text-white/40 group-hover/item:text-cyan-400 transition-all duration-400" />
                        </div>
                        <span className="leading-relaxed group-hover/item:translate-x-1 transition-transform duration-400">
                          +33 6 17 48 88 01
                        </span>
                      </a>
                    </li>
                    
                    <li className="flex items-start gap-3 text-xs text-white/50">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span>{t("footer.location")}</span>
                    </li>
                    
                    <li className="flex items-start gap-3 text-xs text-white/50">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span>{t("footer.hours")}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ultra Premium Navigation Section */}
              <div className="relative">
                {/* Subtle Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 rounded-lg blur opacity-0 hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative">
                  {/* Elegant Title with Underline */}
                  <div className="mb-4 pb-3 border-b border-white/10">
                    <h3 className="text-[11px] uppercase tracking-[0.4em] text-white/40 font-medium mb-1">{t("footer.navigation")}</h3>
                    <div className="h-px w-12 bg-gradient-to-r from-purple-400 to-transparent" />
                  </div>
                  
                  {/* Premium Navigation Links */}
                  <ul className="space-y-2.5">
                    {[
                      { label: t("footer.home"), href: "/" },
                      { label: t("footer.services"), href: "#services" },
                      { label: t("footer.realisations"), href: "/realisations" },
                      { label: t("footer.caseStudies"), href: "/realisations" },
                      { label: t("footer.offre"), href: "/#offre" },
                      { label: t("footer.agence"), href: "/agence" },
                      { label: t("footer.humind"), href: "/humind" },
                      { label: t("footer.contact"), href: "/contact" },
                    ].map(({ label, href }, index) => (
                      <li key={label} style={{ animationDelay: `${index * 30}ms` }}>
                        <Link 
                          href={href}
                          className="group/link relative block text-xs text-white/70 hover:text-white transition-all duration-400"
                        >
                          <div className="flex items-center gap-2">
                            {/* Elegant Dot Indicator */}
                            <div className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-cyan-400 transition-all duration-400 group-hover/link:scale-150 group-hover/link:shadow-lg group-hover/link:shadow-cyan-400/50" />
                            
                            {/* Link Text with Smooth Animation */}
                            <span className="relative flex-1 group-hover/link:translate-x-1 transition-transform duration-400">
                              {label}
                              {/* Elegant Underline */}
                              <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent group-hover/link:w-full transition-all duration-500 ease-out" />
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Contact & Navigation - Unchanged */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50 font-semibold">{t("footer.contact")}</p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="group flex items-start gap-3 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-white/60 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5" />
                  <a href="mailto:contact@pixaura.eu" className="break-all hover:text-cyan-400 transition-colors">contact@pixaura.eu</a>
                </li>
                <li className="group flex items-start gap-3 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-white/60 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5" />
                  <a href="tel:+33617488801" className="hover:text-cyan-400 transition-colors">+33 6 17 48 88 01</a>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{t("footer.location")}</span>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{t("footer.hours")}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50 font-semibold">{t("footer.navigation")}</p>
              <ul className="space-y-2.5 text-sm text-white/70">
                {[
                  { label: t("footer.home"), href: "/" },
                  { label: t("footer.services"), href: "#services" },
                  { label: t("footer.realisations"), href: "/realisations" },
                  { label: t("footer.caseStudies"), href: "/realisations" },
                  { label: t("footer.offre"), href: "/#offre" },
                  { label: t("footer.agence"), href: "/agence" },
                  { label: t("footer.humind"), href: "/humind" },
                  { label: t("footer.contact"), href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link className="group transition-all duration-300 hover:text-cyan-400 hover:translate-x-1 inline-block" href={href}>
                      <span className="relative">
                        {label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Premium Copyright Section */}
        <div className="relative border-t border-white/10 pt-6 sm:pt-8 text-center text-[10px] sm:text-xs text-white/50 md:text-sm space-y-1 sm:space-y-2">
          {/* Animated Gradient Line - Mobile Only */}
          <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          
          <p className="relative">{t("footer.copyright")}</p>
          <p className="relative">
            {t("footer.designBy")} <span className="text-white hover:text-cyan-400 transition-colors cursor-pointer relative group">
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              Pixaura_IT
            </span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
