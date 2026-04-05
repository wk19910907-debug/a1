'use client'

import { useRef, useState } from 'react'
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface Product {
  id: string
  name: string
  size: string
  image: string
  category: string
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: '黄财神',
    size: '60*45',
    image: '/images/黄财神.webp',
    category: 'Featured',
  },
  {
    id: '2',
    name: '绿度母',
    size: '60*45',
    image: '/images/绿度母.webp',
    category: 'Featured',
  },
  {
    id: '3',
    name: '四臂观音',
    size: '76*56',
    image: '/images/四臂观音.webp',
    category: 'Featured',
  },
  {
    id: '4',
    name: '阿弥陀佛',
    size: '60*45',
    image: '/images/阿弥陀佛.webp',
    category: 'Featured',
  },
  {
    id: '5',
    name: '药师佛',
    size: '52*40',
    image: '/images/药师佛.webp',
    category: 'Featured',
  },
  {
    id: '6',
    name: '文殊菩萨',
    size: '66*44',
    image: '/images/文殊.webp',
    category: 'Featured',
  },
]

export default function FeaturedProducts({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { locale, messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback

  const localizedNames: Record<string, Record<string, string>> = {
    '1': { en: 'Yellow Jambhala', de: 'Gelber Jambhala', zh: '黄财神', ja: 'イエロージャンバラ' },
    '2': { en: 'Green Tara', de: 'Grüne Tara', zh: '绿度母', ja: 'グリーンターラー' },
    '3': { en: 'Four-Armed Chenrezig', de: 'Vierarmiger Chenrezig', zh: '四臂观音', ja: '四臂観音' },
    '4': { en: 'Amitabha Buddha', de: 'Amitabha Buddha', zh: '阿弥陀佛', ja: '阿弥陀如来' },
    '5': { en: 'Medicine Buddha', de: 'Medizin-Buddha', zh: '药师佛', ja: '薬師如来' },
    '6': { en: 'Manjushri Bodhisattva', de: 'Manjushri Bodhisattva', zh: '文殊菩萨', ja: '文殊菩薩' },
  }

  const scrollTrack = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const amount = 280
    trackRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative bg-thangka-parchment py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-thangka-gold/45 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 text-center">
          <h2 className="font-serif text-2xl tracking-wide text-stone-900 lg:text-[2rem]">
            {t('home', 'featuredProducts', 'Featured')}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-stone-600">
            {t('home', 'featuredSubtitle', 'Mineral pigments on cotton — museum-quality lineage from Nepal.')}
          </p>
          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollTrack('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition hover:border-thangka-gold hover:text-thangka-gold"
              aria-label={t('ui', 'scrollFeaturedLeft', 'Scroll featured left')}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition hover:border-thangka-gold hover:text-thangka-gold"
              aria-label={t('ui', 'scrollFeaturedRight', 'Scroll featured right')}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="featured-track overflow-x-auto pb-4">
          <div className="flex min-w-max gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative w-[190px] shrink-0 sm:w-[210px] md:w-[228px]"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="overflow-hidden rounded-xl bg-white shadow-thangka ring-1 ring-stone-200/90 transition duration-300 hover:shadow-thangka-lg hover:ring-thangka-gold/35">
                  <Link href={`/product${product.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-200">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />

                      {hoveredId === product.id && (
                        <div
                          className="absolute inset-0 flex items-center justify-center gap-3 bg-stone-900/55 transition-opacity"
                          onClick={(e) => e.preventDefault()}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              onAddToCart(product)
                            }}
                            className="rounded-full bg-white p-2.5 text-stone-900 shadow-md transition hover:bg-thangka-gold"
                            aria-label={t('ui', 'addToCart', 'Add to cart')}
                          >
                            <ShoppingCart size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => e.preventDefault()}
                            className="rounded-full bg-white p-2.5 text-stone-900 shadow-md transition hover:bg-thangka-gold"
                            aria-label={t('ui', 'wishlist', 'Wishlist')}
                          >
                            <Heart size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="px-3 pb-4 pt-3 text-center">
                    <Link
                      href={`/product${product.id}`}
                      className="block min-h-[2.75em] text-sm font-medium leading-snug text-stone-800 transition hover:text-burgundy"
                    >
                      {localizedNames[product.id]?.[locale] || localizedNames[product.id]?.en || product.name}
                    </Link>
                    <p className="mt-1 text-xs text-stone-500">{product.size}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
