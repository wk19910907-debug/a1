'use client'

import { useState } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage, localeLabels, supportedLocales, type Locale } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, setLocale, messages } = useLanguage()
  const currentConfig = localeLabels[locale]
  const selectLabel = messages?.language?.select || 'Select Language'

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
      >
        <Globe size={14} className="shrink-0" />
        <span className="shrink-0">{currentConfig.flag}</span>
        <span className="max-w-[120px] truncate text-left text-xs sm:max-w-[140px]">{currentConfig.label}</span>
        <ChevronDown size={12} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-1/2 top-full z-[70] mt-2 w-[min(100vw-2rem,15rem)] max-h-[min(18rem,calc(100vh-8rem))] -translate-x-1/2 overflow-y-auto rounded-md border border-[#333] bg-[#1a1a1a] py-1 shadow-2xl sm:w-60"
        >
          <p className="border-b border-white/10 px-3 py-2.5 text-center text-xs text-white/50">{selectLabel}</p>
          <div className="p-1.5">
            {supportedLocales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleLocaleChange(loc)}
                className={`relative flex w-full items-center justify-center gap-2 rounded-md py-2.5 pl-3 pr-10 text-sm transition-colors ${
                  locale === loc
                    ? 'bg-[#c9a227]/20 text-[#c9a227]'
                    : 'text-white/80 hover:bg-[#333]'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="tabular-nums">{localeLabels[loc].flag}</span>
                  <span>{localeLabels[loc].label}</span>
                </span>
                {locale === loc && (
                  <Check size={14} className="absolute right-3 top-1/2 shrink-0 -translate-y-1/2 text-[#c9a227]" aria-hidden />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
