"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ProjectModal } from "@/components/project-modal"
import { Footer } from "@/components/footer"
import { Palette, Car, Building2, Dumbbell, UtensilsCrossed, Briefcase, Users } from "lucide-react"

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
    <main className="bg-black min-h-screen">
      <section ref={sectionRef} className="relative py-20 px-6 bg-black overflow-hidden">
        {/* Section Separator - Top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Enhanced Background - Deep dark with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/50 to-black" />
        
        {/* Animated gradient overlay - Follows mouse */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 200, 255, 0.15) 0%, rgba(124, 58, 237, 0.1) 30%, transparent 60%)`,
          }}
        />
        
        {/* Enhanced digital patterns - Animated */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(0, 200, 255, 0.08) 100px),
                repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(124, 58, 237, 0.08) 100px)
              `,
              backgroundSize: '200px 200px',
              animation: 'patternMove 20s linear infinite',
            }}
          />
        </div>

        {/* Enhanced scattered light points - More dynamic */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(25)].map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const seed = i * 0.1375 // Deterministic seed based on index
              const left = ((seed * 100) % 100)
              const top = ((seed * 137.5) % 100)
              const duration = 4 + ((seed * 4) % 4)
              const delay = (seed * 3) % 3
              
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-15"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animation: `floatAdvanced ${duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Subtle light streaks - Enhanced */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Sticky Filters Section - Premium Design */}
          <div
            ref={filtersRef}
            className={`mb-12 space-y-6 transition-all duration-300 ${
              isSticky
                ? "sticky top-0 z-30 bg-black/85 backdrop-blur-sm py-3 -mx-6 px-6 border-b border-white/10 shadow-md"
                : ""
            }`}
          >
            {/* All Filters Combined in One Line - Compact Premium Design with Exclusive Selection */}
            <div className="flex flex-nowrap gap-2 justify-center overflow-x-auto pb-2 px-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-[28px] bg-black border border-white/15 hover:border-primary/70 transition-all duration-700 cursor-pointer transform hover:scale-[1.08] hover:-translate-y-[12px] hover:rotate-[0.5deg] shadow-2xl hover:shadow-[#0073FF]/40 hover:shadow-2xl"
                onClick={() => handleProjectClick(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleProjectClick(project)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Voir les détails du projet ${project.title}`}
                style={{
                  animation: `slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms forwards`,
                  opacity: 0,
                }}
              >
                {/* Ultra Premium Glow Effects - Multi-layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-muted/0 group-hover:from-primary/35 group-hover:via-primary/25 group-hover:to-muted/35 transition-all duration-700 rounded-[28px] opacity-0 group-hover:opacity-100 blur-2xl group-hover:animate-pulse-glow" />
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/0 via-cyan-400/0 to-muted/0 group-hover:from-primary/25 group-hover:via-cyan-400/18 group-hover:to-muted/25 transition-all duration-900 rounded-[28px] opacity-0 group-hover:opacity-100 blur-3xl" style={{ animation: 'pulseGlow 3s ease-in-out infinite 0.3s' }} />
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/0 via-cyan-400/0 to-muted/0 group-hover:from-primary/18 group-hover:via-cyan-400/12 group-hover:to-muted/18 transition-all duration-1000 rounded-[28px] opacity-0 group-hover:opacity-100 blur-[60px]" style={{ animation: 'pulseGlow 3s ease-in-out infinite 0.6s' }} />
                
                {/* Rotating Glow Ring */}
                <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-cyan-400/30 to-muted/30 animate-rotate-glow blur-2xl" />
                </div>
                
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-primary/50 via-cyan-400/50 to-muted/50 p-[2px] animate-gradient-shift">
                    <div className="w-full h-full rounded-[28px] bg-black" />
                  </div>
                  <div className="absolute inset-0 rounded-[28px] animate-shimmer" />
                </div>
                
                {/* Video or Image - Enhanced with Saturation */}
                <div className="relative h-80 overflow-hidden rounded-t-[28px]">
                  {project.video && project.id !== 8 ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out brightness-110 saturate-120"
                    />
                  ) : (
                    <Image
                      src={project.image || "/placeholder.jpg"}
                      alt={project.title}
                      fill
                      className={`object-cover group-hover:scale-125 transition-transform duration-1000 ease-out brightness-110 saturate-120 ${
                        project.id === 8 ? 'rotate-[-90deg]' : ''
                      }`}
                      style={project.id === 8 ? { transform: 'rotate(-90deg) scale(1.5)' } : undefined}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-700" />
                  
                  {/* Animated Light Rays */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-primary/30 via-transparent to-transparent blur-2xl transform -skew-x-12 animate-pulse" />
                    <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-b from-cyan-400/25 via-transparent to-transparent blur-2xl transform skew-x-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  {/* Animated Shimmer Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </div>
                  
                  {/* Premium Badge with Glow - Intelligent Format Detection */}
                  <div className="absolute top-5 left-5 z-10">
                    {(() => {
                      // Détection intelligente du format principal basé sur le contenu réel
                      const hasVideo = project.gallery?.some(item => item.endsWith('.mp4')) || project.video
                      const hasImage = project.gallery?.some(item => item.endsWith('.jpg') || item.endsWith('.png') || item.endsWith('.jpeg')) || project.image
                      const videoCount = project.gallery?.filter(item => item.endsWith('.mp4')).length || 0
                      const imageCount = project.gallery?.filter(item => !item.endsWith('.mp4')).length || 0
                      
                      let badgeText = project.category
                      
                      // Logique intelligente pour déterminer le badge le plus significatif
                      if (videoCount > imageCount && videoCount > 0) {
                        badgeText = "Production Vidéo"
                      } else if (imageCount > videoCount && imageCount > 0) {
                        badgeText = "Shooting Photo"
                      } else if (videoCount > 0 && imageCount > 0 && videoCount === imageCount) {
                        badgeText = "Production Multi-Média"
                      } else if (hasVideo && !hasImage) {
                        badgeText = "Production Vidéo"
                      } else if (hasImage && !hasVideo) {
                        badgeText = "Shooting Photo"
                      } else if (project.sector === "Artistes & Créateurs") {
                        badgeText = "Création Artistique"
                      } else if (project.sector === "Immobilier") {
                        badgeText = "Production Immobilière"
                      } else if (project.sector === "Automobile") {
                        badgeText = "Production Automobile"
                      } else if (project.title.toLowerCase().includes("interview")) {
                        badgeText = "Interview Vidéo"
                      } else if (project.title.toLowerCase().includes("rally")) {
                        badgeText = "Coverage Événementiel"
                      } else if (project.title.toLowerCase().includes("halloween") || project.title.toLowerCase().includes("shooting")) {
                        badgeText = "Shooting Créatif"
                      }
                      
                      return (
                        <span className="px-4 py-1.5 bg-gradient-to-r from-primary via-[#1AA3FF] to-primary text-white text-xs font-black rounded-full backdrop-blur-md shadow-lg shadow-primary/50 border border-white/30 uppercase tracking-wider">
                          {badgeText}
                        </span>
                      )
                    })()}
                  </div>

                  {/* Ultra Premium "Voir le projet" Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 transform translate-y-6 group-hover:translate-y-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleProjectClick(project)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          e.stopPropagation()
                          handleProjectClick(project)
                        }
                      }}
                      className="relative w-full px-6 py-3.5 bg-gradient-to-r from-primary/90 via-[#1AA3FF]/90 to-cyan-400/90 text-white font-bold rounded-full group/btn overflow-hidden border border-white/30 hover:border-white/50 backdrop-blur-md transition-all duration-300 ease-out"
                      style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        boxShadow: '0 4px 20px rgba(0,115,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                        transform: 'rotate(0deg)',
                      }}
                    >
                      {/* Subtle Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#1AA3FF] to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full" />
                      
                      {/* Smooth Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out rounded-full" />
                      
                      {/* Content */}
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <span className="text-xs font-bold tracking-wider transition-all duration-300 group-hover/btn:tracking-widest" style={{ 
                          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}>
                          VOIR LE PROJET
                        </span>
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center border border-white/30 transition-all duration-300 group-hover/btn:bg-white/30 group-hover/btn:border-white/50 group-hover/btn:translate-x-1">
                          <span className="text-sm font-bold transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                        </span>
                      </span>
                      
                      {/* Subtle Inner Glow */}
                      <div className="absolute inset-[1px] bg-gradient-to-t from-white/5 to-transparent rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8 bg-gradient-to-b from-transparent via-black/20 to-black/60 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,115,255,0.1),transparent_50%)]" />
                  </div>
                  
                  <h3 className="relative text-2xl font-black text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-cyan-400 group-hover:to-muted transition-all duration-700 group-hover:scale-105 transform" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '-0.02em',
                  }}>
                    <span className="relative z-10">{project.title}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-cyan-400/20 to-muted/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </h3>
                  
                  {/* Decorative Separator */}
                  <div className="relative mb-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-cyan-400 group-hover:w-24 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/50" />
                    <div className="absolute inset-0 w-12 h-0.5 bg-gradient-to-r from-primary/50 to-cyan-400/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <p className="relative text-sm text-white/80 leading-relaxed font-medium group-hover:text-white/95 transition-all duration-700 group-hover:translate-x-1" style={{ 
                    letterSpacing: '0.01em',
                    lineHeight: '1.7',
                  }}>
                    {project.shortDescription}
                  </p>
                  
                  {/* Decorative Element */}
                  <div className="mt-5 pt-5 border-t border-white/10 group-hover:border-primary/50 transition-all duration-700 relative">
                    <div className="flex items-center gap-2 text-xs text-white/60 group-hover:text-primary/80 transition-all duration-700 group-hover:scale-105">
                      <span className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/50 animate-pulse" />
                      <span className="font-semibold group-hover:font-bold transition-all duration-300">{project.sector}</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Corner Accents */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/30 via-cyan-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 blur-lg" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-muted/30 via-primary/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-12 blur-lg" />
                
                {/* Top Right Corner Light */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
                
                {/* Bottom Left Corner Light */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-muted/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" style={{ animationDelay: '0.5s' }} />
                
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 rounded-[28px] border-2 border-primary/30 animate-pulse-glow" />
                </div>
              </div>
            ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <p className="text-xl md:text-2xl text-white mb-6 font-medium">
              Vous souhaitez un rendu aussi impactant ? Parlons de votre projet.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-[#0073FF] text-white font-bold rounded-full hover:bg-[#1AA3FF] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#0073FF]/50 hover:shadow-[#0073FF]/70"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
        
        {/* Section Separator - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />

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

