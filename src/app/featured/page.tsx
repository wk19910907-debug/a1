'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { productsData } from '@/lib/products'

export default function FeaturedPage() {
  const { locale, messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback
  const featuredProducts = productsData.slice(0, 6).map((p) => ({
    id: Number(p.id),
    name: locale === 'zh' ? p.nameZh : locale === 'ja' ? p.nameJa : p.nameEn,
    size: p.size.replace(' cm', ''),
    price: p.priceCny,
    image: p.image,
    href: `/${p.slug}`,
  }))

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{t('ui', 'featuredEyebrow', 'Curated')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900 lg:text-4xl">{t('footer', 'featuredThangkas', 'Featured Thangkas')}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-stone-600">
            {t(
              'ui',
              'featuredIntro',
              'Our handpicked selection of exquisite Tibetan Thangka paintings, featuring the finest Buddhist art from Kathmandu Valley.'
            )}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-thangka transition duration-200 hover:shadow-thangka-lg hover:ring-1 hover:ring-thangka-gold/35"
            >
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-4">
                <h2 className="min-h-[2.7em] text-base font-medium leading-snug text-stone-900 transition group-hover:text-burgundy">{product.name}</h2>
                <p className="mt-1 text-sm text-stone-500">{product.size}</p>
                <p className="mt-2 text-lg font-medium text-thangka-gold">
                  {t('ui', 'fromPricePrefix', 'From')} ${product.price.toLocaleString()}.00 USD
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
