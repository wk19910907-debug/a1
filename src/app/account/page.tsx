'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AccountPage() {
  const { messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-lg px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{ui('accountEyebrow', 'Account')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900 lg:text-4xl">{t('footer', 'myAccount', 'My Account')}</h1>
        </div>

        <div className="mt-10 rounded-xl border border-stone-200/90 bg-white px-6 py-12 text-center shadow-thangka sm:px-10">
          <p className="text-stone-600">{ui('accountPrompt', 'Please log in to view your account')}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-sm border-2 border-burgundy bg-burgundy px-8 py-3 text-sm font-semibold text-white transition hover:bg-burgundy-deep"
            >
              {t('header', 'login', 'Log in')}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-sm border-2 border-stone-300 bg-transparent px-8 py-3 text-sm font-semibold text-stone-800 transition hover:border-thangka-gold hover:text-burgundy"
            >
              {ui('createAccount', 'Create Account')}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
