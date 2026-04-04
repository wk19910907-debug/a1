'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RefundPolicyPage() {
  const { messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-stone-200/90 bg-white px-6 py-10 shadow-thangka sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{ui('legalEyebrow', 'Legal')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900">{ui('refundTitle', 'Refund Policy')}</h1>
          <div className="mt-8 space-y-4 leading-relaxed text-stone-600">
            <p>
              {ui(
                'refundP1',
                'We accept refund requests for damaged or incorrect items. Please contact support within 7 days after delivery with your order number and photos.'
              )}
            </p>
            <p>
              {ui(
                'refundP2',
                'Custom orders are generally non-refundable unless the item is defective. Shipping fees are non-refundable unless the return is due to our error.'
              )}
            </p>
            <p>
              {ui('refundP3Prefix', 'For help, contact us at')} <span className="font-medium text-thangka-gold">hello@thethangka.com</span>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
