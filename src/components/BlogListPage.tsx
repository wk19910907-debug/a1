'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { blogPosts } from '@/lib/blogPosts'

export default function BlogListPage() {
  const { locale, messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback

  const localized = blogPosts.map((p) => ({
    ...p,
    title: locale === 'zh' ? p.titleZh : locale === 'de' ? p.titleDe : locale === 'ja' ? p.titleJa : p.titleEn,
    excerpt: locale === 'zh' ? p.excerptZh : locale === 'de' ? p.excerptDe : locale === 'ja' ? p.excerptJa : p.excerptEn,
  }))

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{ui('journalEyebrow', 'Journal')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900 lg:text-4xl">{ui('postsTitle', 'Posts')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600">
            {ui('postsIntro', 'Learn about Tibetan Buddhist art, meditation, and the sacred tradition of Thangka painting.')}
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {localized.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/posts/${post.slug}`}
              className="group block rounded-xl border border-stone-200/90 bg-white p-6 shadow-thangka transition duration-200 hover:border-thangka-gold/35 hover:shadow-thangka-lg sm:p-8"
            >
              <p className="text-xs uppercase tracking-wider text-stone-400">{post.date}</p>
              <h2 className="mt-2 font-serif text-xl text-stone-900 transition group-hover:text-burgundy">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-thangka-gold">
                {ui('readMore', 'Read more')}
                <span className="ml-1" aria-hidden>
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
