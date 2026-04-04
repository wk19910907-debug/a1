'use client'

import { useState } from 'react'
import { ShoppingCart, Menu, X, Search, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { collectionsData } from '@/lib/collections'

const navGroups: Record<string, { label: string; href: string }[]> = {
  buddhas: [
    'buddha-shakyamuni-thangkas',
    'chenrezig-thangkas',
    'manjushri-thangkas',
    'guru-rinpoche-thangkas',
    'amitabha-buddha-thangkas',
    'medicine-buddha-thangkas',
    'green-tara-thangkas',
    'white-tara-thangkas',
  ].map((slug) => {
    const c = collectionsData.find((x) => x.slug === slug)!
    return { label: c.name, href: `/collections/${c.slug}` }
  }),
  lamas: ['je-tsongkapa-thangkas', 'marpa-lotsawa-thangkas', 'milarepa-thangkas', 'karmapa-thangkas'].map((slug) => {
    const c = collectionsData.find((x) => x.slug === slug)!
    return { label: c.name, href: `/collections/${c.slug}` }
  }),
  mandalas: ['mantra-mandala-thangkas', 'lotus-mandalas-thangkas', 'kalachakra-mandalas', 'buddha-mandala-thangkas'].map((slug) => {
    const c = collectionsData.find((x) => x.slug === slug)!
    return { label: c.name, href: `/collections/${c.slug}` }
  }),
  special: ['wheel-of-life-thangkas', 'life-of-buddha-thangkas', 'the-4-friends-thangkas', 'refuge-tree-thangkas'].map((slug) => {
    const c = collectionsData.find((x) => x.slug === slug)!
    return { label: c.name, href: `/collections/${c.slug}` }
  }),
  info: [
    { label: 'about', href: '/' },
    { label: 'posts', href: '/blogs/posts' },
    { label: 'contact', href: '/terms' },
  ],
}

export default function Header({ cartCount }: { cartCount: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { locale, messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback
  const navLabel = (key: string, fallback: string) => t('nav', key, fallback)
  const ui = (key: string, fallback: string) => t('ui', key, fallback)
  const isCjk = locale === 'zh' || locale === 'ja'
  const collectionLabelMap: Record<string, Record<string, string>> = {
    'Green Tara Thangkas': { de: 'Grüne Tara Thangkas', zh: '绿度母唐卡', ja: 'グリーンターラー タンカ' },
    'White Tara Thangkas': { de: 'Weiße Tara Thangkas', zh: '白度母唐卡', ja: 'ホワイトターラー タンカ' },
    'Medicine Buddha Thangkas': { de: 'Medizin-Buddha Thangkas', zh: '药师佛唐卡', ja: '薬師如来 タンカ' },
    'Buddha Shakyamuni Thangkas': { de: 'Shakyamuni Buddha Thangkas', zh: '释迦牟尼佛唐卡', ja: '釈迦牟尼仏 タンカ' },
    'Chenrezig / Avalokiteshvara Thangkas': { de: 'Chenrezig / Avalokiteshvara Thangkas', zh: '观音唐卡', ja: '観音 タンカ' },
    'Manjushri Thangkas': { de: 'Manjushri Thangkas', zh: '文殊菩萨唐卡', ja: '文殊菩薩 タンカ' },
    'Amitabha Buddha Thangkas': { de: 'Amitabha Buddha Thangkas', zh: '阿弥陀佛唐卡', ja: '阿弥陀如来 タンカ' },
    'Padmasambhava / Guru Rinpoche Thangkas': { de: 'Padmasambhava / Guru Rinpoche Thangkas', zh: '莲花生大师唐卡', ja: 'グル・リンポチェ タンカ' },
  }
  const localizeCollectionLabel = (label: string) => collectionLabelMap[label]?.[locale] || label

  return (
    <>
      <div className="bg-[#111] border-b border-[#2a2a2a] text-center text-[11px] tracking-[0.08em] text-white/85 py-2">
        {ui('freeShipping', 'FREE Worldwide Shipping')}
      </div>

      {/* z-[60] so the language dropdown (absolute, opens downward) stacks above the sticky main nav + hero */}
      <div className="relative z-[60] bg-[#5c0000] border-b border-[#7a0000] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-10 w-full items-center justify-end gap-4 py-1 text-white/80 md:justify-between">
            <div className="hidden min-w-0 flex-1 md:flex md:flex-none md:items-center md:gap-3 text-[11px] tracking-wide">
              <span>{ui('countryRegion', 'Country/region')}</span>
              <span className="truncate text-white">{ui('defaultRegion', 'United States | USD $')}</span>
            </div>
            <div className="shrink-0 md:ml-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#7a0000]/80 bg-[#8B0000]/95 shadow-md shadow-black/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 flex justify-center lg:justify-start min-w-0">
              <Link href="/" className="flex flex-col items-center lg:items-start">
                <span className="text-2xl lg:text-[2rem] font-serif text-white tracking-wide leading-none whitespace-nowrap">The Thangka</span>
                <span className="text-[10px] text-white/50 tracking-[0.28em] mt-1 hidden sm:block whitespace-nowrap">TRADITIONAL ART</span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center min-w-0">
              <Link href="/" className={`text-white/80 hover:text-[#c9a227] text-[12px] xl:text-[13px] whitespace-nowrap ${isCjk ? '' : 'uppercase'}`}>{navLabel('home', 'Home')}</Link>
              {[
                [navLabel('buddhasAndDeities', 'Buddhas & Deities'), 'buddhas'],
                [navLabel('lamas', 'Lamas'), 'lamas'],
                [navLabel('mandalas', 'Mandalas'), 'mandalas'],
                [navLabel('special', 'Special'), 'special'],
                [navLabel('info', 'Info'), 'info'],
              ].map(([label, key]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className={`flex items-center text-white/80 hover:text-[#c9a227] text-[12px] xl:text-[13px] whitespace-nowrap ${isCjk ? '' : 'uppercase'}`}>
                    {label}
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  {openDropdown === key && (
                    <div className="absolute top-full left-0 mt-4 w-[360px] bg-[#101010] border border-[#2f2f2f] shadow-2xl z-[90]">
                      <div className="p-4 space-y-2">
                        {navGroups[key].map((item) => (
                          <Link key={item.label} href={item.href} className="block text-white/75 hover:text-[#c9a227] text-[13px] py-1.5">
                            {key === 'info' ? navLabel(item.label, item.label) : localizeCollectionLabel(item.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link href="/collections" className={`text-white/80 hover:text-[#c9a227] text-[12px] xl:text-[13px] whitespace-nowrap ${isCjk ? '' : 'uppercase'}`}>{navLabel('all', 'All')}</Link>
            </nav>

            <div className="flex flex-shrink-0 items-center space-x-4 flex-1 justify-end min-w-0">
              <button className="p-2 text-white/80 hover:text-[#c9a227] transition-colors">
                <Search size={20} />
              </button>
              <Link href="/account" className="p-2 text-white/80 hover:text-[#c9a227] transition-colors flex items-center">
                <span className="text-xs hidden sm:inline mr-1">{t('header', 'login', 'Log in')}</span>
                <User size={20} />
              </Link>
              <Link href="/cart" className="p-2 text-white/80 hover:text-[#c9a227] transition-colors relative flex items-center">
                <span className="text-xs hidden sm:inline mr-1">{t('header', 'cart', 'Cart')}</span>
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c9a227] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-[#1a1a1a] border-t border-[#333]">
            <nav className="flex flex-col px-4 py-4 space-y-3">
              <Link href="/" className="text-white/80 py-2 border-b border-[#333]">{navLabel('home', 'Home')}</Link>
              <Link href="/collections" className="text-white/80 py-2 border-b border-[#333]">{navLabel('buddhasAndDeities', 'Buddhas & Deities')}</Link>
              <Link href="/collections" className="text-white/80 py-2 border-b border-[#333]">{navLabel('lamas', 'Lamas')}</Link>
              <Link href="/collections" className="text-white/80 py-2 border-b border-[#333]">{navLabel('mandalas', 'Mandalas')}</Link>
              <Link href="/collections" className="text-white/80 py-2 border-b border-[#333]">{navLabel('special', 'Special')}</Link>
              <Link href="/blogs/posts" className="text-white/80 py-2">{navLabel('info', 'Info')}</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
