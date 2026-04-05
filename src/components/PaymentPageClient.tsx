'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { getResolvedContact, getResolvedSecondEmail } from '@/lib/contact'

export default function PaymentPageClient() {
  const { messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback

  const contact = getResolvedContact(
    ui('footerPhoneValue', '+86 18251815459'),
    ui('footerEmailValue', '1241272568@qq.com'),
  )
  const email2 = getResolvedSecondEmail(ui('footerEmailValue2', 'wk199109070@gmail.com'))
  const telDigits = contact.phone.replace(/[^\d+]/g, '')
  const telHref = telDigits ? `tel:${telDigits}` : null

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
          <p className="mt-2 text-xs leading-relaxed text-stone-500">
            {ui(
              'paymentMethodsIntro',
              'Pay with Airwallex or Stripe (cards), or scan the WeChat Pay QR code.',
            )}
          </p>
          <div className="mt-4 space-y-3">
            <Link
              href="/payment/airwallex/"
              className="block w-full rounded-lg bg-[#FF6100] px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#e55700]"
            >
              {ui('payWithAirwallex', 'Pay with Airwallex')}
            </Link>
            <Link
              href="/payment/stripe/"
              className="block w-full rounded-lg bg-[#635bff] px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              {ui('payWithStripe', 'Pay with Stripe')}
            </Link>
            <Link
              href="/payment/wechat/"
              className="block w-full rounded-lg bg-[#07c160] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
            >
              {ui('wechatPay', 'WeChat Pay (QR Code)')}
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-stone-200/90 bg-thangka-parchment-deep p-6 shadow-sm sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-thangka-gold">{ui('contactSupport', 'Contact Support')}</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{ui('paymentSupportText', 'For payment questions, contact us by phone or email.')}</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            <li>
              {ui('phoneLabel', 'Phone')}:{' '}
              {telHref ? (
                <a href={telHref} className="text-burgundy hover:underline">
                  {contact.phone}
                </a>
              ) : (
                contact.phone
              )}
            </li>
            <li className="break-all">
              {ui('emailLabel', 'E-Mail')}:{' '}
              <a href={`mailto:${contact.email}`} className="text-burgundy hover:underline">
                {contact.email}
              </a>
            </li>
            {email2 && (
              <li className="break-all">
                {ui('emailLabelAlt', 'E-Mail (2)')}:{' '}
                <a href={`mailto:${email2}`} className="text-burgundy hover:underline">
                  {email2}
                </a>
              </li>
            )}
          </ul>
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
