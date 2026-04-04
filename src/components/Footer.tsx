'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { localeLabels, supportedLocales, useLanguage, type Locale } from '@/contexts/LanguageContext'

export default function Footer() {
  const [regionOpen, setRegionOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [region, setRegion] = useState('United States | USD $')
  const { locale, setLocale, messages } = useLanguage()
  const t = (key: string, fallback: string) => messages.footer?.[key] || fallback
  const ui = (key: string, fallback: string) => messages.ui?.[key] || fallback
  const isCjk = locale === 'zh' || locale === 'ja'
  const sectionTitle = (key: string, fallback: string) => {
    const value = t(key, fallback)
    return isCjk ? value : value.toUpperCase()
  }

  const regionOptions = ['United States | USD $', 'China | CNY ¥', 'Canada | CAD $', 'United Kingdom | GBP £']
  const languageOptions: Locale[] = [...supportedLocales]

  const paymentMethods = [
    { short: 'AMEX', label: 'American Express' },
    { short: 'Apple', label: 'Apple Pay' },
    { short: 'MC', label: 'Mastercard' },
    { short: 'PP', label: 'PayPal' },
    { short: 'Shop', label: 'Shop Pay' },
    { short: 'VISA', label: 'Visa' },
  ]

  return (
    <footer className="border-t-2 border-thangka-gold/25 bg-[#5c0000]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-serif text-white mb-4">TheThangka.com</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {ui('footerAbout', 'Hand-painted Tibetan Thangka paintings from Boudhanath, Kathmandu Valley, Nepal.')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4 tracking-wider">{sectionTitle('shop', 'Shop')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections" className="text-white/50 hover:text-[#c9a227] transition-colors">
                  {t('allCollections', 'All Collections')}
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-white/50 hover:text-[#c9a227] transition-colors">
                  {t('featuredThangkas', 'Featured Thangkas')}
                </Link>
              </li>
              <li>
                <Link href="/collections/green-tara-thangkas" className="text-white/50 hover:text-[#c9a227] transition-colors">
                  {ui('greenTaraThangkas', 'Green Tara Thangkas')}
                </Link>
              </li>
              <li>
                <Link href="/collections/chenrezig-thangkas" className="text-white/50 hover:text-[#c9a227] transition-colors">
                  {ui('chenrezigThangkas', 'Chenrezig Thangkas')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4 tracking-wider">{sectionTitle('support', 'Support')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="text-white/50 hover:text-[#c9a227] transition-colors">
                  {t('myAccount', 'My Account')}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-white/50 hover:text-[#c9a227] transition-colors">
                  {t('shoppingCart', 'Shopping Cart')}
                </Link>
              </li>
              <li>
                <Link href="/blogs/posts" className="text-white/50 hover:text-[#c9a227] transition-colors">
                  {t('blogPosts', 'Blog Posts')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4 tracking-wider">{sectionTitle('contact', 'Contact')}</h4>
            <div className="space-y-3 text-sm text-white/50">
              <p className="font-medium text-white/70">{ui('officeChina', 'Office - China')}</p>
              <p>{ui('officeAddress', 'Beijing, China')}</p>
              <p className="mt-4 font-medium text-white/70">{ui('storeTibet', 'Store - Tibet')}</p>
              <p>{ui('storeAddress', 'Lhasa, Tibet, China')}</p>
              <p className="mt-4">{ui('phoneLabel', 'Phone')}: +86-xxx-xxxx-xxxx</p>
              <p>{ui('emailLabel', 'E-Mail')}: hello@thangka.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#7a0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium text-white mb-3 tracking-wider">{ui('followUs', 'FOLLOW US')}</h4>
              <p className="text-white/50 text-sm">{ui('followChannels', 'Instagram / Facebook / YouTube')}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-3 tracking-wider">{ui('subscribeEmails', 'SUBSCRIBE TO OUR EMAILS')}</h4>
              <div className="w-full max-w-md border border-[#8a8a8a]/30 px-3 py-2 text-sm text-white/50">
                {ui('emailLabel', 'E-Mail')}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-3 tracking-wider">{ui('paymentMethods', 'PAYMENT METHODS')}</h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.label}
                    title={method.label}
                    className="text-[11px] text-white/85 border border-white/25 bg-black/20 px-2.5 py-1 rounded-sm min-w-11 text-center"
                  >
                    {method.short}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center text-xs text-white/40 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="relative">
                <button
                  onClick={() => {
                    setRegionOpen((v) => !v)
                    setLanguageOpen(false)
                  }}
                  className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                >
                  <span>{region}</span>
                  <ChevronDown size={12} />
                </button>
                {regionOpen && (
                  <div className="absolute bottom-7 left-0 min-w-[220px] bg-[#101010] border border-[#2f2f2f] shadow-2xl p-1 z-20">
                    {regionOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setRegion(opt)
                          setRegionOpen(false)
                        }}
                        className="block w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setLanguageOpen((v) => !v)
                    setRegionOpen(false)
                  }}
                  className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                >
                  <span>{localeLabels[locale].label}</span>
                  <ChevronDown size={12} />
                </button>
                {languageOpen && (
                  <div className="absolute bottom-7 left-0 min-w-[170px] bg-[#101010] border border-[#2f2f2f] shadow-2xl p-1 z-20">
                    {languageOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setLocale(opt)
                          setLanguageOpen(false)
                        }}
                        className="block w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                      >
                        {localeLabels[opt].label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-6">
              <Link href="/refund-policy" className="hover:text-[#c9a227] transition-colors">
                {t('refundPolicy', 'Refund policy')}
              </Link>
              <Link href="/privacy" className="hover:text-[#c9a227] transition-colors">
                {t('privacyPolicy', 'Privacy policy')}
              </Link>
              <Link href="/terms" className="hover:text-[#c9a227] transition-colors">
                {t('termsOfService', 'Terms of service')}
              </Link>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-4">{ui('copyright', '© 2026, The Thangka Powered by Shopify')}</p>
        </div>
      </div>
    </footer>
  )
}
