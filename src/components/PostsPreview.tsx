'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const posts = [
  {
    title: 'The Four Harmonious Friends',
    excerpt: 'One of the most beloved symbols in Tibetan Buddhist art, showing harmony and respect.',
    href: '/blogs/posts/the-four-harmonious-friends',
  },
  {
    title: 'How to Choose the Right Thangka for Meditation',
    excerpt: 'A practical guide to selecting meaningful thangka paintings for daily meditation.',
    href: '/blogs/posts/how-to-choose-the-right-thangka-for-meditation',
  },
  {
    title: 'Why TheThangka.com is the Best Place to Buy Authentic Thangkas',
    excerpt: 'How traditional methods and artisan support shape quality and authenticity.',
    href: '/blogs/posts/why-thethangka-com-is-the-best-place-to-buy-authentic-thangkas',
  },
]

export default function PostsPreview() {
  const { locale, messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback
  const localizedPosts: Record<string, { title: string; excerpt: string }[]> = {
    en: posts.map((p) => ({ title: p.title, excerpt: p.excerpt })),
    de: [
      {
        title: 'Die vier harmonischen Freunde',
        excerpt: 'Ein beliebtes Symbol in der tibetisch-buddhistischen Kunst fur Harmonie und Respekt.',
      },
      {
        title: 'So wahlen Sie die richtige Thangka fur Meditation',
        excerpt: 'Ein praktischer Leitfaden fur die Auswahl bedeutungsvoller Thangka-Gemalde.',
      },
      {
        title: 'Warum TheThangka.com authentische Thangkas bietet',
        excerpt: 'Wie traditionelle Methoden und die Unterstutzung von Kunstlern Qualitat schaffen.',
      },
    ],
    zh: [
      { title: '四和合', excerpt: '藏传佛教艺术中最受喜爱的象征之一，代表和谐与尊重。' },
      { title: '如何选择适合冥想的唐卡', excerpt: '一份实用指南，帮助你选择适合日常修行的唐卡。' },
      { title: '为什么 TheThangka.com 更值得购买', excerpt: '传统工艺与手艺人支持，带来更高品质与真实度。' },
    ],
  }
  const currentPosts = localizedPosts[locale] || localizedPosts.en

  return (
    <section className="border-t border-stone-200/90 bg-[#f8f6f2] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-stone-900 lg:text-[2rem]">
              {t('postsPreview', 'title', 'Posts')}
            </h2>
            <p className="mt-2 max-w-md text-sm text-stone-600">
              {t('postsPreview', 'subtitle', 'Guides and stories behind Tibetan sacred art.')}
            </p>
          </div>
          <Link
            href="/blogs/posts"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy transition hover:text-thangka-gold"
          >
            {t('home', 'viewAll', 'View all')}
            <ArrowUpRight size={16} className="opacity-80" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col rounded-xl border border-stone-200/90 bg-white p-6 shadow-sm transition duration-200 hover:border-thangka-gold/35 hover:shadow-thangka"
            >
              <h3 className="font-serif text-lg leading-snug text-stone-900 transition group-hover:text-burgundy">
                {currentPosts[index]?.title || post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{currentPosts[index]?.excerpt || post.excerpt}</p>
              <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-thangka-gold">
                {t('postsPreview', 'readMore', 'Read article')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
