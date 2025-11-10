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

  const galleryImages = project?.gallery ?? (project?.image ? [project.image] : [])
  const galleryLength = galleryImages.length

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0)
    }
  }, [project?.id])

  useEffect(() => {
    if (!lightboxOpen || galleryLength === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        setLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, galleryLength])

  if (!project) return null

  const currentMedia = galleryImages[currentImageIndex] ?? galleryImages[0] ?? project.image ?? ""
  const isCurrentVideo = currentMedia.endsWith(".mp4") || currentMedia.endsWith(".webm") || currentMedia.endsWith(".mov")

  const photos = galleryImages.filter((media) => !media.endsWith(".mp4") && !media.endsWith(".webm") && !media.endsWith(".mov"))
  const videos = galleryImages.filter((media) => media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".mov"))

  const handleNext = () => {
    if (galleryLength === 0) return
    setCurrentImageIndex((prev) => (prev + 1) % galleryLength)
  }

  const handlePrevious = () => {
    if (galleryLength === 0) return
    setCurrentImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength)
  }

  const openLightbox = (index: number) => {
    if (galleryLength === 0) return
    const safeIndex = Math.max(0, Math.min(index, galleryLength - 1))
    setCurrentImageIndex(safeIndex)
    setLightboxOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] border border-white/15 bg-white/8 text-white backdrop-blur-2xl shadow-[0_45px_120px_rgba(0,0,0,0.35)]">
          {/* DialogTitle for accessibility - must be directly in DialogContent */}
          <VisuallyHidden.Root>
            <DialogTitle>
              {project.title}
            </DialogTitle>
          </VisuallyHidden.Root>
          
          <DialogHeader className="space-y-4">
            {/* Project Image */}
            <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-[28px]">
              <Image
                src={project.image || "/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover brightness-110 saturate-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
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
                    <span className="rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-sm">
                      {badgeText}
                    </span>
                  )
                })()}
                <span className="rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-sm">
                  {project.sector}
                </span>
              </div>
              
              {/* Title - Visual only */}
              <div className="absolute bottom-3 left-3 right-3">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-xl" style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.02em',
                }}>
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-5 pt-5 px-5 pb-5">
              {/* Objectif */}
              <div className="rounded-[24px] border border-white/15 bg-white/8 p-6 shadow-lg shadow-black/40 backdrop-blur-xl">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  Objectif
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {project.objective}
                </p>
              </div>

              {/* Idée créative */}
              <div className="rounded-[24px] border border-white/15 bg-white/8 p-6 shadow-lg shadow-black/40 backdrop-blur-xl">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  Idée créative
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {project.creativeIdea}
                </p>
              </div>

              {/* Dispositif */}
              <div className="rounded-[24px] border border-white/15 bg-white/8 p-6 shadow-lg shadow-black/40 backdrop-blur-xl">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  Dispositif
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {project.device}
                </p>
              </div>

              {/* Résultats */}
              <div className="rounded-[24px] border border-white/15 bg-white/8 p-6 shadow-lg shadow-black/40 backdrop-blur-xl">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  Résultats
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {project.results}
                </p>
              </div>

              {/* Galerie visuelle - Design Ultra Innovant avec Séparation Radicale */}
               {galleryImages.length > 0 && (
                <div className="relative space-y-6 rounded-[24px] border border-white/15 bg-white/8 p-6 shadow-lg shadow-black/35 backdrop-blur-xl">
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary/70" />
                    <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/85">
                      Galerie visuelle
                    </h3>
                    <div className="h-px flex-1 bg-white/12" />
                  </div>
 
                   {/* Section VIDÉOS - Design Ultra Premium */}
                   {videos.length > 0 && (
                     <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75 backdrop-blur-sm">
                          <Video className="h-4 w-4 text-white/80" />
                          Vidéos
                          <span className="rounded-full bg-white/18 px-2 py-0.5 text-[10px]">
                            {videos.length}
                          </span>
                        </div>
                        <div className="h-px flex-1 bg-white/12" />
                      </div>

                      <div className="grid gap-4">
                         {videos.map((media, videoIndex) => {
                           const globalIndex = galleryImages.indexOf(media)
                           const displayNumber = videoIndex + 1
                           return (
                             <div
                               key={`video-${videoIndex}`}
                               className="group relative h-48 md:h-56 overflow-hidden rounded-[22px] border border-white/18 bg-white/6 shadow-md shadow-black/30 transition hover:border-white/35 hover:bg-white/12"
                               onClick={() => openLightbox(globalIndex)}
                               onKeyDown={(e) => {
                                 if (e.key === "Enter" || e.key === " ") {
                                   e.preventDefault()
                                   openLightbox(globalIndex)
                                 }
                               }}
                               role="button"
                               tabIndex={0}
                               aria-label={`Voir la vidéo ${videoIndex + 1}`}
                             >
                               <video
                                 src={media}
                                 className="h-full w-full object-cover brightness-110 saturate-120"
                                 muted
                                 loop
                                 playsInline
                                 autoPlay
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                               <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                               <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
                                 <Video className="h-4 w-4" />
                                 Vidéo
                               </span>
                               <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/15 text-xs font-semibold text-white/90 backdrop-blur-sm">
                                 {displayNumber}
                               </span>
                               <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                 <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/35 bg-white/15 text-white backdrop-blur-sm shadow-md">
                                   <Play className="h-8 w-8" />
                                 </div>
                               </div>
                             </div>
                           )
                         })}
                       </div>
                    </div>
                  )}
 
                  {/* Section PHOTOS - Design Premium */}
                  {photos.length > 0 && (
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75 backdrop-blur-sm">
                          <ImageIcon className="h-4 w-4 text-white/80" />
                          Photos
                          <span className="rounded-full bg-white/18 px-2 py-0.5 text-[10px]">
                            {photos.length}
                          </span>
                        </div>
                        <div className="h-px flex-1 bg-white/12" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {photos.map((media, photoIndex) => {
                          const globalIndex = galleryImages.indexOf(media)
                          const displayNumber = videos.length + photoIndex + 1
                          return (
                            <div
                              key={`photo-${photoIndex}`}
                              className="group relative aspect-square overflow-hidden rounded-[18px] border border-white/18 bg-white/6 shadow-md shadow-black/30 transition hover:border-white/35 hover:bg-white/12"
                              onClick={() => openLightbox(globalIndex)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault()
                                  openLightbox(globalIndex)
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`Voir la photo ${photoIndex + 1}`}
                            >
                              <Image
                                src={media}
                                alt={`${project.title} - Photo ${photoIndex + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                loading="lazy"
                              />
                              <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/20 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                                {displayNumber}
                              </span>
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
