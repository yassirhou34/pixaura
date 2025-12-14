"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations } from '@/lib/translations'

type Language = 'fr' | 'en'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  // Read language SYNCHRONOUSLY on initialization to prevent French flash
  // Note: We initialize with the value from localStorage if available to avoid flash,
  // but we use suppressHydrationWarning on root to allow this mismatch.
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en' // Default to English for SSR
    const storedLang = localStorage.getItem('language') as Language
    if (storedLang && (storedLang === 'fr' || storedLang === 'en')) {
      return storedLang
    }
    // Default to English to prevent French flash
    return 'en'
  }

  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  // Ensure localStorage is in sync on mount (double check)
  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language
    if (storedLang && (storedLang !== language)) {
      setLanguageState(storedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        // Fallback to French if translation is missing
        value = translations.fr
        for (const k2 of keys) {
          value = value?.[k2]
        }
        break
      }
    }

    return typeof value === 'string' ? value : key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

