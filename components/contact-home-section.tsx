"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"

type FormData = {
  besoin: string
  budget: string
  delai: string
  secteur: string
  privacy: boolean
}

export function ContactHomeSection() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    besoin: "",
    budget: "",
    delai: "",
    secteur: "",
    privacy: false,
  })

  const totalSteps = 4

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          besoin: "",
          budget: "",
          delai: "",
          secteur: "",
          privacy: false,
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.besoin.trim().length > 0
      case 2:
        return formData.budget !== ""
      case 3:
        return formData.delai !== ""
      case 4:
        return formData.secteur !== "" && formData.privacy
      default:
        return false
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Envoyez-nous vos coordonnées */}
        <Reveal>
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ 
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '-0.02em',
              }}>
                {t("contactHome.title")}
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto" style={{ 
                fontFamily: 'Montserrat, sans-serif',
              }}>
                {t("contactHome.description")}
              </p>
            </div>

            {submitted ? (
              <Reveal>
                <div className="max-w-2xl mx-auto text-center py-16 px-8 rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl relative overflow-hidden shadow-[0_25px_80px_rgba(0,115,255,0.15)]">
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-cyan-400/5 to-transparent opacity-50" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,115,255,0.4)]">
                      <Check className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {t("contactHome.thankYou")}
                    </h3>
                    <p className="text-lg text-white/80 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {t("contactHome.contactWithin48h")}
                    </p>
                    <Link 
                      href="/"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {t("contactHome.backToHome")}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ) : (
              <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {[...Array(totalSteps)].map((_, i) => (
                      <div key={i} className="flex items-center flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300"
                             style={{
                               borderColor: currentStep > i + 1 ? '#0073FF' : currentStep === i + 1 ? '#0073FF' : 'rgba(255,255,255,0.2)',
                               backgroundColor: currentStep > i + 1 ? '#0073FF' : currentStep === i + 1 ? '#0073FF' : 'transparent',
                             }}>
                          {currentStep > i + 1 ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-sm font-bold" style={{ color: currentStep === i + 1 ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                              {i + 1}
                            </span>
                          )}
                        </div>
                        {i < totalSteps - 1 && (
                          <div className="flex-1 h-0.5 mx-2 transition-all duration-300 rounded-full"
                               style={{
                                 backgroundColor: currentStep > i + 1 ? '#0073FF' : 'rgba(255,255,255,0.2)',
                               }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
                  {/* Subtle background effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-cyan-400/3 to-transparent opacity-40" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                  {/* Step 1: Besoin */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {t("contactHome.step1")}
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {t("contactHome.describeProject")}
                        </label>
                        <textarea
                          name="besoin"
                          value={formData.besoin}
                          onChange={handleChange}
                          required
                          rows={8}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-white/40 resize-none backdrop-blur-sm hover:border-white/20"
                          placeholder={t("contactHome.describePlaceholder")}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Budget */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {t("contactHome.step2")}
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {t("contactHome.estimatedBudget")}
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white backdrop-blur-sm hover:border-white/20 cursor-pointer"
                        >
                          <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.selectRange")}</option>
                          <option value="under-5k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.under5k")}</option>
                          <option value="5k-15k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.range5k15k")}</option>
                          <option value="15k-50k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.range15k50k")}</option>
                          <option value="over-50k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.over50k")}</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Délai */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {t("contactHome.step3")}
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {t("contactHome.desiredTimeline")}
                        </label>
                        <select
                          name="delai"
                          value={formData.delai}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white backdrop-blur-sm hover:border-white/20 cursor-pointer"
                        >
                          <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.selectTimeline")}</option>
                          <option value="1-2weeks" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.timeline1to2weeks")}</option>
                          <option value="3-4weeks" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.timeline3to4weeks")}</option>
                          <option value="1-3months" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.timeline1to3months")}</option>
                          <option value="flexible" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.flexible")}</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Secteur */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {t("contactHome.step4")}
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {t("contactHome.sector")}
                        </label>
                        <select
                          name="secteur"
                          value={formData.secteur}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white backdrop-blur-sm hover:border-white/20 cursor-pointer"
                        >
                          <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.selectSector")}</option>
                          <option value="immobilier" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.realEstate")}</option>
                          <option value="automobile" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.automotive")}</option>
                          <option value="sport" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.sport")}</option>
                          <option value="beaute" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.beauty")}</option>
                          <option value="restauration" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.restaurant")}</option>
                          <option value="tech" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.tech")}</option>
                          <option value="other" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.other")}</option>
                        </select>
                      </div>
                      <div className="flex items-start gap-3 pt-4">
                        <input
                          type="checkbox"
                          name="privacy"
                          checked={formData.privacy}
                          onChange={handleChange}
                          required
                          className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <label className="text-sm text-white/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {t("contactHome.privacyAccept")}
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-3 border border-white/20 text-white rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(0,115,255,0.2)]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t("contactHome.previous")}
                      </button>
                    )}
                    <div className="flex-1" />
                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className="px-8 py-3 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t("contactHome.next")}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isStepValid()}
                        className="px-8 py-3 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t("contactHome.send")}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Reveal>
        <div className="relative mb-20 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/25 to-transparent">
              <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-blue-400/50 via-purple-400/70 to-cyan-400/50" />
            </div>
          </div>
        </div>


        {/* Section 2: Prendre rendez-vous */}
        <Reveal>
          <div id="rendez-vous" className="text-center scroll-mt-24">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ 
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '-0.02em',
              }}>
                {t("contactHome.appointmentTitle")}
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto" style={{ 
                fontFamily: 'Montserrat, sans-serif',
              }}>
                {t("contactHome.appointmentDescription")}
              </p>
            </div>

            {/* Calendar Card */}
            <div className="max-w-3xl mx-auto rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
              {/* Subtle background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-cyan-400/3 to-transparent opacity-40" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center py-12">
                <Link 
                  href="mailto:contact@pixaura.eu?subject=Demande de rendez-vous"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {t("contactHome.contactForAppointment")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

