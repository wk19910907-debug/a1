'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import type { ProductMeta } from '@/lib/products'

export default function ProductDetailPage({ product }: { product: ProductMeta }) {
  const { locale, messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback
  const isZh = locale === 'zh'
  const isJa = locale === 'ja'
  const productName = isZh ? product.nameZh : isJa ? product.nameJa : product.nameEn
  const productDescription = isZh ? product.descriptionZh : isJa ? product.descriptionJa : product.descriptionEn

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-stone-600 transition hover:text-burgundy"
        >
          <span aria-hidden>←</span>
          {ui('backToHome', 'Back to Home')}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div className="overflow-hidden rounded-xl bg-white shadow-thangka ring-1 ring-stone-200/90 lg:sticky lg:top-24">
            <div className="aspect-[3/4] bg-stone-100">
              <img src={product.image} alt={productName} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-stone-200/90 bg-white p-6 shadow-thangka sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-thangka-gold">{ui('featuredCollection', 'Featured Collection')}</p>
            <h1 className="mt-3 font-serif text-3xl font-normal leading-tight text-stone-900 lg:text-4xl">{productName}</h1>

            <div className="mt-8 border-t border-stone-200/80 pt-8">
              <p className="font-serif text-3xl font-medium text-thangka-gold">¥{product.priceCny.toLocaleString()}</p>
              <p className="mt-2 text-sm text-stone-500">
                {t('product', 'size', 'Size')}: <span className="text-stone-800">{product.size}</span>
              </p>
            </div>

            <div className="mt-8 space-y-8 border-t border-stone-200/80 pt-8">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-800">{t('product', 'description', 'Description')}</h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{productDescription}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-800">{t('product', 'material', 'Material')}</h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{ui('productMaterial', 'Cotton canvas, natural mineral pigments')}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-800">{t('product', 'duration', 'Creation Time')}</h2>
                <p className="mt-3 text-sm text-stone-600">
                  {product.productionDays} {ui('days', 'days')}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/payment"
                className="inline-flex flex-1 items-center justify-center rounded-sm border-2 border-burgundy bg-burgundy px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-burgundy-deep"
              >
                {t('product', 'buyNow', 'Buy Now')}
              </Link>
              <Link
                href="/collections"
                className="inline-flex flex-1 items-center justify-center rounded-sm border-2 border-stone-300 px-8 py-3.5 text-center text-sm font-medium text-stone-700 transition hover:border-thangka-gold hover:text-burgundy"
              >
                {t('cart', 'continueShopping', 'Continue Shopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
