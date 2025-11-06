"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Music2, Youtube, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Background Effects - Compact Premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/2 via-transparent to-purple-500/2 opacity-20" />
      
      {/* Animated Gradient Orbs - Reduced */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-400/6 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(255, 255, 255, 0.08) 100px),
          repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(255, 255, 255, 0.08) 100px)
        `,
        backgroundSize: '150px 150px',
      }} />
      
      {/* Animated Light Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content - Compact Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* 1. Logo & Slogan - Compact Premium */}
          <div className="lg:col-span-2">
            <div className="mb-3 relative group/logo">
              {/* Multi-Layer Glow Effects */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/8 via-purple-500/8 to-cyan-400/8 rounded-lg blur-xl opacity-0 group-hover/logo:opacity-40 transition-opacity duration-500" />
              
              <Image
                src="/Pixaura_it .png"
                alt="Pixaura International"
                width={160}
                height={48}
                className="relative z-10 mb-2 transition-all duration-500 group-hover/logo:scale-105 group-hover/logo:drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              />
              
              {/* Animated Sparkles */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm font-normal" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.01em',
                  lineHeight: '1.6',
                }}>
              Une image qui vous ressemble, une stratégie qui vous élève, une aura qui vous distingue.
            </p>
          </div>

          {/* 2. Contact - Compact Premium */}
          <div className="flex flex-col items-start md:items-center lg:items-start">
            <h4 className="text-white font-bold text-sm mb-3 tracking-wide relative group" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.05em',
                }}>
              <span className="relative z-10">Contact</span>
              <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-gray-300 hover:text-white group transition-all duration-300">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-cyan-400/15 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <a href="mailto:contact@pixaura.eu" className="hover:text-cyan-400 transition-all duration-300 font-medium hover:translate-x-0.5 inline-block">
                  contact@pixaura.eu
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white group transition-all duration-300">
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-cyan-400/15 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <a href="tel:+33617488801" className="hover:text-cyan-400 transition-all duration-300 font-medium hover:translate-x-0.5 inline-block">
                  +33 6 17 48 88 01
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300 group transition-all duration-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 group-hover:text-cyan-400 transition-all duration-300" />
                <span className="font-medium">Lyon, France</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 group transition-all duration-300">
                <Clock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 group-hover:text-cyan-400 transition-all duration-300" />
                <span className="text-xs font-medium">Lun–Ven, 9h–18h30</span>
              </li>
            </ul>
          </div>

          {/* 3. Navigation rapide - Compact Premium */}
          <div className="flex flex-col items-start md:items-center lg:items-start">
            <h4 className="text-white font-bold text-sm mb-3 tracking-wide relative group" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.05em',
                }}>
              <span className="relative z-10">Navigation</span>
              <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {[
                { href: "/", label: "Accueil" },
                { href: "#services", label: "Services" },
                { href: "/realisations", label: "Réalisations" },
                { href: "/realisations", label: "Cas Clients" },
                { href: "/offre", label: "Offre" },
                { href: "/agence", label: "Agence" },
                { href: "#humind", label: "Ressources" },
                { href: "/contact", label: "Contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="group/link relative hover:text-cyan-400 transition-all duration-300 font-medium hover:translate-x-1 inline-block"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover/link:w-1.5 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section - Compact Premium */}
        <div className="mb-6 flex flex-col items-center">
          <h4 className="text-white font-bold text-sm mb-3 tracking-wide relative group" style={{ 
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.05em',
              }}>
            <span className="relative z-10">Suivez-nous</span>
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
          </h4>
          <div className="flex gap-3">
            {[
              { href: "https://www.instagram.com/pixaura_it", icon: Instagram },
              { href: "https://www.linkedin.com/company/pixaura", icon: Linkedin },
              { href: "https://www.tiktok.com/@pixaura_it", icon: Music2 },
              { href: "https://www.youtube.com/@Humind_Pixaura", icon: Youtube },
            ].map((social, index) => {
              const Icon = social.icon
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-white/15 hover:border-cyan-400/70 transition-all duration-500 hover:bg-gradient-to-br hover:from-cyan-400/10 hover:via-purple-500/10 hover:to-cyan-400/10 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-0.5"
                >
                  {/* Multi-Layer Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <Icon className="w-[18px] h-[18px] text-white group-hover:text-cyan-400 transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] relative z-10" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Bottom Section - Compact Premium */}
        <div className="border-t border-gray-600/40 pt-4 relative">
          {/* Animated Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 text-[10px] md:text-xs text-gray-400">
            <p style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.02em',
                }}>
              © 2025 Pixaura International — Tous droits réservés.
            </p>
            <span className="hidden md:inline text-gray-500 text-xs">•</span>
            <p style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.02em',
                }}>
              Design et développement par <span className="text-white font-semibold hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Pixaura_IT</span>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
