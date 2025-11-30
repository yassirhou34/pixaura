"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Palette, Car, Building2, Dumbbell, UtensilsCrossed, Briefcase, Users, ArrowRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { useTranslation } from "@/contexts/translation-context"

// Types de projets - will be translated in component
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
  const { t } = useTranslation()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  
  useEffect(() => {
    setMounted(true)
    // Scroll to top immediately without animation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  // Preload hero section images for faster homepage loading when navigating back
  useEffect(() => {
    if (typeof document === 'undefined') return

    const heroImages = [
      "/Banque d_images/Copie de M7_03225 - Copie.jpg", // Touraine Cars - Night Drive Experience
      "/Banque d_images/StageUfc.jpg", // BSD / UFC Paris
      "/Banque d_images/Copie de M7_01248.jpg", // Immobilier Signature
    ]

    const preloadLinks: HTMLLinkElement[] = []
    const preloadImages: HTMLImageElement[] = []

    // Aggressive preload for homepage hero images
    heroImages.forEach((imageSrc, index) => {
      // Method 1: Link preload with high priority for first image
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageSrc
      link.fetchPriority = index === 0 ? 'high' : 'auto'
      document.head.appendChild(link)
      preloadLinks.push(link)

      // Method 2: Image constructor for immediate browser cache
      const img = new window.Image()
      img.src = imageSrc
      img.loading = 'eager'
      preloadImages.push(img)

      // Method 3: Additional fetch for CDN optimization (especially for first image)
      if (index === 0) {
        fetch(imageSrc, { method: 'HEAD', cache: 'force-cache' }).catch(() => {
          // Silent fail - just warming up the CDN
        })
      }
    })

    return () => {
      // Cleanup preload links
      preloadLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })
    }
  }, [])
  
          // Get translated projects
          const translatedProjects = useMemo(() => {
            return projects.map((project) => ({
              ...project,
              category: project.category === "Film / Vidéo" ? t("portfolio.categoryFilmVideo") : 
                       project.category === "Photo" ? t("portfolio.categoryPhoto") : project.category,
              formats: project.formats.map((format) => 
                format === "Film / Vidéo" ? t("portfolio.categoryFilmVideo") :
                format === "Photo" ? t("portfolio.categoryPhoto") :
                format === "Social" ? t("portfolio.tagSocial") :
                format === "Event" ? t("portfolio.tagEvent") :
                format === "Branding" ? t("portfolio.tagBranding") :
                format === "Corporate" ? t("portfolio.tagCorporate") :
                format === "Design" ? t("portfolio.tagDesign") :
                format === "Podcast" ? t("portfolio.tagPodcast") : format
              ),
              sector: project.sector === "Automobile" ? t("realisationsPage.filterAutomobile") :
                     project.sector === "Immobilier" ? t("realisationsPage.filterRealEstate") :
                     project.sector === "Sport & Bien-être" ? t("realisationsPage.filterSport") :
                     project.sector === "Restauration" ? t("realisationsPage.filterRestaurant") :
                     project.sector === "Artistes & Créateurs" ? t("realisationsPage.filterArtists") : project.sector,
              objective: t(`projects.project${project.id}.objective`),
              creativeIdea: t(`projects.project${project.id}.creativeIdea`),
              device: t(`projects.project${project.id}.device`),
              results: t(`projects.project${project.id}.results`),
            }))
          }, [t])
  
  const [activeFilter, setActiveFilter] = useState<string>(t("realisationsPage.filterAll"))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof translatedProjects[0] | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const filtersRef = useRef<HTMLDivElement>(null)

  // Filter projects based on active filter (only one filter can be active at a time)
  const filteredProjects = useMemo(() => {
    if (activeFilter === t("realisationsPage.filterAll")) {
      return translatedProjects
    }
    
    // Map translated filters to translated values (since translatedProjects has translated values)
    const sectorMap: Record<string, string> = {
      [t("realisationsPage.filterAutomobile")]: t("realisationsPage.filterAutomobile"),
      [t("realisationsPage.filterRealEstate")]: t("realisationsPage.filterRealEstate"),
      [t("realisationsPage.filterSport")]: t("realisationsPage.filterSport"),
      [t("realisationsPage.filterRestaurant")]: t("realisationsPage.filterRestaurant"),
      [t("realisationsPage.filterArtists")]: t("realisationsPage.filterArtists"),
    }
    const formatMap: Record<string, string> = {
      [t("realisationsPage.filterBranding")]: t("portfolio.tagBranding"),
    }
    
    // Check if it's a format filter
    const translatedFormat = formatMap[activeFilter]
    if (translatedFormat) {
      return translatedProjects.filter((project) => project.formats.includes(translatedFormat))
    }
    
    // Otherwise it's a sector filter
    const translatedSector = sectorMap[activeFilter]
    if (translatedSector) {
      return translatedProjects.filter((project) => project.sector === translatedSector)
    }
    
    return translatedProjects
  }, [activeFilter, t, translatedProjects])

  // Calculate counts for each filter
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    
    // Count for "Tous"
    counts[t("realisationsPage.filterAll")] = translatedProjects.length
    
    // Count for format filters - use translated format since translatedProjects has translated formats
    const formatMap: Record<string, string> = {
      [t("realisationsPage.filterBranding")]: t("portfolio.tagBranding"),
    }
    Object.entries(formatMap).forEach(([translatedFilter, translatedFormat]) => {
      counts[translatedFilter] = translatedProjects.filter((p) => p.formats.includes(translatedFormat)).length
    })
    
    // Count for sector filters - use translated sectors since translatedProjects has translated sectors
    const sectorMap: Record<string, string> = {
      [t("realisationsPage.filterAutomobile")]: t("realisationsPage.filterAutomobile"),
      [t("realisationsPage.filterRealEstate")]: t("realisationsPage.filterRealEstate"),
      [t("realisationsPage.filterSport")]: t("realisationsPage.filterSport"),
      [t("realisationsPage.filterRestaurant")]: t("realisationsPage.filterRestaurant"),
      [t("realisationsPage.filterArtists")]: t("realisationsPage.filterArtists"),
    }
    Object.entries(sectorMap).forEach(([translatedFilter, translatedSector]) => {
      counts[translatedFilter] = translatedProjects.filter((p) => p.sector === translatedSector).length
    })
    
    return counts
  }, [t, translatedProjects])

  const handleProjectClick = (project: typeof translatedProjects[0]) => {
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
  const sectionRef = useRef<HTMLElement>(null)

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

      {/* Video background - hidden on mobile, visible on desktop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <video
          key="realisations-bg"
          className="hidden md:block h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ 
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
          onError={() => {
            // Silent error handling - don't break the page
            // Video will show poster or remain hidden if it fails
          }}
        >
          <source src="/Banque d_images/i3.mp4" type="video/mp4" />
        </video>
        {/* Background image - visible only on mobile */}
        <img
          src="/Banque d_images/backnoiree.png"
          alt="Background"
          className="block md:hidden h-full w-full object-cover"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      <section ref={sectionRef} className="relative pt-40 pb-20 px-6 bg-transparent overflow-visible">
        <div className="relative z-10 mx-auto max-w-6xl space-y-12">
          <div className="relative overflow-hidden px-6 py-12 text-center text-white md:px-10 md:py-16">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6">
              <span className="relative inline-flex items-center gap-3 rounded-full border border-white/30 bg-gradient-to-br from-white/15 via-white/10 to-white/5 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,115,255,0.15)]">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-cyan-400/20 opacity-50 blur-xl" />
                <span className="relative z-10">{t("realisationsPage.badge")}</span>
              </span>
              <h1 className="text-4xl font-black leading-tight md:text-5xl relative" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <span className="relative z-10">
                  {t("realisationsPage.title1")}{' '}
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-cyan-400/40 to-primary/40 blur-2xl opacity-60" />
                    <span className="relative bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                      {t("realisationsPage.title2")}
                    </span>
                  </span>
                  {' '}{t("realisationsPage.title3")}
                </span>
              </h1>
              <p className="text-sm text-white/80 md:text-base leading-relaxed max-w-2xl">
                Inspirez-vous de notre portfolio : un mix de formats premium conçus pour créer de l’impact, de l’émotion et des résultats mesurables.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.28em]">
                <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-br from-white/12 via-white/8 to-white/5 px-5 py-2.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,115,255,0.1)] transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:shadow-[0_8px_30px_rgba(0,115,255,0.2)]">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-primary/90 to-primary/70 shadow-[0_0_8px_rgba(0,115,255,0.6)]" />
                  <span className="text-white/80 group-hover:text-white transition-colors duration-300">{t("realisationsPage.filterFilmVideo")}</span>
                </div>
                <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-br from-white/12 via-white/8 to-white/5 px-5 py-2.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(52,211,153,0.1)] transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:shadow-[0_8px_30px_rgba(52,211,153,0.2)]">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400/90 to-cyan-400/70 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-white/80 group-hover:text-white transition-colors duration-300">{t("realisationsPage.filterPhoto")}</span>
                </div>
                <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-br from-white/12 via-white/8 to-white/5 px-5 py-2.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-white/90 to-white/70 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                  <span className="text-white/80 group-hover:text-white transition-colors duration-300">{t("realisationsPage.filterActivation")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Filters Section - Premium Design */}
          <div
            ref={filtersRef}
            className={`mb-12 space-y-6 transition-all duration-300 ${
              isSticky
                ? "sticky top-0 z-30 py-3"
                : ""
            }`}
          >
            {/* All Filters Combined in One Line - Ultra Premium Design */}
            {/* Mobile: horizontal scroll, Desktop: centered */}
            <div
              className="relative -mx-4 px-4 flex flex-nowrap gap-2.5 justify-start md:justify-center overflow-x-auto overflow-y-visible pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {/* Tous Button */}
                <button
                  onClick={() => setActiveFilter(t("realisationsPage.filterAll"))}
                  className={`group relative px-5 py-2.5 rounded-full font-medium text-xs transition-all duration-300 ease-out flex items-center gap-2 backdrop-blur-xl flex-shrink-0 overflow-visible cursor-pointer ${
                    activeFilter === t("realisationsPage.filterAll")
                      ? "bg-gradient-to-br from-[#0073FF] via-[#0066E6] to-[#0052CC] text-white shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/40"
                      : "bg-gradient-to-br from-white/12 via-white/8 to-white/5 text-white/75 border border-white/20 hover:bg-gradient-to-br hover:from-white/18 hover:via-white/12 hover:to-white/8 hover:text-white hover:border-white/30"
                  }`}
                  aria-label="Afficher tous les projets"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.01em',
                  }}
                >
                  
                  <span className={`relative z-10 transition-all duration-300 ${activeFilter === t("realisationsPage.filterAll") ? "text-white scale-105" : "text-white/70 group-hover:text-white group-hover:scale-110"}`} style={{ width: '14px', height: '14px' }}>
                    <Briefcase className="w-3.5 h-3.5" />
                  </span>
                  <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${activeFilter !== t("realisationsPage.filterAll") ? "group-hover:tracking-wider" : ""}`}>{t("realisationsPage.filterAll")}</span>
                  <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 min-w-[18px] flex items-center justify-center ${
                    activeFilter === t("realisationsPage.filterAll")
                      ? "bg-white/25 text-white shadow-sm"
                      : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/90 group-hover:scale-110"
                  }`}>
                    {filterCounts[t("realisationsPage.filterAll")]}
                  </span>
                </button>
                
                {/* Format Filters */}
                {[
                  { original: "Branding", translated: t("realisationsPage.filterBranding"), icon: formatIcons["Branding"] }
                ].map(({ original, translated, icon }) => {
                  const isActive = activeFilter === translated
                  const count = filterCounts[translated] || 0
                  return (
                    <button
                      key={`format-${original}`}
                      onClick={() => setActiveFilter(translated)}
                      className={`group relative px-5 py-2.5 rounded-full font-medium text-xs transition-all duration-300 ease-out flex items-center gap-2 backdrop-blur-xl flex-shrink-0 overflow-visible cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-br from-[#0073FF] via-[#0066E6] to-[#0052CC] text-white shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/40"
                          : "bg-gradient-to-br from-white/12 via-white/8 to-white/5 text-white/75 border border-white/20 hover:bg-gradient-to-br hover:from-white/18 hover:via-white/12 hover:to-white/8 hover:text-white hover:border-white/30"
                      }`}
                      aria-label={`Filtrer par ${translated}`}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        letterSpacing: '0.01em',
                      }}
                    >
                      
                      <span className={`relative z-10 transition-all duration-300 ${isActive ? "text-white scale-105" : "text-white/70 group-hover:text-white group-hover:scale-110"}`} style={{ width: '14px', height: '14px' }}>
                        {icon}
                      </span>
                      <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${!isActive ? "group-hover:tracking-wider" : ""}`}>{translated}</span>
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
                
                {/* Sector Filters */}
                {[
                  { original: "Automobile", translated: t("realisationsPage.filterAutomobile"), icon: sectorIcons["Automobile"] },
                  { original: "Immobilier", translated: t("realisationsPage.filterRealEstate"), icon: sectorIcons["Immobilier"] },
                  { original: "Sport & Bien-être", translated: t("realisationsPage.filterSport"), icon: sectorIcons["Sport & Bien-être"] },
                  { original: "Restauration", translated: t("realisationsPage.filterRestaurant"), icon: sectorIcons["Restauration"] },
                  { original: "Artistes & Créateurs", translated: t("realisationsPage.filterArtists"), icon: sectorIcons["Artistes & Créateurs"] },
                ].map(({ original, translated, icon }) => {
                  const isActive = activeFilter === translated
                  const count = filterCounts[translated] || 0
                  return (
                    <button
                      key={`sector-${original}`}
                      onClick={() => setActiveFilter(translated)}
                      className={`group relative px-5 py-2.5 rounded-full font-medium text-xs transition-all duration-300 ease-out flex items-center gap-2 backdrop-blur-xl flex-shrink-0 overflow-visible cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-br from-[#0073FF] via-[#0066E6] to-[#0052CC] text-white shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/40"
                          : "bg-gradient-to-br from-white/12 via-white/8 to-white/5 text-white/75 border border-white/20 hover:bg-gradient-to-br hover:from-white/18 hover:via-white/12 hover:to-white/8 hover:text-white hover:border-white/30"
                      }`}
                      aria-label={`Filtrer par ${translated}`}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        letterSpacing: '0.01em',
                      }}
                    >
                      
                      <span className={`relative z-10 transition-all duration-300 ${isActive ? "text-white scale-105" : "text-white/70 group-hover:text-white group-hover:scale-110"}`} style={{ width: '14px', height: '14px' }}>
                        {icon}
                      </span>
                      <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${!isActive ? "group-hover:tracking-wider" : ""}`}>{translated}</span>
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
              <p className="text-white/70 text-lg mb-4">{t("realisationsPage.noProjects")}</p>
              <button
                onClick={() => setActiveFilter(t("realisationsPage.filterAll"))}
                className="px-6 py-3 bg-[#0073FF] text-white font-semibold rounded-full hover:bg-[#1AA3FF] transition-all duration-300"
              >
                {t("realisationsPage.resetFilters")}
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/8 via-white/5 to-white/3 text-white backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-white/35 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:shadow-[0_25px_80px_rgba(0,115,255,0.25),0_0_0_1px_rgba(255,255,255,0.1)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                    <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-primary/30 via-white/15 to-cyan-400/30 blur-3xl" />
                    <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/10" />
                    <div className="absolute inset-0 rounded-[30px] border border-white/30 opacity-80" />
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-gradient-to-br from-white/20 via-white/15 to-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex flex-col gap-5 px-8 py-8 text-white">
                      <h3 className="text-xl font-bold leading-tight md:text-2xl text-white/95 group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-white/60">
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-white/70 to-white/50 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                          <span className="text-white/70">{project.category}</span>
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <span className="inline-flex items-center gap-2 text-white/80 transition-all duration-300 group-hover:text-white group-hover:gap-3">
                          {t("realisationsPage.viewProject")}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section - Ultra Premium */}
          <div className="relative mt-24 overflow-hidden px-8 py-20 text-center text-white">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8">
              {/* Premium Badge */}
              <span className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-gradient-to-br from-white/15 via-white/10 to-white/5 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,115,255,0.15)]">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-cyan-400/20 opacity-50 blur-xl" />
                <span className="relative z-10">{t("realisationsPage.ctaBadge")}</span>
              </span>
              
              {/* Enhanced Text */}
              <p className="text-xl font-bold md:text-2xl leading-relaxed text-white/95">
                {t("realisationsPage.ctaText1")}{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-cyan-400/40 to-primary/40 blur-xl opacity-50" />
                  <span className="relative bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                    {t("realisationsPage.ctaText2")}
                  </span>
                </span>
                {' '}{t("realisationsPage.ctaText3")}
              </p>
              
              {/* Premium Button */}
              <Link
                href="/#rendez-vous"
                onClick={(e) => {
                  const currentPath = window.location.pathname
                  if (currentPath !== "/") {
                    e.preventDefault()
                    
                    // Simple navigation - NO ANIMATIONS, just black overlay
                    // Mark that we're navigating from special page
                    sessionStorage.setItem('navFromSpecialPage', 'true')
                    
                    // CRITICAL: Create overlay SYNCHRONOUSLY before any navigation
                    // Remove any existing overlay first
                    const existingOverlay = document.getElementById('nav-transition-overlay')
                    if (existingOverlay) {
                      existingOverlay.remove()
                    }
                    
                    // Create overlay IMMEDIATELY - no delays
                    const overlay = document.createElement('div')
                    overlay.id = 'nav-transition-overlay'
                    overlay.style.cssText = 'position: fixed; inset: 0; background: #000; z-index: 99999; pointer-events: none; opacity: 1;'
                    // Insert at the very top of body to ensure it's above everything
                    if (document.body.firstChild) {
                      document.body.insertBefore(overlay, document.body.firstChild)
                    } else {
                      document.body.appendChild(overlay)
                    }
                    
                    // Set black background IMMEDIATELY
                    document.documentElement.style.backgroundColor = '#000000'
                    document.body.style.backgroundColor = '#000000'
                    
                    // Ensure navbar stays visible
                    const navbar = document.querySelector('nav') as HTMLElement
                    if (navbar) {
                      navbar.style.setProperty('z-index', '999999', 'important')
                      navbar.style.setProperty('position', 'fixed')
                    }
                    
                    // Prefetch BEFORE navigation
                    router.prefetch(`/?skipIntro=true#rendez-vous`)
                    
                    // Disable smooth scroll to prevent animations
                    document.documentElement.style.scrollBehavior = 'auto'
                    document.body.style.scrollBehavior = 'auto'
                    
                    // Add navigating class to html/body to keep black background
                    document.documentElement.classList.add('navigating')
                    document.body.classList.add('navigating')
                    
                    // Navigate immediately - use replace to avoid history stack
                    // No delay - navigate synchronously after overlay is created
                    router.replace(`/?skipIntro=true#rendez-vous`)
                    
                    // Keep overlay until page is fully loaded
                    const checkAndRemove = () => {
                      // Wait for both DOM and Next.js to be ready
                      if (document.readyState === 'complete') {
                        // Additional wait for Next.js hydration on Vercel
                        setTimeout(() => {
                          const el = document.getElementById('nav-transition-overlay')
                          if (el) {
                            el.remove()
                          }
                          document.documentElement.style.backgroundColor = ''
                          document.body.style.backgroundColor = ''
                          document.documentElement.style.scrollBehavior = ''
                          document.body.style.scrollBehavior = ''
                          document.documentElement.classList.remove('navigating')
                          document.body.classList.remove('navigating')
                          if (navbar) {
                            navbar.style.removeProperty('z-index')
                          }
                        }, 800) // Longer wait for Vercel
                      } else {
                        window.addEventListener('load', () => {
                          setTimeout(() => {
                            const el = document.getElementById('nav-transition-overlay')
                            if (el) {
                              el.remove()
                            }
                            document.documentElement.style.backgroundColor = ''
                            document.body.style.backgroundColor = ''
                            document.documentElement.style.scrollBehavior = ''
                            document.body.style.scrollBehavior = ''
                            document.documentElement.classList.remove('navigating')
                            document.body.classList.remove('navigating')
                            if (navbar) {
                              navbar.style.removeProperty('z-index')
                            }
                          }, 800)
                        }, { once: true })
                      }
                    }
                    
                    // Start checking immediately
                    checkAndRemove()
                    
                    // Fallback: remove after 3 seconds max (for Vercel slow loading)
                    setTimeout(() => {
                      const el = document.getElementById('nav-transition-overlay')
                      if (el) {
                        el.remove()
                      }
                      document.documentElement.style.backgroundColor = ''
                      document.body.style.backgroundColor = ''
                      document.documentElement.style.scrollBehavior = ''
                      document.body.style.scrollBehavior = ''
                      document.documentElement.classList.remove('navigating')
                      document.body.classList.remove('navigating')
                      if (navbar) {
                        navbar.style.removeProperty('z-index')
                      }
                    }, 3000)
                  }
                }}
                className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#0073FF] via-[#0066E6] to-[#0052CC] px-12 py-5 text-sm font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,115,255,0.5)] shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/20"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{t("realisationsPage.ctaButton")}</span>
                <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

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

