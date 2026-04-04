'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { collectionsData } from '@/lib/collections'

export default function Collections() {
  const { messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback

  return (
    <section className="relative bg-thangka-parchment-deep py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-2xl tracking-wide text-stone-900 lg:text-[2rem]">
            {t('home', 'collections', 'Collections')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone-600">
            {t('home', 'collectionsSubtitle', 'Explore deities, mandalas, lineage masters, and special themes.')}
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-thangka-gold/70" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collectionsData.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-stone-200/90 bg-white/90 px-4 py-4 shadow-sm transition duration-200 hover:border-thangka-gold/40 hover:bg-white hover:shadow-thangka"
            >
              <span className="min-w-0 flex-1 text-left text-sm font-medium text-stone-800 transition group-hover:text-burgundy">
                {collection.name}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-stone-500">
                <span>
                  {collection.count} {t('ui', 'products', 'products')}
                </span>
                <ChevronRight size={14} className="text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-thangka-gold" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center rounded-sm border-2 border-burgundy bg-burgundy px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-burgundy-deep hover:text-white"
          >
            {t('home', 'viewAllCollections', 'VIEW ALL COLLECTIONS')}
          </Link>
        </div>
      </div>
    </section>
  )
}
