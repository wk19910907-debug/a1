'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CartPage() {
  const { messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />

      <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{t('cart', 'bagLabel', 'Your bag')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900 lg:text-4xl">{t('cart', 'shoppingCartTitle', 'Shopping Cart')}</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-stone-600">{t('cart', 'cartIntro', 'Hand-painted pieces ship with care from our studio partners.')}</p>
        </div>

        <div className="mt-12 rounded-xl border border-stone-200/90 bg-white px-6 py-14 text-center shadow-thangka sm:px-10 sm:py-16">
          <p className="text-lg text-stone-600">{t('cart', 'empty', 'Your cart is empty')}</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-stone-500">{t('cart', 'emptyHint', 'Browse featured thangkas or explore collections to find your piece.')}</p>
          <Link
            href="/collections"
            className="mt-10 inline-flex items-center justify-center rounded-sm border-2 border-burgundy bg-burgundy px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-burgundy-deep"
          >
            {t('cart', 'continueShopping', 'Continue Shopping')}
          </Link>
          <div className="mt-6">
            <Link href="/featured" className="text-sm font-medium text-burgundy underline decoration-thangka-gold/40 underline-offset-4 hover:text-thangka-gold">
              {t('cart', 'viewFeatured', 'View featured works')}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
