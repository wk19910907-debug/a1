'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PaymentPageClient() {
  const { messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-lg px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{ui('checkoutEyebrow', 'Checkout')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900">{ui('paymentTitle', 'Payment')}</h1>
        </div>

        <div className="mt-10 rounded-xl border border-stone-200/90 bg-white p-6 shadow-thangka sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-800">{ui('paymentMethod', 'Payment Method')}</h2>
          <p className="mt-2 text-xs leading-relaxed text-stone-500">{ui('airwallexHint', 'Pay with cards and local methods via Airwallex (Hosted Checkout).')}</p>
          <div className="mt-4">
            <Link
              href="/payment/airwallex/"
              className="block w-full rounded-lg bg-[#FF6100] px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#e55700]"
            >
              {ui('payWithAirwallex', 'Pay with Airwallex')}
            </Link>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-white px-3 text-stone-400">{ui('otherPaymentMethods', 'Other options')}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/payment/stripe/"
              className="block rounded-lg bg-[#635bff] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
            >
              {ui('payWithStripe', 'Pay with Stripe (Credit Card)')}
            </Link>
            <Link
              href="/payment/paypal/"
              className="block rounded-lg bg-[#0070ba] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
            >
              {ui('payWithPayPal', 'Pay with PayPal')}
            </Link>
            <Link
              href="/payment/wechat/"
              className="block rounded-lg bg-[#07c160] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
            >
              {ui('wechatPay', 'WeChat Pay (QR Code)')}
            </Link>
            <Link
              href="/payment/alipay/"
              className="block rounded-lg bg-[#1677ff] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
            >
              {ui('alipay', 'Alipay (QR Code)')}
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-stone-200/90 bg-thangka-parchment-deep p-6 shadow-sm sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-thangka-gold">{ui('contactSupport', 'Contact Support')}</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {ui('paymentSupportText', 'For payment issues, contact support via WeChat or email.')}
            <br />
            WeChat: thangka-shop
            <br />
            Email: order@thethangka.com
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-stone-600 transition hover:text-burgundy">
            ← {ui('backToHome', 'Back to Home')}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
