'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import type { CollectionMeta } from '@/lib/collections'

export default function CollectionDetailClient({
  current,
  related,
}: {
  current: CollectionMeta
  related: CollectionMeta[]
}) {
  const { messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <Link href="/collections" className="text-sm text-stone-600 transition hover:text-burgundy">
          ← {ui('allCollections', 'All Collections')}
        </Link>

        <header className="mt-8 text-center lg:text-left">
          <h1 className="font-serif text-3xl text-stone-900 lg:text-4xl">{current.name}</h1>
          <p className="mt-2 text-sm text-stone-600">
            {current.count} {ui('products', 'products')}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((idx) => (
            <article
              key={idx}
              className="overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-thangka transition duration-200 hover:shadow-thangka-lg hover:ring-1 hover:ring-thangka-gold/30"
            >
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                <img src={current.image} alt={current.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium leading-snug text-stone-800">
                  {current.name.replace('Thangkas', ui('thangkaPainting', 'Thangka Painting'))} {60 + idx}*{40 + idx}
                </h3>
                <p className="mt-2 text-base font-medium text-thangka-gold">
                  {ui('fromPricePrefix', 'From')} ${(520 + idx * 120).toLocaleString()}.00 USD
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 border-t border-stone-200/90 pt-12">
          <h2 className="font-serif text-2xl text-stone-900">{ui('relatedCollections', 'Related Collections')}</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-stone-200/90 bg-white px-4 py-4 shadow-sm transition hover:border-thangka-gold/40 hover:shadow-thangka"
              >
                <span className="text-sm font-medium text-stone-800">{item.name}</span>
                <span className="shrink-0 text-xs text-stone-500">
                  {item.count} {ui('products', 'products')}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
