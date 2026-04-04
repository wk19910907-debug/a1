'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { collectionsData } from '@/lib/collections'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CollectionsPage() {
  const { messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{t('ui', 'collectionsEyebrow', 'Catalog')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900 lg:text-4xl">{t('footer', 'allCollections', 'All Collections')}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-stone-600">
            {t(
              'ui',
              'collectionsIntro',
              'Browse our complete collection of authentic hand-painted Tibetan Thangkas, featuring Buddhist deities, mandalas, and spiritual art from Kathmandu Valley, Nepal.'
            )}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectionsData.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group rounded-xl border border-stone-200/90 bg-white p-6 shadow-thangka transition duration-200 hover:border-thangka-gold/40 hover:shadow-thangka-lg"
            >
              <h2 className="text-lg font-medium text-stone-900 transition group-hover:text-burgundy">{col.name}</h2>
              <p className="mt-2 text-sm text-stone-500">
                {col.count} {t('ui', 'products', 'products')}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
