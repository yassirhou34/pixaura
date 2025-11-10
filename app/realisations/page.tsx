"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ProjectModal } from "@/components/project-modal"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Palette, Car, Building2, Dumbbell, UtensilsCrossed, Briefcase, Users, ArrowRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { Reveal } from "@/components/reveal"

// Types de projets
const formatFilters = ["Branding"]
const sectorFilters = ["Tous", "Automobile", "Immobilier", "Sport & Bien-être", "Restauration", "Artistes & Créateurs"]

// Structure de données pour les 8 projets réels basés sur les posts Instagram
const projects = [
  {
    id: 1,
    title: "Halloween avec Touraine Cars — Shooting Éphémère",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Social"],
    sector: "Automobile",
    image: "/Banque d_images/Copie de IMG_7149.jpg",
    video: null,
    shortDescription: "Dans la nuit noire du 31 octobre, les feuilles orange d'automne tourbillonnent dans l'air froid, emportées par le vent comme des éclats de flamme.",
    gallery: [
      "/Banque d_images/Copie de M7_00259.jpg",
      "/Banque d_images/Copie de M7_00197.jpg",
      "/Banque d_images/Copie de M7_00197 - Copie.jpg",
      "/Banque d_images/halowen.mp4",
    ],
    objective: "Créer une campagne visuelle pour Halloween avec Touraine Cars, combinant ambiance automnale et message de sécurité routière pour une soirée terrifiante mais prudente.",
    creativeIdea: "Ambiance automnale, feuilles orange tourbillonnantes, atmosphère entre deux mondes : celui des vivants et celui qui s'éveille à la tombée du jour. Silhouettes masquées avançant en silence, leurs yeux brillent d'un éclat étrange, presque hypnotique. Esthétique cinématique sombre et poétique.",
    device: "Tournage éphémère sous la direction de Julien Hochet, production Pixaura International en collaboration avec Touraine Cars, photos et vidéos exclusives capturant toute l'essence de ce moment de création.",
    results: "Engagement sur les réseaux sociaux, promotion de l'événement Halloween avec message de sécurité routière, renforcement de la visibilité de Touraine Cars.",
  },
  {
    id: 2,
    title: "Mr Microbe — Projet Artistique & Thérapeutique",
    category: "Photo",
    formats: ["Photo", "Social", "Branding"],
    sector: "Artistes & Créateurs",
    image: "/Banque d_images/art1.jpg",
    video: null,
    shortDescription: "Il est né d'une solitude confinée, dans un carnet taché d'encre et d'anxiété. Chaque soir, pendant que le monde se refermait sur lui-même (Covid 2020), Maxime s'y réfugiait.",
    gallery: [
      "/Banque d_images/art2.jpg",
      "/Banque d_images/art3.jpg",
      "/Banque d_images/art5.jpg",
      "/Banque d_images/art6.jpg",
    ],
    objective: "Mettre en valeur un projet artistique thérapeutique né du confinement COVID-2020, transformation du stress et de l'anxiété en œuvre d'art, symbole d'une résistance douce.",
    creativeIdea: "Transformation de l'anxiété en art, Mr Microbe comme symbole de résistance douce. Là où d'autres voyaient la peur, Maxime voyait une forme, une matière, un visage : celui de son stress qu'il apprenait enfin à apprivoiser. Son trait devenait thérapie, son microbe miroir.",
    device: "Shooting photo créatif, mise en scène artistique pour valoriser l'univers créatif de Mr Microbe, direction artistique poussée, éclairage LED et naturel, post-production avancée Pixaura_IT.",
    results: "Visibilité du projet artistique, inspiration pour d'autres créateurs, valorisation d'une création née de la peur pour guérir de l'isolement.",
  },
  {
    id: 3,
    title: "BSK Immobilier — Interviews Conseillers Immobiliers",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Social"],
    sector: "Immobilier",
    image: "/Banque d_images/Copie de M7_00487.jpg",
    video: null,
    shortDescription: "Nous avons eu le plaisir d'interviewer plusieurs conseillers immobiliers de chez BSK Immobilier. L'objectif ? Mettre en lumière leur expertise, leur personnalité et leur vision du métier.",
    gallery: [
      "/Banque d_images/Copie de LDP_5182.jpg",
      "/Banque d_images/Copie de LDP_5161.jpg",
      "/Banque d_images/Copie de M7_00487.jpg",
      "/Banque d_images/Immobilier.mp4",
    ],
    objective: "Valoriser l'image de marque BSK Immobilier et créer du contenu authentique qui permet de se démarquer dans un secteur ultra-concurrentiel, en mettant en lumière l'humain derrière le professionnel.",
    creativeIdea: "Mise en lumière de l'humain derrière le professionnel, contenu authentique qui révèle l'expertise, la personnalité et la vision du métier de chaque conseiller immobilier. Approche storytelling humaine et professionnelle.",
    device: "Interviews filmées avec mise en valeur de l'expertise et de la personnalité des conseillers, production Pixaura_IT, workflow interne, montage et étalonnage en interne.",
    results: "Différenciation dans un secteur ultra-concurrentiel, renforcement de l'image de marque BSK Immobilier, création de contenu authentique engageant.",
  },
  {
    id: 4,
    title: "Castles Rally 2025 — Remerciements",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Photo", "Social"],
    sector: "Automobile",
    image: "/Banque d_images/Copie de DSC04796.jpg",
    video: null,
    shortDescription: "Un grand MERCI à tous nos participants, à nos partenaires et à vous, le public, venu en nombre sur les routes pour faire vibrer cette édition 2025 !",
    gallery: [
      "/Banque d_images/Copie de DSC04796.jpg",
      "/Banque d_images/Copie de DSC04758.jpg",
      "/Banque d_images/Copie de DSC04678.jpg",
      "/Banque d_images/rally1.mp4",
    ],
    objective: "Documenter et promouvoir l'événement Castles Rally 2025, remercier les participants et partenaires, capturer l'énergie et la passion de l'événement pour renforcer la communauté automobile.",
    creativeIdea: "Capturer l'énergie et la passion de l'événement, mettre en valeur les supercars, les sourires et l'enthousiasme du public. Ambiance événementielle vibrante qui reflète la magie du Castles Rally.",
    device: "Production complète événementiel avec photos et vidéos de l'événement, couverture complète du rally, production Pixaura_IT en collaboration avec les partenaires du Castles Rally 2025.",
    results: "Promotion de l'événement, engagement de la communauté automobile, renforcement de la visibilité du Castles Rally 2025.",
  },
  {
    id: 5,
    title: "Castles Rally 2025 — Première Boucle",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Photo", "Social"],
    sector: "Automobile",
    image: "/Banque d_images/Copie de M7_02930.jpg",
    video: null,
    shortDescription: "La première boucle du Castles Rally 2025 vient de s'achever… et quelle entrée en matière ! Un plateau d'exception, des paysages à couper le souffle, des routes sinueuses.",
    gallery: [
      "/Banque d_images/Copie de M7_02930.jpg",
      "/Banque d_images/Copie de M7_03008.jpg",
      "/Banque d_images/rally2.mp4",
    ],
    objective: "Documenter la première boucle du Castles Rally 2025, capturer l'énergie et l'excitation de l'événement, mettre en valeur les supercars et les paysages exceptionnels.",
    creativeIdea: "Capturer l'énergie et l'excitation de la première boucle, mettre en valeur les supercars, les paysages à couper le souffle et les routes sinueuses. Ambiance événementielle vibrante et premium.",
    device: "Production complète événementiel avec photos et vidéos de la première boucle, couverture complète du rally, production Pixaura_IT.",
    results: "Promotion de l'événement, engagement de la communauté automobile, renforcement de la visibilité du Castles Rally 2025.",
  },
  {
    id: 6,
    title: "Vouvray/Chenin — Aménagement Sur-Mesure",
    category: "Photo",
    formats: ["Photo", "Branding"],
    sector: "Restauration",
    image: "/Banque d_images/Copie de M7_09197.jpg",
    video: null,
    shortDescription: "Pour ce projet, nous nous sommes inspirés directement du cépage roi de Vouvray : le Chenin. Un vin pur, régulier, précis… des qualités que nous avons voulu traduire dans l'aménagement de ce lieu.",
    gallery: [
      "/Banque d_images/Copie de M7_09197.jpg",
      "/Banque d_images/Copie de M7_09214.jpg",
      "/Banque d_images/Copie de M7_09236.jpg",
    ],
    objective: "Créer un aménagement sur-mesure inspiré du cépage Chenin de Vouvray, traduire les qualités du vin (pur, régulier, précis) dans l'aménagement du lieu, valoriser l'histoire et l'âme du vin.",
    creativeIdea: "Inspiration directe du cépage roi de Vouvray : le Chenin. Les lames de bois, toutes de la même taille, rappellent la régularité et la rigueur du travail du viticulteur. Le thème de la barrique s'invite dans la matière et la teinte, en écho à l'élevage traditionnel. Les niches dorées soulignent la pureté et la noblesse du Chenin.",
    device: "Aménagement sur-mesure avec lames de bois, niches dorées, production Pixaura_IT en collaboration avec les artisans locaux.",
    results: "Valorisation de l'histoire et de l'âme du vin, création d'un espace unique et premium, renforcement de l'identité de marque.",
  },
  {
    id: 7,
    title: "Stradale Events/Humind — Interview Exclusive",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Social"],
    sector: "Automobile",
    image: "/Banque d_images/Copie de M7_03194.jpg",
    video: null,
    shortDescription: "Interview exclusive sur notre chaîne YouTube avec Stradale Events – l'agence événementielle automobile dédiée aux supercars.",
    gallery: [
      "/Banque d_images/Copie de M7_03194.jpg",
      "/Banque d_images/Copie de M7_03225.jpg",
      "/Banque d_images/pod1.mp4",
    ],
    objective: "Créer une interview exclusive avec Stradale Events, agence événementielle automobile dédiée aux supercars, partager leur vision et leur passion pour l'automobile d'exception.",
    creativeIdea: "Interview exclusive premium, mise en valeur de la vision et de la passion de Stradale Events pour l'automobile d'exception, production professionnelle et engageante.",
    device: "Interview filmée avec mise en valeur de l'expertise et de la passion de Stradale Events, production Pixaura_IT, workflow interne, montage et étalonnage en interne.",
    results: "Promotion de Stradale Events, engagement de la communauté automobile, renforcement de la visibilité de l'agence.",
  },
  {
    id: 8,
    title: "BSD/UFC Paris — Stage MMA",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Photo", "Social"],
    sector: "Sport & Bien-être",
    image: "/Banque d_images/StageUfc.jpg",
    video: "/Banque d_images/stageMMa.mp4",
    shortDescription: "STAGE BSD + TEAM BSD POUR L'UFC PARIS 4. Retour en images sur la journée du 15 juin avec Benoît Saint-Denis, notre God of War. Plus de 80 participants réunis au MMA FIGHT CLUB GYM.",
    gallery: [
      "/Banque d_images/stageMMa.mp4",
    ],
    objective: "Documenter le stage MMA avec Benoît Saint-Denis (God of War) et créer du contenu pour promouvoir l'événement UFC Paris, capturer l'énergie et l'exigence du stage.",
    creativeIdea: "Capturer l'énergie et l'exigence du stage, mise en valeur de Benoît Saint-Denis et de la Team BSD, ambiance sportive intense et professionnelle, valorisation du savoir, de l'énergie et de l'exigence.",
    device: "Production complète événementiel sportif avec photos et vidéos du stage, réalisation Julien Learnordie et Pixaura_IT, photos Paul Thirion, production multi-format.",
    results: "Promotion de l'événement UFC Paris, engagement de la communauté MMA, valorisation de la Team BSD et de Benoît Saint-Denis.",
  },
]

// Icons mapping
const formatIcons: Record<string, JSX.Element> = {
  "Branding": <Palette className="w-4 h-4" />,
}

const sectorIcons: Record<string, JSX.Element> = {
  "Tous": <Briefcase className="w-4 h-4" />,
  "Automobile": <Car className="w-4 h-4" />,
  "Immobilier": <Building2 className="w-4 h-4" />,
  "Sport & Bien-être": <Dumbbell className="w-4 h-4" />,
  "Restauration": <UtensilsCrossed className="w-4 h-4" />,
  "Artistes & Créateurs": <Users className="w-4 h-4" />,
}

export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState<"Tous" | string>("Tous")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const filtersRef = useRef<HTMLDivElement>(null)

  // Filter projects based on active filter (only one filter can be active at a time)
  const filteredProjects = useMemo(() => {
    if (activeFilter === "Tous") {
      return projects
    }
    
    // Check if it's a format filter
    if (formatFilters.includes(activeFilter)) {
      return projects.filter((project) => project.formats.includes(activeFilter))
    }
    
    // Otherwise it's a sector filter
    return projects.filter((project) => project.sector === activeFilter)
  }, [activeFilter])

  // Calculate counts for each filter
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    
    // Count for "Tous"
    counts["Tous"] = projects.length
    
    // Count for format filters
    formatFilters.forEach((format) => {
      counts[format] = projects.filter((p) => p.formats.includes(format)).length
    })
    
    // Count for sector filters
    sectorFilters.forEach((sector) => {
      if (sector !== "Tous") {
        counts[sector] = projects.filter((p) => p.sector === sector).length
      }
    })
    
    return counts
  }, [])

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  // Sticky filters on scroll with smooth transitions
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (filtersRef.current) {
            const rect = filtersRef.current.getBoundingClientRect()
            const shouldBeSticky = rect.top <= 10 && window.scrollY > 200
            setIsSticky(shouldBeSticky)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse position tracking for background gradient
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/Banque d_images/backv1.mp4" type="video/mp4" />
        </video>
      </div>

      <section ref={sectionRef} className="relative pt-40 pb-20 px-6 bg-transparent overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 200, 255, 0.15) 0%, rgba(124, 58, 237, 0.1) 30%, transparent 60%)`,
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl space-y-12">
          <Reveal className="relative overflow-hidden px-6 py-12 text-center text-white md:px-10 md:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-70" />
            <div className="pointer-events-none absolute -top-40 -right-32 h-72 w-72 rounded-full bg-primary/30 blur-[140px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-cyan-400/25 blur-[140px]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/8 blur-[220px]" />
            <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70 backdrop-blur-lg">
                Nos réalisations
              </span>
              <h1 className="text-4xl font-black leading-tight md:text-5xl" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Films, shootings et campagnes qui <span className="bg-gradient-to-r from-white via-primary/80 to-white bg-clip-text text-transparent">amplifient l’aura</span> des marques.
              </h1>
              <p className="text-sm text-white/70 md:text-base">
                Inspirez-vous de notre portfolio : un mix de formats premium conçus pour créer de l’impact, de l’émotion et des résultats mesurables.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.28em] text-white/50">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                  Film & Vidéo
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />
                  Photo
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                  Activation
                </div>
              </div>
            </div>
          </Reveal>

          {/* Sticky Filters Section - Premium Design */}
          <div
            ref={filtersRef}
            className={`mb-12 space-y-6 transition-all duration-300 ${
              isSticky
                ? "sticky top-0 z-30 bg-white/10 backdrop-blur-xl py-3 -mx-6 px-6 border-b border-white/10 shadow-md"
                : ""
            }`}
          >
            {/* All Filters Combined in One Line - Compact Premium Design with Exclusive Selection */}
            <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/6 px-4 py-3 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
              <div className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
              <div className="pointer-events-none absolute -right-8 top-0 h-28 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative flex flex-nowrap gap-2 justify-center overflow-x-auto pb-2 px-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                {/* Tous Button */}
                <button
                  onClick={() => setActiveFilter("Tous")}
                  className={`group relative px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 ease-out flex items-center gap-1.5 backdrop-blur-md flex-shrink-0 overflow-visible cursor-pointer ${
                    activeFilter === "Tous"
                      ? "bg-[#0073FF] text-white shadow-lg shadow-[#0073FF]/50 border border-white/30"
                      : "bg-white/10 text-white/70 border border-white/15"
                  } group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/20`}
                  aria-label="Afficher tous les projets"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.01em',
                  }}
                >
                  {/* Premium Smooth Hover Effects - Only when not active */}
                  {activeFilter !== "Tous" && (
                    <>
                      {/* Premium Glow Pulse - Subtle Outer Glow */}
                      <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                        animation: 'premium-glow 2.5s ease-in-out infinite',
                        filter: 'blur(12px)',
                      }} />
                      
                      {/* Premium Shine Effect - Smooth Sweep */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{
                          transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
                          width: '200%',
                          height: '200%',
                          animation: 'premium-shine 2s ease-in-out infinite',
                        }} />
                      </div>
                      
                      {/* Subtle Inner Glow */}
                      <div className="absolute inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        animation: 'premium-glow 3s ease-in-out infinite',
                      }} />
                      
                      {/* Minimal Floating Particles - Very Subtle */}
                      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              width: '1px',
                              height: '1px',
                              top: `${25 + (i * 20)}%`,
                              left: `${20 + (i * 25)}%`,
                              animation: `premium-particles 2.5s ease-out infinite ${i * 0.4}s`,
                              filter: 'blur(0.5px)',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <span className={`relative z-10 transition-all duration-300 ${activeFilter === "Tous" ? "text-white scale-105" : "text-white/70 group-hover:text-white group-hover:scale-110"}`} style={{ width: '14px', height: '14px' }}>
                    <Briefcase className="w-3.5 h-3.5" />
                  </span>
                  <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${activeFilter !== "Tous" ? "group-hover:tracking-wider" : ""}`}>Tous</span>
                  <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 min-w-[18px] flex items-center justify-center ${
                    activeFilter === "Tous"
                      ? "bg-white/25 text-white shadow-sm"
                      : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/90 group-hover:scale-110"
                  }`}>
                    {filterCounts["Tous"]}
                  </span>
                </button>
                
                {/* Format Filters */}
                {formatFilters.map((format) => {
                  const isActive = activeFilter === format
                  const count = filterCounts[format]
                  return (
                    <button
                      key={`format-${format}`}
                      onClick={() => setActiveFilter(format)}
                      className={`group relative px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 ease-out flex items-center gap-1.5 backdrop-blur-md flex-shrink-0 overflow-visible cursor-pointer ${
                        isActive
                          ? "bg-[#0073FF] text-white shadow-lg shadow-[#0073FF]/50 border border-white/30"
                          : "bg-white/10 text-white/70 border border-white/15"
                      } group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/20`}
                      aria-label={`Filtrer par ${format}`}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {/* Premium Smooth Hover Effects - Only when not active */}
                      {!isActive && (
                        <>
                          {/* Premium Glow Pulse - Subtle Outer Glow */}
                          <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                            animation: 'premium-glow 2.5s ease-in-out infinite',
                            filter: 'blur(12px)',
                          }} />
                          
                          {/* Premium Shine Effect - Smooth Sweep */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{
                              transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
                              width: '200%',
                              height: '200%',
                              animation: 'premium-shine 2s ease-in-out infinite',
                            }} />
                          </div>
                          
                          {/* Subtle Inner Glow */}
                          <div className="absolute inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                            animation: 'premium-glow 3s ease-in-out infinite',
                          }} />
                          
                          {/* Minimal Floating Particles - Very Subtle */}
                          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                  width: '1px',
                                  height: '1px',
                                  top: `${25 + (i * 20)}%`,
                                  left: `${20 + (i * 25)}%`,
                                  animation: `premium-particles 2.5s ease-out infinite ${i * 0.4}s`,
                                  filter: 'blur(0.5px)',
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      
                      <span className={`relative z-10 transition-all duration-300 ${isActive ? "text-white scale-105" : "text-white/70 group-hover:text-white group-hover:scale-110"}`} style={{ width: '14px', height: '14px' }}>
                        {formatIcons[format]}
                      </span>
                      <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${!isActive ? "group-hover:tracking-wider" : ""}`}>{format}</span>
                      <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 min-w-[18px] flex items-center justify-center ${
                        isActive
                          ? "bg-white/25 text-white shadow-sm"
                          : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/90 group-hover:scale-110"
                      }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
                
                {/* Sector Filters - excluding "Tous" to avoid duplication */}
                {sectorFilters.filter(sector => sector !== "Tous").map((sector) => {
                  const isActive = activeFilter === sector
                  const count = filterCounts[sector]
                  return (
                    <button
                      key={`sector-${sector}`}
                      onClick={() => setActiveFilter(sector)}
                      className={`group relative px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 ease-out flex items-center gap-1.5 backdrop-blur-md flex-shrink-0 overflow-visible cursor-pointer ${
                        isActive
                          ? "bg-[#0073FF] text-white shadow-lg shadow-[#0073FF]/50 border border-white/30"
                          : "bg-white/10 text-white/70 border border-white/15"
                      } group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/20`}
                      aria-label={`Filtrer par ${sector}`}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {/* Premium Smooth Hover Effects - Only when not active */}
                      {!isActive && (
                        <>
                          {/* Premium Glow Pulse - Subtle Outer Glow */}
                          <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                            animation: 'premium-glow 2.5s ease-in-out infinite',
                            filter: 'blur(12px)',
                          }} />
                          
                          {/* Premium Shine Effect - Smooth Sweep */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{
                              transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
                              width: '200%',
                              height: '200%',
                              animation: 'premium-shine 2s ease-in-out infinite',
                            }} />
                          </div>
                          
                          {/* Subtle Inner Glow */}
                          <div className="absolute inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                            animation: 'premium-glow 3s ease-in-out infinite',
                          }} />
                          
                          {/* Minimal Floating Particles - Very Subtle */}
                          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                  width: '1px',
                                  height: '1px',
                                  top: `${25 + (i * 20)}%`,
                                  left: `${20 + (i * 25)}%`,
                                  animation: `premium-particles 2.5s ease-out infinite ${i * 0.4}s`,
                                  filter: 'blur(0.5px)',
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      
                      <span className={`relative z-10 transition-all duration-300 ${isActive ? "text-white scale-105" : "text-white/70 group-hover:text-white group-hover:scale-110"}`} style={{ width: '14px', height: '14px' }}>
                        {sectorIcons[sector]}
                      </span>
                      <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${!isActive ? "group-hover:tracking-wider" : ""}`}>{sector}</span>
                      <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 min-w-[18px] flex items-center justify-center ${
                        isActive
                          ? "bg-white/25 text-white shadow-sm"
                          : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/90 group-hover:scale-110"
                      }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <SectionDivider label="Sélection premium" />
          {/* Portfolio Grid - Premium Cards */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg mb-4">Aucun projet ne correspond à vos filtres.</p>
              <button
                onClick={() => setActiveFilter("Tous")}
                className="px-6 py-3 bg-[#0073FF] text-white font-semibold rounded-full hover:bg-[#1AA3FF] transition-all duration-300"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <Reveal
                  key={project.id}
                  delay={index * 120}
                  className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 text-white backdrop-blur-xl transition duration-700 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:border-white/25 hover:bg-white/10 hover:shadow-[0_45px_140px_rgba(0,0,0,0.55)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-primary/20 via-white/10 to-cyan-400/20 blur-3xl animate-pulse" />
                    <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-60" />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleProjectClick(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleProjectClick(project)
                      }
                    }}
                    className="w-full text-left"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      {project.video && project.id !== 8 ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={project.image || "/placeholder.jpg"}
                          alt={project.title}
                          fill
                          className={`object-cover transition duration-700 ease-out group-hover:scale-105 ${
                            project.id === 8 ? "rotate-[-90deg]" : ""
                          }`}
                          style={project.id === 8 ? { transform: "rotate(-90deg) scale(1.3)" } : undefined}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                          loading="lazy"
                        />
                      )}
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
                        <span className="inline-flex items-center gap-2 text-white transition duration-300 group-hover:text-white/70">
                          Voir le projet
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <Reveal className="relative mt-20 overflow-hidden px-8 py-16 text-center text-white">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#0073FF]/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-cyan-400/25 blur-[140px]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/6 blur-[210px]" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70 backdrop-blur-lg">
                parlons de votre prochain succès
              </span>
              <p className="text-xl font-semibold md:text-2xl">
                Vous souhaitez un rendu <span className="bg-gradient-to-r from-white via-primary/70 to-white bg-clip-text text-transparent">aussi impactant</span> ? Transformons votre idée en performance.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#0073FF] px-10 py-4 text-sm font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:scale-105 hover:bg-[#1AA3FF] shadow-lg shadow-[#0073FF]/50"
              >
                Prendre rendez-vous
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

        </div>

        {/* Project Modal */}
        <ProjectModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          project={selectedProject}
        />
      </section>
      <Footer />
    </main>
  )
}

