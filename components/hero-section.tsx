"use client"

import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"

const heroProjects = [
  {
    id: 1,
    client: "Touraine Cars",
    title: "Night Drive Experience",
    category: "Film • Activation",
    image: "/Banque d_images/Copie de M7_03225 - Copie.jpg",
  },
  {
    id: 2,
    client: "BSD / UFC Paris",
    title: "Stage MMA Immersion",
    category: "Social • Event",
    image: "/Banque d_images/StageUfc.jpg",
  },
  {
    id: 3,
    client: "Immobilier Signature",
    title: "Résidences Lumière",
    category: "Film • Branding",
    image: "/Banque d_images/Copie de M7_01248.jpg",
  },
]

const DISPLAY_DURATION = 5200
const ANIMATION_DURATION = 900

const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child)).join("")
  }
  if (node && typeof node === "object" && "props" in (node as any)) {
    return getNodeText((node as any).props?.children)
  }
  return ""
}

export function HeroSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Preload all hero card images immediately on mount for faster loading
  useEffect(() => {
    if (typeof document === 'undefined') return

    const preloadLinks: HTMLLinkElement[] = []
    const preloadImages: HTMLImageElement[] = []

    // Preload all images aggressively with multiple methods
    heroProjects.forEach((project, index) => {
      if (project.image) {
        // Method 1: Link preload with high priority for first image
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = project.image
        link.fetchPriority = index === 0 ? 'high' : index === 1 ? 'high' : 'auto'
        document.head.appendChild(link)
        preloadLinks.push(link)

        // Method 2: Image constructor for immediate browser cache - FORCE COMPLETE LOAD for first image
        const img = new window.Image()
        if (index === 0) {
          // For first image, wait for complete load
          img.onload = () => {
            // Image fully loaded in cache
          }
        }
        img.src = project.image
        img.loading = 'eager'
        preloadImages.push(img)

        // Method 3: Full fetch for first image to ensure it's completely loaded
        if (index === 0) {
          fetch(project.image, { cache: 'force-cache' })
            .then(() => {
              // Image fully fetched and cached
            })
            .catch(() => {
              // Silent fail
            })
        } else if (index <= 1) {
          // HEAD request for second image
          fetch(project.image, { method: 'HEAD', cache: 'force-cache' }).catch(() => {
            // Silent fail - just warming up the CDN
          })
        }
      }
    })
    
    return () => {
      // Cleanup
      preloadLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })
    }
  }, [])

  const headlineVariants = useMemo(() => {
    // Split headline1 for better spacing
    const headline1Parts = t("hero.headline1").split(" ")
    const headline1EndParts = t("hero.headline1End").split(" ")
    const isEnglish = t("hero.headline1").includes("aura of")
    
    return [
    (
      <>
        {isEnglish ? (
          // English: "the aura of" / "ambitious" / "brands on every" / "continent."
          <>
            <span className="block leading-tight">{headline1Parts.join(" ")}</span>
            <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">
              <span className="hero-highlight">{t("hero.headline1Highlight")}</span>
            </span>
            <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">{headline1EndParts[0]} {headline1EndParts[1]}</span>
            <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">{headline1EndParts.slice(2).join(" ")}</span>
          </>
        ) : (
          // French: "l'aura des" / "marques" / "ambitieuses sur" / "chaque continent."
          <>
            <span className="block leading-tight">{headline1Parts.slice(0, 2).join(" ")}</span>
            <span className="block leading-tight -mt-1 sm:mt-0">{headline1Parts.slice(2).join(" ")}</span>
            <span className="block leading-tight -mt-1 sm:mt-0">
              <span className="hero-highlight">{t("hero.headline1Highlight")}</span> {headline1EndParts[0]}
            </span>
            <span className="block leading-tight -mt-1 sm:mt-0">{headline1EndParts.slice(1).join(" ")}</span>
          </>
        )}
      </>
    ),
    (
      <>
        {(() => {
          const isEnglish = t("hero.headline2Line1").includes("bold ideas")
          
          if (isEnglish) {
            // English: "bold ideas that make" / "radiate" / "every brand."
            const line2Words = t("hero.headline2Line2").split(" ")
            return (
              <>
                <span className="block leading-tight">{t("hero.headline2Line1")} {line2Words.slice(0, -1).join(" ")}</span>
                <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">
                  <span className="hero-highlight">{line2Words[line2Words.length - 1]}</span>
                </span>
                <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">{t("hero.headline2Line3")}</span>
              </>
            )
          } else {
            // French: "des idées audacieuses qui" / "font rayonner chaque" / "marque."
            return (
              <>
                <span className="block leading-tight">{t("hero.headline2Line1")}</span>
                <span className="block leading-tight -mt-1 sm:mt-0">
                  {t("hero.headline2Line2").split(" ").map((word, index, array) => 
                    word === "rayonner" ? (
                      <span key={index}>
                        <span className="hero-highlight">{word}</span>
                        {index < array.length - 1 ? " " : ""}
                      </span>
                    ) : (
                      <span key={index}>{word}{index < array.length - 1 ? " " : ""}</span>
                    )
                  )}
                </span>
                <span className="block leading-tight -mt-1 sm:mt-0">{t("hero.headline2Line3")}</span>
              </>
            )
          }
        })()}
      </>
    ),
    (
      <>
        {(() => {
          const headline3Parts = t("hero.headline3").split(" ")
          const highlightParts = t("hero.headline3Highlight").split(" ")
          const endParts = t("hero.headline3End").split(" ")
          
          // French: "des activations créatives" / "haute performance" / "pour amplifier l'impact."
          // English: "high-performance" / "creative activations" / "to amplify impact."
          if (t("hero.headline3").includes("activations")) {
            // French version
            return (
              <>
                <span className="block leading-tight">{headline3Parts.slice(0, 2).join(" ")}</span>
                <span className="block leading-tight -mt-1 sm:mt-0">{headline3Parts[2]} {highlightParts[0]}</span>
                <span className="block leading-tight -mt-1 sm:mt-0">
                  <span className="hero-highlight">{highlightParts[1]}</span>
                </span>
                <span className="block leading-tight -mt-1 sm:mt-0">{endParts.slice(0, 2).join(" ")}</span>
                <span className="block leading-tight -mt-1 sm:mt-0">{endParts.slice(2).join(" ")}</span>
              </>
            )
          } else {
            // English version: "creative" / "activations" / "high-" / "performance to" / "amplify impact."
            const creativeParts = highlightParts[1].split(" ")
            const highPerfParts = highlightParts[0].split("-")
            return (
              <>
                <span className="block leading-tight">{creativeParts[0]}</span>
                <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">
                  <span className="hero-highlight">{creativeParts[1]}</span>
                </span>
                <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">{highPerfParts[0]}-</span>
                <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">
                  {highPerfParts[1]} {endParts[0]}
                </span>
                <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">{endParts.slice(1).join(" ")}</span>
              </>
            )
          }
        })()}
      </>
    ),
    ]
  }, [t])

  const longestHeadlineIndex = useMemo(() => {
    let longest = 0
    let length = 0
    headlineVariants.forEach((variant, index) => {
      const currentLength = getNodeText(variant).length
      if (currentLength > length) {
        length = currentLength
        longest = index
      }
    })
    return longest
  }, [headlineVariants])

  const placeholderRef = useRef<HTMLDivElement>(null)
  const [placeholderHeight, setPlaceholderHeight] = useState<number>()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true)
      setActiveIndex((current) => {
        setPreviousIndex(current)
        return (current + 1) % headlineVariants.length
      })
    }, DISPLAY_DURATION)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!isAnimating) return
    const timeoutId = setTimeout(() => {
      setPreviousIndex(null)
      setIsAnimating(false)
    }, ANIMATION_DURATION)
    return () => clearTimeout(timeoutId)
  }, [isAnimating])

  useEffect(() => {
    const measure = () => {
      if (placeholderRef.current) {
        const { height } = placeholderRef.current.getBoundingClientRect()
        setPlaceholderHeight(height)
      }
    }

    measure()
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 md:px-12 lg:gap-16 xl:max-w-7xl">
        <div className="grid gap-14 text-white lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-10 xl:gap-14">
          <div className="flex flex-col gap-12 relative z-10">
            <div>
              <Reveal delay={100}>
                <div className="relative max-w-4xl z-20">
                  <span className="absolute -left-4 top-2 h-10 w-10 rounded-full bg-[radial-gradient(circle,_rgba(87,140,255,0.35),_rgba(0,0,0,0)_70%)] blur-xl z-0 sm:-left-6 sm:h-14 sm:w-14" />
                  <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-base font-semibold uppercase tracking-[0.4em] text-white/70 sm:text-lg md:text-xl">
                      {t("hero.reveal")}
                    </span>
                    <div
                      className="hero-headline-container text-[28px] font-black leading-[1.1] tracking-tight text-white sm:text-[36px] sm:leading-[1.08] md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.04] pb-0 sm:pb-0 md:pb-6 lg:pb-8"
                      aria-live="polite"
                      style={placeholderHeight ? { minHeight: placeholderHeight } : undefined}
                    >
                      <div ref={placeholderRef} className="hero-headline hero-headline--ghost">
                        {headlineVariants[longestHeadlineIndex]}
                      </div>
                      <span
                        key={activeIndex}
                        className={`hero-headline ${isAnimating ? "hero-headline--enter" : ""}`}
                      >
                        {headlineVariants[activeIndex]}
                      </span>
                      {previousIndex !== null && (
                        <span className="hero-headline hero-headline--exit">{headlineVariants[previousIndex]}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <p className="max-w-2xl text-sm text-white/80 sm:text-base md:text-lg lg:text-xl relative z-10 leading-relaxed text-justify text-justify-smooth mt-6 sm:mt-6 md:mt-8 lg:mt-10">{t("hero.subheadline")}</p>
              </Reveal>
            </div>

            <Reveal delay={360}>
              <div className="flex flex-col gap-6 lg:gap-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="/realisations"
                    className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-9 py-4 text-sm font-semibold uppercase tracking-[0.32em] text-white transition-all duration-500 hover:border-white hover:bg-white/10"
                  >
                    {t("hero.viewPortfolio")}
                    <Play className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                  </Link>
                </div>

                <div className="lg:hidden">
                  <div className="flex flex-col gap-4 w-full">
                    {heroProjects.map((project, index) => (
                      <Reveal
                        key={project.id}
                        delay={index * 140}
                        className="hero-highlight-card group relative isolate flex w-full flex-col overflow-hidden rounded-[24px] border border-white/15 bg-white/5 pb-5 text-white backdrop-blur-xl transition duration-700 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10"
                      >
                        <div className="relative h-[200px] w-full overflow-hidden sm:h-[240px]">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            quality={index === 0 ? 95 : 90}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            unoptimized={index === 0}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
                          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70 sm:text-xs">
                              {project.client}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55 sm:text-xs">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col justify-between px-5 pt-5">
                          <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">{project.title}</h3>
                          <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
                            <span className="h-px flex-1 bg-white/20" />
                            <Link href="/realisations" className="inline-flex items-center gap-2 text-white transition hover:text-white/70 active:scale-95">
                              {t("hero.explore")}
                              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Link>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative hidden w-full items-start justify-end lg:flex lg:mt-32 xl:mt-40">
            <div className="flex w-full max-w-xl justify-end gap-6 xl:max-w-2xl xl:gap-8">
              {heroProjects.map((project, index) => (
                <Reveal
                  key={project.id}
                  delay={index * 180}
                  className="hero-highlight-card group relative isolate flex h-[360px] w-[220px] flex-col overflow-hidden rounded-[28px] border border-white/15 bg-white/5 pb-5 text-white backdrop-blur-xl transition duration-700 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 xl:h-[400px] xl:w-[240px]"
                >
                  <div className="relative h-[58%] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 1280px) 220px, 260px"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={index === 0 ? 95 : 90}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      unoptimized={index === 0}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-6 pb-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70">
                        {project.client}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between px-6 pt-5">
                    <h3 className="text-base font-semibold leading-snug text-white">{project.title}</h3>
                    <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/50">
                      <span className="h-px flex-1 bg-white/20" />
                      <Link href="/realisations" className="inline-flex items-center gap-2 text-white transition hover:text-white/70">
                        Explorer
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}