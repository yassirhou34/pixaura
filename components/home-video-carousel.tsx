"use client"

import { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { Pause, Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export function HomeVideoCarousel() {
  const { t } = useTranslation()
  
  const slides = useMemo(() => [
    {
      id: 1,
      title: t("portfolio.carouselSlide1Title"),
      description: t("portfolio.carouselSlide1Description"),
      video: "/Banque d_images/Immobilier.mp4",
      poster: "/Banque d_images/Copie de DSC07052 - Copie.jpg",
      tags: [t("portfolio.carouselSlide1Tag1"), t("portfolio.carouselSlide1Tag2"), t("portfolio.carouselSlide1Tag3")],
    },
    {
      id: 2,
      title: t("portfolio.carouselSlide2Title"),
      description: t("portfolio.carouselSlide2Description"),
      video: "/Banque d_images/rally1.mp4",
      poster: "/Banque d_images/Copie de M7_01248 - Copie.jpg",
      tags: [t("portfolio.carouselSlide2Tag1"), t("portfolio.carouselSlide2Tag2"), t("portfolio.carouselSlide2Tag3")],
    },
    {
      id: 3,
      title: t("portfolio.carouselSlide3Title"),
      description: t("portfolio.carouselSlide3Description"),
      video: "/Banque d_images/halowen.mp4",
      poster: "/Banque d_images/Copie de DSC04614.jpg",
      tags: [t("portfolio.carouselSlide3Tag1"), t("portfolio.carouselSlide3Tag2"), t("portfolio.carouselSlide3Tag3")],
    },
    {
      id: 4,
      title: t("portfolio.carouselSlide4Title"),
      description: t("portfolio.carouselSlide4Description"),
      video: "/Banque d_images/rally2.mp4",
      poster: "/Banque d_images/Copie de M7_02930.jpg",
      tags: [t("portfolio.carouselSlide4Tag1"), t("portfolio.carouselSlide4Tag2"), t("portfolio.carouselSlide4Tag3")],
    },
    {
      id: 5,
      title: t("portfolio.carouselSlide5Title"),
      description: t("portfolio.carouselSlide5Description"),
      video: "/Banque d_images/pod1.mp4",
      poster: "/Banque d_images/Copie de M7_03194.jpg",
      tags: [t("portfolio.carouselSlide5Tag1"), t("portfolio.carouselSlide5Tag2"), t("portfolio.carouselSlide5Tag3")],
    },
  ], [t])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isPreTransition, setIsPreTransition] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef<number>(0)

  const currentSlide = slides[currentIndex]

  // Intersection Observer - Trigger When Section Becomes Visible
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible && !isPreTransition) {
            // Start pre-transition animation when section is visible
            setIsPreTransition(true)
            
            // After pre-transition completes, show main content
            setTimeout(() => {
              setIsPreTransition(false)
              setIsVisible(true) // Show content immediately after animation
            }, 1200) // Professional & Fast - 1.2s duration
            
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.15, // Trigger when 15% of section is visible
        rootMargin: '0px', // No margin - trigger exactly when visible
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isVisible, isPreTransition])

  // Mouse tracking - Throttled for performance
  useEffect(() => {
    let rafId: number | null = null
    let lastUpdate = 0
    const throttleMs = 100 // Update max once per 100ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < throttleMs) return
      lastUpdate = now

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, slides.length)
  }, [])

  // Lazy load videos - Only load current and next/previous
  useEffect(() => {
    const loadVideo = (index: number) => {
      const video = videoRefs.current[index]
      if (video && slides[index]?.video) {
        // Ensure src matches the slide video
        if (video.src !== window.location.origin + slides[index].video && video.src !== slides[index].video) {
          video.src = slides[index].video
        }
        video.muted = isMuted
        // CRITICAL: Use 'metadata' instead of 'auto' to prevent full video download
        video.preload = index === currentIndex ? 'metadata' : 'none'
        // Only load metadata for current video, nothing for others until needed
        if (index === currentIndex) {
          // Only load metadata, not full video
          video.load()
        }
      }
    }

    // Load current video metadata only (not full video)
    loadVideo(currentIndex)
    
    // DO NOT preload adjacent videos - wait until user actually navigates
    // This saves massive bandwidth

    // Unload distant videos to free memory
    videoRefs.current.forEach((video, index) => {
      if (video && video.src) {
        const distance = Math.min(
          Math.abs(index - currentIndex),
          Math.abs(index - currentIndex + slides.length),
          Math.abs(index - currentIndex - slides.length)
        )
        if (distance > 1) {
          video.pause()
          video.currentTime = 0
          // Don't clear src, just pause to allow quick reload
        }
      }
    })
  }, [currentIndex, isMuted])

  // Handle video playback - Optimized
  useEffect(() => {
    if (isTransitioning) return

    // Pause all videos except current
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause()
        video.currentTime = 0
      }
    })

    // Play current video with delay to prevent blocking
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo && slides[currentIndex]?.video) {
      const playVideo = async () => {
        try {
          currentVideo.muted = isMuted
          
          // Ensure src is set correctly
          if (currentVideo.src !== window.location.origin + slides[currentIndex].video && 
              currentVideo.src !== slides[currentIndex].video) {
            currentVideo.src = slides[currentIndex].video
            currentVideo.preload = 'auto'
          }
          
          // Wait for video to be ready
          if (currentVideo.readyState < 2) {
            await new Promise<void>((resolve) => {
              if (currentVideo.readyState >= 2) {
                resolve()
                return
              }
              const onCanPlay = () => {
                currentVideo.removeEventListener('canplay', onCanPlay)
                resolve()
              }
              currentVideo.addEventListener('canplay', onCanPlay, { once: true })
              currentVideo.load()
              // Timeout after 3 seconds to ensure video loads
              setTimeout(() => {
                currentVideo.removeEventListener('canplay', onCanPlay)
                resolve()
              }, 3000)
            })
          }
          
          // Use requestAnimationFrame to prevent blocking
          requestAnimationFrame(() => {
            currentVideo.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false))
          })
        } catch (error) {
          console.error('Error playing video:', error)
          setIsPlaying(false)
        }
      }
      
      // Delay to prevent blocking
      setTimeout(playVideo, 50)
    }
  }, [currentIndex, isMuted, isTransitioning])

  // Listen to video events
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex]
    if (!currentVideo) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    currentVideo.addEventListener('play', handlePlay)
    currentVideo.addEventListener('pause', handlePause)

    return () => {
      currentVideo.removeEventListener('play', handlePlay)
      currentVideo.removeEventListener('pause', handlePause)
    }
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Mobile swipe navigation - declared later after handlers are defined to avoid TDZ

  // Ultra-smooth transition - Optimized to prevent blocking
  const handleTransition = useCallback((newIndex: number, dir: 'left' | 'right') => {
    if (isTransitioning || newIndex === currentIndex) return

    setIsTransitioning(true)
    setDirection(dir)
    setNextIndex(newIndex)

    // Load and prepare next video
    const nextVideo = videoRefs.current[newIndex]
    if (nextVideo && slides[newIndex]?.video) {
      // Ensure source is set correctly
      if (nextVideo.src !== window.location.origin + slides[newIndex].video && 
          nextVideo.src !== slides[newIndex].video) {
        nextVideo.src = slides[newIndex].video
        nextVideo.preload = 'auto'
      }
      
      nextVideo.muted = isMuted
      nextVideo.currentTime = 0
      
      // Load video in idle time
      const loadAndPlay = () => {
        if (nextVideo.readyState < 2) {
          nextVideo.load()
          nextVideo.addEventListener('canplay', () => {
            requestAnimationFrame(() => {
              nextVideo.play().catch(() => {})
            })
          }, { once: true })
          // Fallback timeout to ensure video loads
          setTimeout(() => {
            if (nextVideo.readyState >= 2) {
              requestAnimationFrame(() => {
                nextVideo.play().catch(() => {})
              })
            }
          }, 3000)
        } else {
          requestAnimationFrame(() => {
            nextVideo.play().catch(() => {})
          })
        }
      }
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadAndPlay, { timeout: 500 })
      } else {
        setTimeout(loadAndPlay, 100)
      }
    }

    // Ultra-smooth transition with perfect timing
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setNextIndex(null)
      setTimeout(() => {
        setIsTransitioning(false)
        setDirection(null)
      }, 150)
    }, 800)
  }, [currentIndex, isTransitioning, isMuted])

  // Right button -> Next video (move right)
  const handleNext = useCallback(() => {
    if (isTransitioning) return
    const newIndex = (currentIndex + 1) % slides.length
    handleTransition(newIndex, 'right')
  }, [currentIndex, handleTransition, isTransitioning])

  // Left button -> Previous video (move left)
  const handlePrevious = useCallback(() => {
    if (isTransitioning) return
    const newIndex = (currentIndex - 1 + slides.length) % slides.length
    handleTransition(newIndex, 'left')
  }, [currentIndex, handleTransition, isTransitioning])

  // Mobile swipe navigation (now that handlers are defined)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchDeltaX.current = 0
    }
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartX.current == null) return
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current
    }
    const onTouchEnd = () => {
      const threshold = 40 // px
      if (Math.abs(touchDeltaX.current) > threshold) {
        if (touchDeltaX.current < 0) {
          handleNext()
        } else {
          handlePrevious()
        }
      }
      touchStartX.current = null
      touchDeltaX.current = 0
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onTouchStart as any)
      el.removeEventListener('touchmove', onTouchMove as any)
      el.removeEventListener('touchend', onTouchEnd as any)
    }
  }, [handleNext, handlePrevious])

  const togglePlay = useCallback(() => {
    const currentVideo = videoRefs.current[currentIndex]
    if (!currentVideo) return

    if (isPlaying) {
      currentVideo.pause()
      setIsPlaying(false)
    } else {
      currentVideo.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [isPlaying, currentIndex])

  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = newMutedState
      }
    })
  }, [isMuted])

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Professional Premium Pre-Transition - Elegant & Fast */}
      <div 
        className={`absolute inset-0 z-50 transition-opacity duration-300 ease-out ${
          isPreTransition 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: isPreTransition 
            ? 'radial-gradient(ellipse 120% 100% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 20%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%)'
            : 'transparent',
        }}
      >
        {/* Elegant Expanding Rings - Minimal & Professional */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
              style={{
                width: `${200 + i * 250}px`,
                height: `${200 + i * 250}px`,
                animation: isPreTransition ? `professionalExpand 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.15}s` : 'none',
                opacity: isPreTransition ? 1 : 0,
                boxShadow: `0 0 ${40 + i * 30}px rgba(255,255,255,${0.15 - i * 0.05})`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

        {/* Subtle Light Rays - Professional */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => {
            const rotation = i * 45
            const delay = i * 0.08
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-center"
                style={{
                  width: '2px',
                  height: '200%',
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  background: `linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(255,255,255,0.4) 20%, 
                    rgba(255,255,255,0.6) 30%, 
                    rgba(255,255,255,0.4) 40%, 
                    transparent 60%
                  )`,
                  animation: isPreTransition ? `professionalLightRay 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s` : 'none',
                  opacity: isPreTransition ? 1 : 0,
                  filter: 'blur(0.5px)',
                  willChange: 'transform, opacity',
                }}
              />
            )
          })}
        </div>

        {/* Minimal Center Glow - Elegant */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
            filter: 'blur(40px)',
            animation: isPreTransition ? 'professionalGlow 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
            opacity: isPreTransition ? 1 : 0,
            willChange: 'transform, opacity',
          }}
        />

        {/* Elegant Reveal - Smooth & Professional */}
        <div 
          className="absolute inset-0"
          style={{
            clipPath: isPreTransition 
              ? 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
              : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, transparent 50%, rgba(0,0,0,0.95) 100%)',
            animation: isPreTransition ? 'professionalReveal 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
            willChange: 'clip-path',
          }}
        />
      </div>

      {/* Minimal Background - Maximum Performance */}
      <div className="absolute inset-0" style={{ contain: 'strict' }}>
        {/* Background Video - Disabled to prevent blocking */}
        {/* Temporarily disabled background video for performance */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Simple Gradient Overlay - Single Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95" />
        
        {/* Minimal Static Particles - No Animation */}
        <div className="absolute inset-0" style={{ contain: 'layout style paint', pointerEvents: 'none' }}>
          {[...Array(12)].map((_, i) => {
            const size = 2 + Math.random() * 2
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `rgba(34,211,238,0.15)`,
                  boxShadow: `0 0 ${size * 2}px rgba(34,211,238,0.2)`,
                  transform: 'translateZ(0)',
                  opacity: 0.4,
                }}
              />
            )
          })}
        </div>

        {/* Static Center Light - No Animation */}
        <div 
          className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/3 via-white/2 to-purple-400/3 blur-3xl" 
          style={{ 
            transform: 'translate(-50%, -50%) translateZ(0)',
            pointerEvents: 'none',
          }} 
        />

        {/* Vignette Effect - Simple Static */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Main Container - Royal Premium Layout */}
      <div 
        ref={containerRef} 
        className={`relative z-10 flex h-full w-full items-center justify-center px-4 lg:px-6 xl:px-8 transition-opacity duration-700 ease-out ${
          isPreTransition ? 'opacity-0 pointer-events-none' : isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr_1fr] lg:gap-6 xl:gap-8 items-center relative">
          
          {/* Left Side - Royal Text Content */}
          <div 
            className={`order-2 lg:order-1 lg:pr-2 xl:pr-4 relative transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible 
                ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
                : 'opacity-0 -translate-x-20 translate-y-10 scale-95'
            }`}
            style={{
              transitionDelay: isVisible ? '200ms' : '0ms',
            }}
          >
            {/* Left Navigation Button - Royal */}
            <button
              onClick={handlePrevious}
              className={`group absolute -left-20 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800/95 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:bg-gray-700/95 hover:border-white/30 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed lg:-left-24 lg:h-20 lg:w-20 ${
                isVisible 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 -translate-x-10 scale-75'
              }`}
              style={{
                transitionDelay: isVisible ? '600ms' : '0ms',
              }}
              aria-label={t("portfolio.carouselPreviousProject")}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-cyan-300 lg:h-10 lg:w-10" />
            </button>
            
            <div
              className={`space-y-6 transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isTransitioning
                  ? 'opacity-0 translate-x-8 scale-95'
                  : 'opacity-100 translate-x-0 scale-100'
              }`}
            >
              {/* Tags - Royal Premium */}
              <div className="flex flex-wrap gap-2">
                {currentSlide.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`group/tag inline-flex items-center rounded-full border border-white/30 bg-gradient-to-br from-white/12 via-white/8 to-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.45em] text-white backdrop-blur-2xl transition-all duration-700 hover:border-cyan-300/50 hover:bg-gradient-to-br hover:from-cyan-400/20 hover:via-cyan-300/15 hover:to-cyan-400/10 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.5),0_0_60px_rgba(34,211,238,0.2)] ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-90'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${400 + index * 100}ms` : '0ms',
                      textShadow: '0 0 20px rgba(34,211,238,0.3)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title - Royal Ultra Premium */}
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-[1.1] text-white transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: isVisible ? '700ms' : '0ms',
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 60px rgba(255,255,255,0.2), 0 0 100px rgba(34,211,238,0.15), 0 6px 40px rgba(0,0,0,0.8)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 50%, rgba(34,211,238,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {currentSlide.title}
              </h2>

              {/* Description - Royal Premium */}
              <p
                className={`text-base md:text-lg lg:text-xl text-white/85 font-extralight leading-relaxed max-w-md transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible ? '1000ms' : '0ms',
                  textShadow: '0 3px 25px rgba(0,0,0,0.7), 0 0 30px rgba(34,211,238,0.1)',
                }}
              >
                {currentSlide.description}
              </p>
            </div>
          </div>

          {/* Center - Royal Video Frame - Ultra Premium */}
          <div 
            className={`relative order-1 lg:order-2 transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-20 scale-90'
            }`}
            style={{
              transitionDelay: isVisible ? '300ms' : '0ms',
            }}
          >
            {/* Royal Glow Effects - Multi-Layer Ultra */}
            <div className="absolute -inset-8 rounded-[44px] bg-gradient-to-r from-cyan-400/12 via-white/18 to-purple-400/12 opacity-80 blur-3xl animate-pulse" />
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-white/15 via-cyan-500/12 to-purple-500/12 blur-2xl" />
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-t from-white/12 via-transparent to-white/12 blur-xl" />
            <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 blur-lg opacity-70" />
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-cyan-300/15 via-transparent to-purple-300/15 blur-md" />
            
            <div 
              className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-black shadow-[0_0_150px_rgba(0,0,0,0.95),0_50px_120px_rgba(0,0,0,0.9),inset_0_0_0_2.5px_rgba(255,255,255,0.25)] transition-all duration-700"
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x - 50) * 0.02}deg) rotateX(${(mousePosition.y - 50) * -0.02}deg)`,
              }}
            >
              {/* Mobile Nav Buttons inside video */}
              <button
                onClick={handlePrevious}
                className="lg:hidden absolute left-3 top-1/2 z-30 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white active:scale-95"
                aria-label={t("portfolio.carouselPreviousVideo")}
                disabled={isTransitioning}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="lg:hidden absolute right-3 top-1/2 z-30 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white active:scale-95"
                aria-label={t("portfolio.carouselNextVideo")}
                disabled={isTransitioning}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              {/* Royal Multi-Layer Borders - Ultra */}
              <div className="absolute inset-0 rounded-3xl border-[3px] border-white/35" />
              <div className="absolute inset-[1px] rounded-3xl border-[2px] border-white/25" />
              <div className="absolute inset-[3px] rounded-3xl border-[1.5px] border-white/15" />
              <div className="absolute inset-[5px] rounded-3xl border border-white/10" />
              <div className="absolute inset-[7px] rounded-3xl border border-cyan-500/20" />
              
              {/* All Videos - Royal Ultra-Smooth Transition */}
              {slides.map((slide, index) => {
                const isActive = index === currentIndex
                const isExiting = isTransitioning && index === currentIndex && nextIndex !== null
                const isEntering = isTransitioning && nextIndex !== null && index === nextIndex
                
                let transformClass = ''
                let opacityClass = ''
                let blurClass = ''
                
                if (isActive && !isTransitioning) {
                  transformClass = 'scale-100 translate-x-0'
                  opacityClass = 'opacity-100'
                  blurClass = 'blur-0'
                } else if (isEntering && nextIndex !== null) {
                  if (direction === 'right') {
                    transformClass = 'scale-[0.88] -translate-x-12'
                  } else {
                    transformClass = 'scale-[0.88] translate-x-12'
                  }
                  opacityClass = 'opacity-100'
                  blurClass = 'blur-sm'
                } else if (isExiting) {
                  if (direction === 'right') {
                    transformClass = 'scale-[0.88] translate-x-12'
                  } else {
                    transformClass = 'scale-[0.88] -translate-x-12'
                  }
                  opacityClass = 'opacity-0'
                  blurClass = 'blur-sm'
                } else {
                  transformClass = 'scale-100 translate-x-0'
                  opacityClass = 'opacity-0'
                  blurClass = 'blur-0'
                }
                
                if (isActive && isTransitioning && nextIndex === null) {
                  transformClass = 'scale-100 translate-x-0'
                  opacityClass = 'opacity-100'
                  blurClass = 'blur-0'
                }
                
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass} ${opacityClass} ${blurClass} ${
                      isActive ? 'z-10' : 'z-0 pointer-events-none'
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el
                        }}
                        className="h-full w-full object-contain"
                        loop
                        muted={isMuted}
                        playsInline
                        preload={index === currentIndex ? 'auto' : 'none'}
                        src={slide.video || undefined}
                        poster={slide.poster || undefined}
                        style={{ 
                          transform: 'translateZ(0)',
                          willChange: index === currentIndex ? 'auto' : 'none',
                        }}
                        onLoadedData={() => {
                          // Only play if this is the current video
                          if (index === currentIndex && isPlaying) {
                            const video = videoRefs.current[index]
                            if (video) {
                              video.play().catch(() => {})
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                )
              })}

              {/* Royal Light Accents - Ultra Enhanced */}
              <div className="absolute top-0 left-0 h-64 w-64 bg-gradient-to-br from-white/20 via-cyan-400/10 to-transparent rounded-tl-3xl" />
              <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-white/20 via-purple-400/10 to-transparent rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 bg-gradient-to-tr from-cyan-400/8 to-transparent rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 h-48 w-48 bg-gradient-to-tl from-purple-400/8 to-transparent rounded-br-3xl" />
              
              {/* Royal Corner Light Beams - Ultra */}
              <div className="absolute top-0 left-0 h-48 w-48 bg-gradient-to-br from-cyan-400/25 via-cyan-300/15 to-transparent rounded-tl-3xl" />
              <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl from-purple-400/25 via-purple-300/15 to-transparent rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-tr from-cyan-400/20 via-transparent to-transparent rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 bg-gradient-to-tl from-purple-400/20 via-transparent to-transparent rounded-br-3xl" />

              {/* Royal Overlay - Enhanced */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent pointer-events-none z-20" />

              {/* Video Controls - Royal Premium */}
              <div 
                className={`absolute bottom-6 right-6 z-30 flex items-center gap-3 transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-90'
                }`}
                style={{
                  transitionDelay: isVisible ? '1400ms' : '0ms',
                }}
              >
                <button
                  onClick={togglePlay}
                  className="group/btn flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-2xl border-2 border-white/35 transition-all duration-500 hover:from-cyan-400/30 hover:via-cyan-300/20 hover:to-purple-400/30 hover:border-cyan-300/60 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.6),0_0_80px_rgba(34,211,238,0.3)]"
                  aria-label={isPlaying ? t("portfolio.carouselPause") : t("portfolio.carouselPlay")}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white transition-all duration-300 group-hover/btn:scale-125 group-hover/btn:text-cyan-300" />
                  ) : (
                    <Play className="h-6 w-6 text-white translate-x-0.5 transition-all duration-300 group-hover/btn:scale-125 group-hover/btn:text-cyan-300" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="group/btn flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-2xl border-2 border-white/35 transition-all duration-500 hover:from-cyan-400/30 hover:via-cyan-300/20 hover:to-purple-400/30 hover:border-cyan-300/60 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.6),0_0_80px_rgba(34,211,238,0.3)]"
                  aria-label={isMuted ? t("portfolio.carouselUnmute") : t("portfolio.carouselMute")}
                >
                  {isMuted ? (
                    <VolumeX className="h-6 w-6 text-white transition-all duration-300 group-hover/btn:scale-125 group-hover/btn:text-cyan-300" />
                  ) : (
                    <Volume2 className="h-6 w-6 text-white transition-all duration-300 group-hover/btn:scale-125 group-hover/btn:text-cyan-300" />
                  )}
                </button>
              </div>

              {/* Slide Counter - Royal Premium */}
              <div 
                className={`absolute top-6 right-6 z-30 flex items-center gap-2 rounded-full bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-2xl border-2 border-white/30 px-5 py-2.5 shadow-[0_0_30px_rgba(0,0,0,0.6),0_0_60px_rgba(34,211,238,0.2)] transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 -translate-y-10 scale-90'
                }`}
                style={{
                  transitionDelay: isVisible ? '1200ms' : '0ms',
                }}
              >
                <span className="text-sm font-light text-white" style={{ textShadow: '0 0 15px rgba(34,211,238,0.4)' }}>
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/50">/</span>
                <span className="text-sm font-light text-white/70" style={{ textShadow: '0 0 10px rgba(34,211,238,0.2)' }}>
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>

              {/* Royal Corner Accents - Ultra */}
              <div className="absolute top-0 left-0 h-40 w-40 border-t-[5px] border-l-[5px] border-gradient-to-br from-white/30 via-cyan-400/20 to-transparent rounded-tl-3xl" style={{ borderImage: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(34,211,238,0.2)) 1' }} />
              <div className="absolute top-0 right-0 h-40 w-40 border-t-[5px] border-r-[5px] border-white/30 rounded-tr-3xl" style={{ borderImage: 'linear-gradient(225deg, rgba(255,255,255,0.3), rgba(168,85,247,0.2)) 1' }} />
              <div className="absolute bottom-0 left-0 h-40 w-40 border-b-[5px] border-l-[5px] border-white/30 rounded-bl-3xl" style={{ borderImage: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(34,211,238,0.2)) 1' }} />
              <div className="absolute bottom-0 right-0 h-40 w-40 border-b-[5px] border-r-[5px] border-white/30 rounded-br-3xl" style={{ borderImage: 'linear-gradient(315deg, rgba(255,255,255,0.3), rgba(168,85,247,0.2)) 1' }} />
              
              {/* Royal Inner Glow Rings - Ultra */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-white/15 ring-inset" />
              <div className="absolute inset-[1px] rounded-3xl ring-1 ring-white/10 ring-inset" />
              <div className="absolute inset-[2px] rounded-3xl ring-1 ring-cyan-400/12 ring-inset" />
              <div className="absolute inset-[3px] rounded-3xl ring-1 ring-purple-400/10 ring-inset" />
              <div className="absolute inset-[4px] rounded-3xl ring-1 ring-cyan-300/8 ring-inset" />
            </div>
          </div>

          {/* Right Side - Royal Additional Info */}
          <div 
            className={`order-3 hidden lg:block lg:pl-2 xl:pl-4 relative transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible 
                ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
                : 'opacity-0 translate-x-20 translate-y-10 scale-95'
            }`}
            style={{
              transitionDelay: isVisible ? '400ms' : '0ms',
            }}
          >
            <div
              className={`space-y-6 transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isTransitioning
                  ? 'opacity-0 -translate-x-8 scale-95'
                  : 'opacity-100 translate-x-0 scale-100'
              }`}
            >
              {/* Project Number - Royal */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.45em] text-white/50 transition-all duration-500">
                  {t("portfolio.carouselProject")}
                </span>
                <div 
                  className="text-4xl font-extralight text-white transition-all duration-500"
                  style={{ 
                    textShadow: '0 0 30px rgba(34,211,238,0.3), 0 0 60px rgba(34,211,238,0.15)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(34,211,238,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {String(currentIndex + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Divider - Royal */}
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              {/* Total Projects - Royal */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.45em] text-white/50 transition-all duration-500">
                  {t("portfolio.carouselTotal")}
                </span>
                <div 
                  className="text-4xl font-extralight text-white/70 transition-all duration-500"
                  style={{ 
                    textShadow: '0 0 20px rgba(34,211,238,0.2), 0 0 40px rgba(34,211,238,0.1)',
                  }}
                >
                  {String(slides.length).padStart(2, "0")}
                </div>
              </div>
            </div>
            
            {/* Right Navigation Button - Royal */}
            <button
              onClick={handleNext}
              className={`group absolute -right-12 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800/95 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:bg-gray-700/95 hover:border-white/30 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed lg:h-20 lg:w-20 ${
                isVisible 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 translate-x-10 scale-75'
              }`}
              style={{
                transitionDelay: isVisible ? '800ms' : '0ms',
              }}
              aria-label={t("portfolio.carouselNextProject")}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-cyan-300 lg:h-10 lg:w-10" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
