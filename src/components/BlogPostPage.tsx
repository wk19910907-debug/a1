'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import type { BlogPostMeta } from '@/lib/blogPosts'

export default function BlogPostPage({ post }: { post: BlogPostMeta }) {
  const { locale, messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback
  const title = locale === 'zh' ? post.titleZh : locale === 'de' ? post.titleDe : locale === 'ja' ? post.titleJa : post.titleEn
  const content = locale === 'zh' ? post.contentZh : locale === 'de' ? post.contentDe : locale === 'ja' ? post.contentJa : post.contentEn

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <Link href="/blogs/posts" className="text-sm text-stone-600 transition hover:text-burgundy">
          ← {ui('backToPosts', 'Back to Posts')}
        </Link>

        <article className="mt-8 rounded-xl border border-stone-200/90 bg-white px-6 py-10 shadow-thangka sm:px-10 sm:py-12">
          <h1 className="font-serif text-3xl font-normal leading-tight text-stone-900 lg:text-[2rem]">{title}</h1>
          <p className="mt-3 text-sm text-stone-500">{post.date}</p>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-stone-700">
            {content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </article>
      </div>
      <Footer />
    </main>
  )
}
