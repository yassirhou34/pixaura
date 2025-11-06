"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Video, Image as ImageIcon, Play, ZoomIn } from "lucide-react"

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: number
    title: string
    category: string
    sector: string
    image: string
    video?: string | null
    gallery?: string[]
    shortDescription?: string
    objective: string
    creativeIdea: string
    device: string
    results: string
  } | null
}

export function ProjectModal({ open, onOpenChange, project }: ProjectModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Calculer galleryLength de manière sécurisée pour useEffect
  const galleryLength = project ? (project.gallery || [project.image]).length : 0

  // Navigation clavier dans le lightbox - doit être avant le early return
  useEffect(() => {
    if (!lightboxOpen || galleryLength === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength)
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % galleryLength)
      } else if (e.key === "Escape") {
        setLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, galleryLength])

  // Early return après tous les hooks
  if (!project) return null

  // Calculer galleryImages après le early return (project n'est plus null)
  const galleryImages = project.gallery || [project.image]
  const currentMedia = galleryImages[currentImageIndex] || galleryImages[0]
  const isCurrentVideo = currentMedia.endsWith('.mp4') || currentMedia.endsWith('.webm') || currentMedia.endsWith('.mov')

  // Séparer les photos et vidéos
  const photos = galleryImages.filter(media => !media.endsWith('.mp4') && !media.endsWith('.webm') && !media.endsWith('.mov'))
  const videos = galleryImages.filter(media => media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.mov'))

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryLength)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength)
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto bg-black/98 backdrop-blur-3xl border border-primary/40 rounded-2xl shadow-2xl shadow-primary/20">
          {/* DialogTitle for accessibility - must be directly in DialogContent */}
          <VisuallyHidden.Root>
            <DialogTitle>
              {project.title}
            </DialogTitle>
          </VisuallyHidden.Root>
          
          <DialogHeader className="space-y-4">
            {/* Project Image */}
            <div className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden">
              <Image
                src={project.image || "/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover brightness-110 saturate-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {(() => {
                  // Détection intelligente du format principal basé sur le contenu réel
                  const hasVideo = project.gallery?.some((item: string) => item.endsWith('.mp4')) || project.video
                  const hasImage = project.gallery?.some((item: string) => item.endsWith('.jpg') || item.endsWith('.png') || item.endsWith('.jpeg')) || project.image
                  const videoCount = project.gallery?.filter((item: string) => item.endsWith('.mp4')).length || 0
                  const imageCount = project.gallery?.filter((item: string) => !item.endsWith('.mp4')).length || 0
                  
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
                    <span className="px-3 py-1.5 bg-gradient-to-r from-primary via-[#1AA3FF] to-primary text-white text-xs font-black rounded-full backdrop-blur-md shadow-lg shadow-primary/40 border border-white/20 uppercase tracking-wide">
                      {badgeText}
                    </span>
                  )
                })()}
                <span className="px-3 py-1.5 bg-gradient-to-r from-muted via-[#7C33FF] to-muted text-white text-xs font-black rounded-full backdrop-blur-md shadow-lg shadow-muted/40 border border-white/20 uppercase tracking-wide">
                  {project.sector}
                </span>
              </div>
              
              {/* Title - Visual only */}
              <div className="absolute bottom-3 left-3 right-3">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-2xl" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  textShadow: '0 0 20px rgba(0,115,255,0.6), 0 0 40px rgba(124,51,255,0.4)',
                  letterSpacing: '-0.02em',
                }}>
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-5 pt-5 px-5 pb-5">
              {/* Objectif */}
              <div className="relative space-y-3 p-6 rounded-xl bg-gradient-to-br from-black/85 via-black/70 to-black/85 border border-primary/30 hover:border-primary/50 transition-all duration-500 group shadow-lg shadow-primary/10 hover:shadow-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-cyan-400/8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Side bar - fixed inside container to prevent overflow */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-[#1AA3FF] to-cyan-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-primary/50" style={{ width: '2px' }} />
                <h3 className="relative text-xl font-black text-white flex items-center gap-3 mb-4 pl-4" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.01em',
                  textShadow: '0 0 20px rgba(0,115,255,0.3)',
                }}>
                  <span className="w-3.5 h-3.5 bg-gradient-to-br from-primary via-[#1AA3FF] to-cyan-400 rounded-full shadow-lg shadow-primary/60 animate-pulse flex-shrink-0"></span>
                  <span className="relative flex items-center gap-2.5">
                    <span className="tracking-tight">Objectif</span>
                    <div className="h-0.5 w-20 bg-gradient-to-r from-primary via-[#1AA3FF] to-cyan-400 rounded-full shadow-md shadow-primary/50"></div>
                  </span>
                </h3>
                <p className="relative text-white/95 leading-relaxed text-base font-normal pl-4" style={{ 
                  lineHeight: '1.75',
                  letterSpacing: '0.005em',
                }}>
                  {project.objective}
                </p>
              </div>

              {/* Idée créative */}
              <div className="relative space-y-3 p-6 rounded-xl bg-gradient-to-br from-black/85 via-black/70 to-black/85 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-500 group shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/8 via-transparent to-muted/8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Side bar - fixed inside container to prevent overflow */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-[#1AA3FF] to-muted rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-cyan-400/50" style={{ width: '2px' }} />
                <h3 className="relative text-xl font-black text-white flex items-center gap-3 mb-4 pl-4" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.01em',
                  textShadow: '0 0 20px rgba(0,192,255,0.3)',
                }}>
                  <span className="w-3.5 h-3.5 bg-gradient-to-br from-cyan-400 via-[#1AA3FF] to-muted rounded-full shadow-lg shadow-cyan-400/60 animate-pulse flex-shrink-0"></span>
                  <span className="relative flex items-center gap-2.5">
                    <span className="tracking-tight">Idée créative</span>
                    <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 via-[#1AA3FF] to-muted rounded-full shadow-md shadow-cyan-400/50"></div>
                  </span>
                </h3>
                <p className="relative text-white/95 leading-relaxed text-base font-normal pl-4" style={{ 
                  lineHeight: '1.75',
                  letterSpacing: '0.005em',
                }}>
                  {project.creativeIdea}
                </p>
              </div>

              {/* Dispositif */}
              <div className="relative space-y-3 p-6 rounded-xl bg-gradient-to-br from-black/85 via-black/70 to-black/85 border border-muted/30 hover:border-muted/50 transition-all duration-500 group shadow-lg shadow-muted/10 hover:shadow-muted/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-muted/8 via-transparent to-primary/8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Side bar - fixed inside container to prevent overflow */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-muted via-[#7C33FF] to-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-muted/50" style={{ width: '2px' }} />
                <h3 className="relative text-xl font-black text-white flex items-center gap-3 mb-4 pl-4" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.01em',
                  textShadow: '0 0 20px rgba(124,51,255,0.3)',
                }}>
                  <span className="w-3.5 h-3.5 bg-gradient-to-br from-muted via-[#7C33FF] to-primary rounded-full shadow-lg shadow-muted/60 animate-pulse flex-shrink-0"></span>
                  <span className="relative flex items-center gap-2.5">
                    <span className="tracking-tight">Dispositif</span>
                    <div className="h-0.5 w-20 bg-gradient-to-r from-muted via-[#7C33FF] to-primary rounded-full shadow-md shadow-muted/50"></div>
                  </span>
                </h3>
                <p className="relative text-white/95 leading-relaxed text-base font-normal pl-4" style={{ 
                  lineHeight: '1.75',
                  letterSpacing: '0.005em',
                }}>
                  {project.device}
                </p>
              </div>

              {/* Résultats */}
              <div className="relative space-y-3 p-6 rounded-xl bg-gradient-to-br from-black/85 via-black/70 to-black/85 border border-primary/30 hover:border-primary/50 transition-all duration-500 group shadow-lg shadow-primary/10 hover:shadow-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-cyan-400/8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Side bar - fixed inside container to prevent overflow */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-[#1AA3FF] to-cyan-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-primary/50" style={{ width: '2px' }} />
                <h3 className="relative text-xl font-black text-white flex items-center gap-3 mb-4 pl-4" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.01em',
                  textShadow: '0 0 20px rgba(0,115,255,0.3)',
                }}>
                  <span className="w-3.5 h-3.5 bg-gradient-to-br from-primary via-[#1AA3FF] to-cyan-400 rounded-full shadow-lg shadow-primary/60 animate-pulse flex-shrink-0"></span>
                  <span className="relative flex items-center gap-2.5">
                    <span className="tracking-tight">Résultats</span>
                    <div className="h-0.5 w-20 bg-gradient-to-r from-primary via-[#1AA3FF] to-cyan-400 rounded-full shadow-md shadow-primary/50"></div>
                  </span>
                </h3>
                <p className="relative text-white/95 leading-relaxed text-base font-normal pl-4" style={{ 
                  lineHeight: '1.75',
                  letterSpacing: '0.005em',
                }}>
                  {project.results}
                </p>
              </div>

              {/* Galerie visuelle - Design Ultra Innovant avec Séparation Radicale */}
              {galleryImages.length > 0 && (
                <div className="relative space-y-6 p-6 rounded-2xl bg-gradient-to-br from-black/90 via-black/70 to-black/90 border border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden">
                  {/* Background Animated Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse opacity-50" />
                  
                  {/* Header avec compteurs */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3 mb-6" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 30px rgba(0,115,255,0.4)',
                    }}>
                      <div className="w-4 h-4 bg-gradient-to-br from-primary via-[#1AA3FF] to-cyan-400 rounded-full shadow-lg shadow-primary/60 animate-pulse"></div>
                      <span className="relative flex items-center gap-3">
                        <span>Galerie Visuelle</span>
                        <div className="h-1 w-32 bg-gradient-to-r from-primary via-[#1AA3FF] to-cyan-400 rounded-full shadow-lg shadow-primary/50"></div>
                      </span>
                    </h3>
                  </div>

                  {/* Section VIDÉOS - Design Ultra Premium */}
                  {videos.length > 0 && (
                    <div className="relative z-10 space-y-4">
                      {/* Header Section Vidéos - Réduit de 5% */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-primary/20 via-[#1AA3FF]/15 to-primary/20 rounded-full border-2 border-primary/50 backdrop-blur-md shadow-lg shadow-primary/30 scale-[0.95]">
                          <Video className="w-5 h-5 text-primary animate-pulse" />
                          <span className="text-base font-black text-white uppercase tracking-wider" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            textShadow: '0 0 20px rgba(0,115,255,0.5)',
                          }}>
                            Vidéos
                          </span>
                          <div className="px-2.5 py-0.5 bg-primary/80 rounded-full border border-primary/50">
                            <span className="text-xs font-black text-white">{videos.length}</span>
                          </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent"></div>
                      </div>

                      {/* Grid Vidéos - Layout Asymétrique Premium */}
                      <div className={`grid gap-4 ${
                        videos.length === 1 ? 'grid-cols-1' : 
                        videos.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`}>
                        {videos.map((media, videoIndex) => {
                          const globalIndex = galleryImages.indexOf(media)
                          // Numérotation séquentielle : vidéos commencent à 1
                          const displayNumber = videoIndex + 1
                          return (
                            <div
                              key={`video-${videoIndex}`}
                              className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-primary/70 hover:border-primary shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-700 hover:scale-105 hover:-translate-y-2"
                              onClick={() => openLightbox(globalIndex)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  openLightbox(globalIndex)
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`Voir la vidéo ${videoIndex + 1}`}
                            >
                              {/* Multi-layer Glow Effects */}
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-[#1AA3FF]/30 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl animate-pulse" />
                              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-cyan-400/15 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-900 blur-3xl" />
                              
                              {/* Video Content */}
                              <div className="relative aspect-video overflow-hidden">
                                <video
                                  src={media}
                                  className="w-full h-full object-cover brightness-110 saturate-120 group-hover:brightness-130 group-hover:saturate-140 group-hover:scale-110 transition-all duration-700"
                                  muted
                                  loop
                                  playsInline
                                  autoPlay
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/20 to-transparent group-hover:from-primary/60 group-hover:via-primary/30 transition-all duration-700" />
                                
                                {/* Animated Light Rays */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                  <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-primary/40 via-transparent to-transparent blur-2xl transform -skew-x-12 animate-pulse" />
                                  <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-b from-cyan-400/35 via-transparent to-transparent blur-2xl transform skew-x-12 animate-pulse" style={{ animationDelay: '0.3s' }} />
                                </div>

                                {/* Play Icon - Ultra Premium */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="relative w-24 h-24 bg-gradient-to-br from-primary/95 via-[#1AA3FF]/95 to-primary/95 rounded-full flex items-center justify-center border-4 border-white/60 shadow-2xl shadow-primary/70 backdrop-blur-md group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                                    <Play className="w-12 h-12 text-white drop-shadow-2xl ml-2" fill="currentColor" />
                                    {/* Rotating Glow Ring */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-rotate-glow blur-xl" />
                                  </div>
                                </div>

                                {/* Badge Vidéo */}
                                <div className="absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r from-primary/95 via-[#1AA3FF]/95 to-primary/95 rounded-lg backdrop-blur-md shadow-xl shadow-primary/60 border border-primary/50">
                                  <div className="flex items-center gap-2">
                                    <Video className="w-4 h-4 text-white" />
                                    <span className="text-xs font-black text-white uppercase tracking-wider">VIDÉO</span>
                                  </div>
                                </div>

                                {/* Index Badge - Positionné en haut à droite */}
                                <div className="absolute top-3 right-3 z-20 w-8 h-8 bg-gradient-to-br from-primary/90 via-[#1AA3FF]/90 to-primary/90 rounded-full flex items-center justify-center shadow-xl shadow-primary/50 border-2 border-white/50 backdrop-blur-md">
                                  <span className="text-xs font-black text-white">{displayNumber}</span>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/50 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
                              </div>

                              {/* Animated Border Glow */}
                              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 animate-pulse" />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Séparateur Visuel entre Vidéos et Photos */}
                  {videos.length > 0 && photos.length > 0 && (
                    <div className="relative z-10 flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                    </div>
                  )}

                  {/* Section PHOTOS - Design Premium */}
                  {photos.length > 0 && (
                    <div className="relative z-10 space-y-4">
                      {/* Header Section Photos - Réduit de 5% */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full border-2 border-white/30 backdrop-blur-md shadow-lg scale-[0.95]">
                          <ImageIcon className="w-5 h-5 text-white" />
                          <span className="text-base font-black text-white uppercase tracking-wider" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                          }}>
                            Photos
                          </span>
                          <div className="px-2.5 py-0.5 bg-white/20 rounded-full border border-white/30">
                            <span className="text-xs font-black text-white">{photos.length}</span>
                          </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
                      </div>

                      {/* Grid Photos - Photos Plus Grandes et Mieux Organisées */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((media, photoIndex) => {
                          const globalIndex = galleryImages.indexOf(media)
                          // Numérotation séquentielle : photos commencent après les vidéos
                          const displayNumber = videos.length + photoIndex + 1
                          return (
                            <div
                              key={`photo-${photoIndex}`}
                              className="relative aspect-square group cursor-pointer overflow-visible rounded-xl border-2 border-white/15 hover:border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                              onClick={() => openLightbox(globalIndex)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  openLightbox(globalIndex)
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`Voir la photo ${photoIndex + 1}`}
                            >
                              {/* Image Container */}
                              <div className="relative w-full h-full overflow-hidden rounded-xl">
                                <Image
                                  src={media}
                                  alt={`${project.title} - Photo ${photoIndex + 1}`}
                                  fill
                                  className="object-cover brightness-110 saturate-110 group-hover:brightness-120 group-hover:saturate-120 group-hover:scale-110 transition-all duration-500"
                                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                  loading="lazy"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 group-hover:via-black/30 transition-all duration-500" />
                                
                                {/* Zoom Icon au Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                  <div className="w-14 h-14 bg-gradient-to-br from-white/30 via-white/20 to-white/30 rounded-full flex items-center justify-center border-2 border-white/50 shadow-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                                    <ZoomIn className="w-7 h-7 text-white drop-shadow-md" />
                                  </div>
                                </div>
                              </div>

                              {/* Badge Photo - Positionné en dehors pour ne pas cacher */}
                              <div className="absolute -top-2 -left-2 z-30 px-2.5 py-1 bg-white/25 backdrop-blur-md rounded-lg shadow-lg border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="flex items-center gap-1.5">
                                  <ImageIcon className="w-3.5 h-3.5 text-white" />
                                  <span className="text-[9px] font-black text-white uppercase tracking-wider">PHOTO</span>
                                </div>
                              </div>

                              {/* Index Badge - Positionné en haut à droite, en dehors de l'image */}
                              <div className="absolute -top-2 -right-2 z-30 w-7 h-7 bg-gradient-to-br from-primary/90 via-[#1AA3FF]/90 to-primary/90 rounded-full flex items-center justify-center shadow-xl shadow-primary/50 border-2 border-white/50 backdrop-blur-md">
                                <span className="text-[10px] font-black text-white">{displayNumber}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setLightboxOpen(false)
            }
          }}
          role="dialog"
          aria-label="Galerie visuelle"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-muted/10" />
          
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 p-3 bg-gradient-to-br from-white/20 via-white/15 to-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/15 rounded-full backdrop-blur-md transition-all duration-300 border-2 border-white/30 hover:border-white/50 shadow-2xl shadow-primary/30 hover:scale-110"
            aria-label="Fermer la galerie"
          >
            <X className="w-6 h-6 text-white drop-shadow-lg" />
          </button>

          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Previous Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
                className="absolute left-6 z-10 p-4 bg-gradient-to-br from-white/20 via-white/15 to-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/15 rounded-full backdrop-blur-md transition-all duration-300 border-2 border-white/30 hover:border-primary/50 shadow-2xl shadow-primary/30 hover:scale-110"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-7 h-7 text-white drop-shadow-lg" />
              </button>
            )}

            {/* Image or Video */}
            <div
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/30 bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              {isCurrentVideo ? (
                <video
                  src={currentMedia}
                  className="w-full h-full object-contain brightness-110 saturate-110"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={currentMedia}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain brightness-110 saturate-110"
                  sizes="90vw"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Next Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-6 z-10 p-4 bg-gradient-to-br from-white/20 via-white/15 to-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/15 rounded-full backdrop-blur-md transition-all duration-300 border-2 border-white/30 hover:border-primary/50 shadow-2xl shadow-primary/30 hover:scale-110"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-7 h-7 text-white drop-shadow-lg" />
              </button>
            )}

            {/* Image Counter */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-6 py-3 bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-md rounded-full text-white text-base font-black border-2 border-white/30 shadow-2xl shadow-primary/30">
                <span className="bg-gradient-to-r from-primary via-cyan-400 to-muted bg-clip-text text-transparent">{currentImageIndex + 1}</span>
                <span className="text-white/70 mx-2">/</span>
                <span className="text-white/90">{galleryImages.length}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
