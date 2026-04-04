'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { messages } = useLanguage()
  const t = (key: string, fallback: string) => messages.home?.[key] || fallback

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#6b0f12] via-burgundy to-[#4a0608] py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 50% -5%, rgba(212,175,55,0.14), transparent 52%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0,0,0,0.18), transparent)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.38em] text-thangka-gold-bright/90">
          {t('heroEyebrow', 'Hand-painted · Kathmandu Valley, Nepal')}
        </p>
        <h1 className="font-serif text-3xl font-normal leading-tight tracking-wide text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {t('welcome', 'Welcome to The Thangka')}{' '}
          <span className="text-thangka-gold-bright">TheThangka.com</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 lg:text-lg">
          {t(
            'subtitle',
            'Shop From Our Large Collection Of Hand-Painted Thangka Paintings From Boudhanath, Kathmandu Valley, Nepal.'
          )}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/featured"
            className="inline-flex min-w-[200px] items-center justify-center rounded-sm border-2 border-thangka-gold px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-thangka-gold transition duration-300 hover:bg-thangka-gold hover:text-stone-950"
          >
            {t('featuredProducts', 'FEATURED THANGKAS')}
          </Link>
          <Link
            href="/collections"
            className="text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-thangka-gold/80"
          >
            {t('browseCollections', 'Browse collections')}
          </Link>
        </div>
      </div>
    </section>
  )
}
