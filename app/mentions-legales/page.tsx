"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Building2, Server, Shield, FileText, Lock, Scale, ExternalLink, Mail, Globe, ArrowRight } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export default function MentionsLegalesPage() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    {
      id: "editeur",
      icon: Building2,
      title: t("mentionsLegales.editeur.title"),
      content: [
        {
          label: t("mentionsLegales.editeur.editedBy"),
          value: t("mentionsLegales.editeur.company")
        },
        {
          label: t("mentionsLegales.editeur.address"),
          value: t("mentionsLegales.editeur.addressValue")
        },
        {
          label: t("mentionsLegales.editeur.contact"),
          value: "contact@pixaura.eu",
          type: "email"
        },
        {
          label: t("mentionsLegales.editeur.director"),
          value: t("mentionsLegales.editeur.directorValue")
        }
      ]
    },
    {
      id: "hebergement",
      icon: Server,
      title: t("mentionsLegales.hebergement.title"),
      content: [
        {
          label: t("mentionsLegales.hebergement.hostedBy"),
          value: t("mentionsLegales.hebergement.company")
        },
        {
          label: t("mentionsLegales.hebergement.address"),
          value: t("mentionsLegales.hebergement.addressValue")
        },
        {
          label: t("mentionsLegales.hebergement.website"),
          value: "https://www.ionos.fr",
          type: "link"
        }
      ]
    },
    {
      id: "propriete",
      icon: Shield,
      title: t("mentionsLegales.propriete.title"),
      content: [
        {
          value: t("mentionsLegales.propriete.content")
        }
      ]
    },
    {
      id: "donnees",
      icon: Lock,
      title: t("mentionsLegales.donnees.title"),
      content: [
        {
          value: t("mentionsLegales.donnees.content1")
        },
        {
          label: t("mentionsLegales.donnees.controller"),
          value: t("mentionsLegales.donnees.controllerValue"),
          type: "email"
        },
        {
          value: t("mentionsLegales.donnees.content2")
        },
        {
          value: t("mentionsLegales.donnees.content3")
        },
        {
          value: t("mentionsLegales.donnees.content4")
        },
        {
          label: t("mentionsLegales.donnees.exerciseRights"),
          value: "contact@pixaura.eu",
          type: "email"
        }
      ]
    },
    {
      id: "cookies",
      icon: FileText,
      title: t("mentionsLegales.cookies.title"),
      content: [
        {
          value: t("mentionsLegales.cookies.content1")
        },
        {
          value: t("mentionsLegales.cookies.content2")
        },
        {
          value: t("mentionsLegales.cookies.content3")
        }
      ]
    },
    {
      id: "responsabilite",
      icon: Scale,
      title: t("mentionsLegales.responsabilite.title"),
      content: [
        {
          value: t("mentionsLegales.responsabilite.content1")
        },
        {
          value: `• ${t("mentionsLegales.responsabilite.item1")}`
        },
        {
          value: `• ${t("mentionsLegales.responsabilite.item2")}`
        },
        {
          value: `• ${t("mentionsLegales.responsabilite.item3")}`
        }
      ]
    },
    {
      id: "liens",
      icon: ExternalLink,
      title: t("mentionsLegales.liens.title"),
      content: [
        {
          value: t("mentionsLegales.liens.content")
        }
      ]
    },
    {
      id: "modification",
      icon: FileText,
      title: t("mentionsLegales.modification.title"),
      content: [
        {
          value: t("mentionsLegales.modification.content")
        }
      ]
    },
    {
      id: "droit",
      icon: Scale,
      title: t("mentionsLegales.droit.title"),
      content: [
        {
          value: t("mentionsLegales.droit.content")
        }
      ]
    },
    {
      id: "credits",
      icon: Globe,
      title: t("mentionsLegales.credits.title"),
      content: [
        {
          label: t("mentionsLegales.credits.developedBy"),
          value: t("mentionsLegales.credits.developer")
        },
        {
          label: t("mentionsLegales.credits.siret"),
          value: t("mentionsLegales.credits.siretValue")
        },
        {
          label: t("mentionsLegales.credits.website"),
          value: "https://melissabonnet.fr",
          type: "link"
        }
      ]
    }
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <Navbar />
      
      {/* Background - Same as homepage */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Background image - visible on desktop */}
        <img
          src="/Banque d_images/ippppp1.png"
          alt="Background"
          className="hidden md:block h-full w-full object-cover"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
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

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Professional Hero Section */}
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm mb-8">
              <Shield className="h-3 w-3" />
              <span>{t("mentionsLegales.badge")}</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              {t("mentionsLegales.title")}
            </h1>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
            </div>
            
            <div className="flex justify-center">
              <Image
                src="/Banque d_images/PIXaura-soft white.png"
                alt="Pixaura International"
                width={280}
                height={84}
                className="h-12 sm:h-16 w-auto"
              />
            </div>
          </div>

          {/* Professional Sections Grid */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon
              // Unified style for all cards - Inspired by Cookies page
              return (
                <div
                  key={section.id}
                  className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.06] to-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  {/* Header Section - Premium Professional Design */}
                  <div className="border-b border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.06] p-7 sm:p-9">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                          {section.title}
                        </h2>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400/70 to-transparent mt-2" />
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-white/[0.15] to-white/[0.08] border border-white/25 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Section */}
                  <div className="p-7 sm:p-9">
                    <div className="space-y-5">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-2">
                          {item.label && (
                            <p className="text-base font-bold text-white/90 uppercase tracking-wide">
                              {item.label}
                            </p>
                          )}
                          {item.type === "email" ? (
                            <a
                              href={`mailto:${item.value}`}
                              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-base sm:text-lg"
                            >
                              <ArrowRight className="h-5 w-5 flex-shrink-0" />
                              <span className="border-b-2 border-cyan-400/40 hover:border-cyan-300 font-medium">
                                {item.value}
                              </span>
                            </a>
                          ) : item.type === "link" ? (
                            <a
                              href={item.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-base sm:text-lg"
                            >
                              <ArrowRight className="h-5 w-5 flex-shrink-0" />
                              <span className="border-b-2 border-cyan-400/40 hover:border-cyan-300 font-medium">
                                {item.value}
                              </span>
                            </a>
                          ) : (
                            <p className="text-white/90 leading-relaxed text-base sm:text-lg font-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

