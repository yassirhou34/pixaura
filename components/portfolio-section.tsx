"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"

export function PortfolioSection() {
  const { t } = useTranslation()
  
  const latestProjects = [
    {
      id: 1,
      client: "Touraine Cars",
      title: t("portfolio.project1TitleAlt"), // "Expérience de Conduite Nocturne" (FR) / "Night Drive Experience" (EN)
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.tagSocial"), t("portfolio.tagEvent")],
      video: "/Banque d_images/halowen.mp4",
      poster: "/Banque d_images/Copie de IMG_7149.jpg",
    },
    {
      id: 2,
      client: "Mr Microbe",
      title: t("portfolio.project2Title"),
      category: t("portfolio.categoryPhoto"),
      tags: [t("portfolio.categoryPhoto"), t("portfolio.tagSocial"), t("portfolio.tagBranding")],
      video: null,
      poster: "/Banque d_images/art1.jpg",
    },
    {
      id: 3,
      client: "BSK Immobilier",
      title: t("portfolio.project3TitleAlt2"), // "Résidences Lumière" (FR) / "Light Residences" (EN)
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.tagSocial"), t("portfolio.tagCorporate")],
      video: "/Banque d_images/Immobilier.mp4",
      poster: "/Banque d_images/Copie de M7_00487.jpg",
    },
    {
      id: 4,
      client: "Castles Rally",
      title: t("portfolio.project4Title"),
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.categoryPhoto"), t("portfolio.tagSocial")],
      video: "/Banque d_images/rally1.mp4",
      poster: "/Banque d_images/Copie de DSC04796.jpg",
    },
    {
      id: 5,
      client: "Castles Rally",
      title: t("portfolio.project5Title"),
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.categoryPhoto"), t("portfolio.tagEvent")],
      video: "/Banque d_images/rally2.mp4",
      poster: "/Banque d_images/Copie de M7_02930.jpg",
    },
    {
      id: 6,
      client: "Vouvray/Chenin",
      title: t("portfolio.project6Title"),
      category: t("portfolio.categoryPhoto"),
      tags: [t("portfolio.categoryPhoto"), t("portfolio.tagBranding"), t("portfolio.tagDesign")],
      video: null,
      poster: "/Banque d_images/Copie de M7_09197.jpg",
    },
    {
      id: 7,
      client: "Stradale Events",
      title: t("portfolio.project7Title"),
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.tagSocial"), t("portfolio.tagPodcast")],
      video: "/Banque d_images/pod1.mp4",
      poster: "/Banque d_images/Copie de M7_03194.jpg",
    },
    {
      id: 8,
      client: "BSD / UFC Paris",
      title: t("portfolio.project8TitleAlt"), // "Stage d'Immersion MMA" (FR) / "MMA Training Immersion" (EN)
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.categoryPhoto"), t("portfolio.tagSocial")],
      video: "/Banque d_images/stageMMa.mp4",
      poster: "/Banque d_images/StageUfc.jpg",
    },
  ]
  const [activeId, setActiveId] = useState<number>(latestProjects[0]?.id ?? 0)
  const [previewTransform, setPreviewTransform] = useState("translate3d(0, 0, 0)")
  const [stageHeight, setStageHeight] = useState<number | undefined>(undefined)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const previewStageRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<Record<number, HTMLButtonElement | null>>({})

  const activeProject = latestProjects.find((project) => project.id === activeId) ?? latestProjects[0]

  const renderPreviewCard = (withRef: boolean) => (
    <div ref={withRef ? previewRef : undefined} className="latest-preview-card">
      <div className="latest-preview-media">
        {activeProject?.video ? (
          <video
            ref={videoRef}
            key={`video-${activeProject.id}`}
            poster={activeProject.poster}
            muted
            loop
            playsInline
            preload={(activeProject.id === latestProjects[0]?.id || 
                     activeProject.id === latestProjects[1]?.id || 
                     activeProject.id === latestProjects[2]?.id) ? "auto" : "none"}
            style={{
              opacity: 1,
              willChange: 'auto',
              pointerEvents: 'none'
            }}
            onError={(e) => {
              // Silent error handling for Vercel
              console.warn('Video load error:', activeProject.video)
            }}
          />
        ) : (
          <Image
            src={activeProject?.poster ?? "/placeholder.jpg"}
            alt={activeProject?.title ?? "Project preview"}
            fill
            className="object-cover"
            priority={activeProject.id === latestProjects[0]?.id || 
                     activeProject.id === latestProjects[1]?.id || 
                     activeProject.id === latestProjects[2]?.id}
          />
        )}
        <div className="latest-preview-glass" />
      </div>

      <div className="latest-preview-meta">
        <div className="latest-preview-tags">
          <span>{activeProject?.client}</span>
          <span className="divider" />
          <span>{activeProject?.category}</span>
        </div>
        <h3>{activeProject?.title}</h3>
        <Link
          href="/realisations"
          className="latest-preview-link"
        >
          {t("portfolio.exploreProject")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )

  const updatePreviewPosition = (projectId: number) => {
    if (!listRef.current || !previewRef.current || !previewStageRef.current) return
    const row = rowRefs.current[projectId]
    if (!row) return

    const listRect = listRef.current.getBoundingClientRect()
    const rowRect = row.getBoundingClientRect()
    const previewHeight = previewRef.current.getBoundingClientRect().height
    const listHeight = listRect.height

    const offsetTop = rowRect.top - listRect.top
    const target = offsetTop
    const clamped = Math.max(0, Math.min(target, listHeight - previewHeight))

    setPreviewTransform(`translate3d(0, ${clamped}px, 0)`)
    // Only sync stage height on desktop to avoid mobile gap
    if (isDesktop) {
      setStageHeight(listHeight)
    }
  }

  const isChangingRef = useRef(false)
  const videoLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const handleActivate = (projectId: number) => {
    // Prevent rapid changes that could cause blocking
    if (isChangingRef.current || projectId === activeId) return
    
    // Cancel any pending video loads
    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current)
      videoLoadTimeoutRef.current = null
    }
    
    isChangingRef.current = true
    
    // Use requestIdleCallback for non-blocking state update
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setActiveId(projectId)
        isChangingRef.current = false
      }, { timeout: 50 })
    } else {
      // Fallback for browsers without requestIdleCallback
      requestAnimationFrame(() => {
        setActiveId(projectId)
        setTimeout(() => {
          isChangingRef.current = false
        }, 50)
      })
    }
  }

  useEffect(() => {
    // Track viewport to toggle desktop-only behavior
    const mq = window.matchMedia("(min-width: 1024px)")
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const desktop = e.matches
      setIsDesktop(desktop)
      // Reset stage height when switching to mobile to remove any inline minHeight
      if (!desktop) {
        setStageHeight(undefined)
        setPreviewTransform("translate3d(0, 0, 0)")
      } else {
        // Recompute on entering desktop
        requestAnimationFrame(() => updatePreviewPosition(activeId))
      }
    }
    // Initialize
    handleChange(mq)
    // Listen for changes
    const listener = (e: MediaQueryListEvent) => handleChange(e)
    mq.addEventListener?.("change", listener)
    return () => {
      mq.removeEventListener?.("change", listener)
    }
  }, [activeId])

  useEffect(() => {
    // Defer position update to avoid blocking
    let rafId: number | null = null
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        rafId = requestAnimationFrame(() => updatePreviewPosition(activeId))
      }, { timeout: 100 })
    } else {
      rafId = requestAnimationFrame(() => updatePreviewPosition(activeId))
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [activeId])

  useEffect(() => {
    if (!listRef.current) return
    
    let timeoutId: NodeJS.Timeout
    const observer = new ResizeObserver(() => {
      // Debounce resize updates
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          updatePreviewPosition(activeId)
          if (isDesktop) {
            setStageHeight(listRef.current?.getBoundingClientRect().height)
          }
        })
      }, 50)
    })
    observer.observe(listRef.current)
    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [activeId, isDesktop])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const onResize = () => {
      // Debounce resize events
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        requestAnimationFrame(() => updatePreviewPosition(activeId))
      }, 100)
    }
    window.addEventListener("resize", onResize, { passive: true })
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", onResize)
    }
  }, [activeId])

  useEffect(() => {
    setTimeout(() => updatePreviewPosition(activeId), 120)
  }, [])

  // Ultra-simplified video loading - OPTIMIZED FOR VERCEL
  useEffect(() => {
    const video = videoRef.current
    if (!video || !activeProject?.video) {
      return
    }

    // Complete cleanup first
    video.pause()
    video.removeAttribute('src')
    video.load()
    
    let isMounted = true
    let playTimeout: NodeJS.Timeout | null = null
    let retryCount = 0
    const maxRetries = 3

    // FORCE IMMEDIATE LOAD FOR ALL FIRST 3 CARDS ON VERCEL
    const isFirstThreeCards = activeProject.id === latestProjects[0]?.id || 
                              activeProject.id === latestProjects[1]?.id || 
                              activeProject.id === latestProjects[2]?.id

    // Defer video loading to avoid blocking
    const handleCanPlay = () => {
      if (!isMounted || !video) return
      // FORCE IMMEDIATE PLAY FOR FIRST 3 CARDS ON VERCEL
      const playDelay = isFirstThreeCards ? 0 : 100
      playTimeout = setTimeout(() => {
        if (video && isMounted && video.readyState >= 2) {
          // Force play with aggressive retry for Vercel
          const forcePlay = (attempt = 0) => {
            video.play().catch(() => {
              if (attempt < 10 && video && isMounted) {
                setTimeout(() => forcePlay(attempt + 1), 100 * (attempt + 1))
              }
            })
          }
          forcePlay()
        }
      }, playDelay)
    }

    const handleLoadedMetadata = () => {
      // FORCE PLAY ON VERCEL - Start playing as soon as metadata is available
      if (!isMounted || !video) return
      if (video.readyState >= 1) {
          // Aggressive retry for Vercel, especially for first 3 cards
          const forcePlay = (attempt = 0) => {
            video.play().catch(() => {
              if (attempt < (isFirstThreeCards ? 10 : maxRetries) && video && isMounted) {
                setTimeout(() => forcePlay(attempt + 1), isFirstThreeCards ? 50 * (attempt + 1) : 500 * (attempt + 1))
              }
            })
          }
          forcePlay()
      }
    }

    const handleError = () => {
      // Retry loading on error (common on Vercel CDN)
      if (isMounted && video && retryCount < maxRetries) {
        retryCount++
        setTimeout(() => {
          if (isMounted && video) {
            video.src = activeProject.video
            video.load()
          }
        }, 1000 * retryCount)
      } else if (isMounted && video) {
        // Just pause on final error - show poster
        video.pause()
      }
    }

    const loadDelay = isFirstThreeCards ? 0 : 200 // Load first 3 cards IMMEDIATELY

    // Delay video loading to prevent blocking on hover
    videoLoadTimeoutRef.current = setTimeout(() => {
      if (!isMounted || !video) return

      // FORCE AUTO PRELOAD FOR FIRST 3 CARDS ON VERCEL
      video.src = activeProject.video
      video.preload = isFirstThreeCards ? 'auto' : 'metadata'
      
      // Simple event listeners
      video.addEventListener('canplay', handleCanPlay, { once: true, passive: true })
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true, passive: true })
      video.addEventListener('error', handleError, { once: false, passive: true })

      // FORCE IMMEDIATE LOAD FOR FIRST 3 CARDS ON VERCEL
      if (isFirstThreeCards) {
        // Load IMMEDIATELY for first 3 cards - no delays, no idle callbacks
        video.load()
        // Also try to play immediately if ready
        if (video.readyState >= 1) {
          video.play().catch(() => {
            // Will retry in handleLoadedMetadata
          })
        }
      } else if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          if (isMounted && video) {
            video.load()
          }
        }, { timeout: 200 })
      } else {
        // Fallback - use setTimeout for non-blocking
        setTimeout(() => {
          if (isMounted && video) {
            video.load()
          }
        }, 200)
      }
    }, loadDelay)

    return () => {
      isMounted = false
      if (playTimeout) clearTimeout(playTimeout)
      if (videoLoadTimeoutRef.current) {
        clearTimeout(videoLoadTimeoutRef.current)
        videoLoadTimeoutRef.current = null
      }
      if (video) {
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
    }
  }, [activeProject?.video, activeId, latestProjects])

  return (
    <section id="portfolio" className="portfolio-latest-section relative overflow-hidden px-4 pb-24 pt-24 text-white md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal className="latest-header-top">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4 flex-1 max-w-6xl">
              <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
                {t("portfolio.badge")}
              </span>
              <h2 className="latest-heading">
                {t("portfolio.title")}
                <br />
                {t("portfolio.titleLine2")}
              </h2>
              <p className="latest-subheading">
                {t("portfolio.description")}
                <br />
                <span className="latest-subheading-highlight">
                  {t("portfolio.descriptionHighlight")}
                </span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="latest-count">+{String(latestProjects.length).padStart(2, "0")} {t("portfolio.projectsCount")}</span>
            </div>
          </div>
        </Reveal>

        <div className="latest-layout">
          <div
            className="latest-preview-stage"
            ref={previewStageRef}
            // Apply minHeight only on desktop to prevent large gaps on mobile
            style={isDesktop && stageHeight ? { minHeight: stageHeight } : undefined}
          >
            <div className="latest-preview-wrapper" style={{ transform: previewTransform }}>
              <Reveal delay={100} className="latest-preview-reveal">
                {renderPreviewCard(true)}
              </Reveal>
            </div>
          </div>

          <div className="latest-content">
            <div className="latest-list" ref={listRef}>
              {latestProjects.map((project, index) => {
                const isActive = project.id === activeProject?.id
                return (
                  <Reveal key={project.id} delay={index * 90} className="w-full">
                    <button
                      type="button"
                      ref={(node) => {
                        rowRefs.current[project.id] = node
                      }}
                      onMouseEnter={() => handleActivate(project.id)}
                      onFocus={() => handleActivate(project.id)}
                      onClick={() => handleActivate(project.id)}
                      className={`latest-card ${isActive ? "is-active" : ""}`}
                      aria-pressed={isActive}
                    >
                      <div className="latest-card-left">
                        <span className="latest-client">{project.client}</span>
                        <span className="latest-title">{project.title}</span>
                      </div>
                      <div className="latest-card-right">
                        <span className="latest-category">{project.category}</span>
                        <div className="latest-tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="latest-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {!isDesktop && (
                        <div className="latest-card-thumb">
                          <div className="latest-card-thumb-media">
                            {project.video ? (
                              <video
                                src={project.video}
                                poster={project.poster}
                                muted
                                loop
                                autoPlay
                                playsInline
                                preload="auto"
                              />
                            ) : (
                              <Image
                                src={project.poster}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="latest-card-thumb-meta">
                            <div className="latest-card-thumb-tags">
                              <span>{project.client}</span>
                              <span className="divider" />
                              <span>{project.category}</span>
                            </div>
                            <div className="latest-card-thumb-title">
                              {project.title}
                            </div>
                            <Link
                              href="/realisations"
                              className="latest-card-thumb-link"
                            >
                              {t("portfolio.exploreProject")}
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </button>
                  </Reveal>
                )
              })}
            </div>
            <Reveal delay={260} className="latest-cta">
              <Link
                href="/realisations"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition duration-300 hover:border-white/40 hover:bg-white/10"
              >
                {t("portfolio.viewAll")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
