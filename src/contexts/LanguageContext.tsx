'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import enMessages from '../messages/en.json'

type Locale =
  | 'zh'
  | 'en'
  | 'ja'
  | 'ko'
  | 'fr'
  | 'de'
  | 'es'
  | 'it'
  | 'ru'
  | 'pt'
  | 'ar'
  | 'hi'
  | 'th'
  | 'vi'
  | 'id'
  | 'nl'
  | 'tr'
  | 'pl'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: Record<string, any>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const localeLabels: Record<Locale, { label: string; flag: string }> = {
  zh: { label: '简体中文', flag: '🇨🇳' },
  en: { label: 'English', flag: '🇺🇸' },
  ja: { label: '日本語', flag: '🇯🇵' },
  ko: { label: '한국어', flag: '🇰🇷' },
  fr: { label: 'Français', flag: '🇫🇷' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  es: { label: 'Español', flag: '🇪🇸' },
  it: { label: 'Italiano', flag: '🇮🇹' },
  ru: { label: 'Русский', flag: '🇷🇺' },
  pt: { label: 'Português', flag: '🇵🇹' },
  ar: { label: 'العربية', flag: '🇸🇦' },
  hi: { label: 'हिन्दी', flag: '🇮🇳' },
  th: { label: 'ไทย', flag: '🇹🇭' },
  vi: { label: 'Tiếng Việt', flag: '🇻🇳' },
  id: { label: 'Bahasa Indonesia', flag: '🇮🇩' },
  nl: { label: 'Nederlands', flag: '🇳🇱' },
  tr: { label: 'Türkçe', flag: '🇹🇷' },
  pl: { label: 'Polski', flag: '🇵🇱' },
}

/** Shown in header/footer language menus; order = common ecommerce / reach (merged onto English copy when a locale file is sparse). */
export const supportedLocales: Locale[] = [
  'en',
  'zh',
  'es',
  'hi',
  'ar',
  'fr',
  'de',
  'pt',
  'ru',
  'ja',
  'ko',
  'it',
  'nl',
  'pl',
  'tr',
  'th',
  'vi',
  'id',
]

const fallbackMessages = enMessages as Record<string, any>

function deepMerge(base: Record<string, any>, override: Record<string, any>): Record<string, any> {
  const output: Record<string, any> = { ...base }
  for (const key of Object.keys(override || {})) {
    const baseValue = output[key]
    const nextValue = override[key]
    if (
      baseValue &&
      nextValue &&
      typeof baseValue === 'object' &&
      typeof nextValue === 'object' &&
      !Array.isArray(baseValue) &&
      !Array.isArray(nextValue)
    ) {
      output[key] = deepMerge(baseValue, nextValue)
    } else {
      output[key] = nextValue
    }
  }
  return output
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [messages, setMessages] = useState(fallbackMessages)

  useEffect(() => {
    // Load locale from localStorage
    const savedLocale = localStorage.getItem('thangka-locale') as Locale
    if (savedLocale && localeLabels[savedLocale]) {
      setLocaleState(savedLocale)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const mod = await import(`../messages/${locale}.json`)
        if (!cancelled) setMessages(deepMerge(fallbackMessages, (mod as any).default ?? mod))
      } catch {
        if (!cancelled) setMessages(fallbackMessages)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('thangka-locale', newLocale)
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, messages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export { localeLabels }
export type { Locale }
