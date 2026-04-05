'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AirwallexCheckoutButton from '@/components/AirwallexCheckoutButton'
import StripeCheckoutButton from '@/components/StripeCheckoutButton'
import { useLanguage } from '@/contexts/LanguageContext'

export type PaymentFlowMethod = 'wechat' | 'airwallex' | 'stripe'

type Props = { method: PaymentFlowMethod }

export default function PaymentMethodFlowClient({ method }: Props) {
  const { locale, messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback
  const airwallexCountry =
    locale === 'zh' ? 'CN' : locale === 'ja' ? 'JP' : locale === 'de' ? 'DE' : locale === 'ko' ? 'KR' : 'US'

  const title: Record<PaymentFlowMethod, string> = {
    wechat: ui('wechatPay', 'WeChat Pay (QR Code)'),
    airwallex: ui('payWithAirwallex', 'Pay with Airwallex'),
    stripe: ui('payWithStripe', 'Pay with Stripe'),
  }

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-lg px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">
          {ui('paymentJumpEyebrow', 'Payment')}
        </p>
        <h1 className="mt-3 text-center font-serif text-2xl text-stone-900 sm:text-3xl">{title[method]}</h1>

        <div className="mt-8 rounded-xl border border-stone-200/90 bg-white p-6 shadow-thangka sm:p-8">
          {method === 'wechat' && (
            <div className="space-y-4">
              <p className="text-center text-sm leading-relaxed text-stone-600">
                {ui(
                  'paymentWechatDirectHint',
                  'Scan the QR code below in WeChat to complete your payment.',
                )}
              </p>
              <div className="overflow-hidden rounded-lg border border-emerald-700/25 bg-[#f6ffed] shadow-sm">
                <div className="bg-[#07c160] px-4 py-3 text-center text-sm font-semibold text-white">
                  {ui('wechatPay', 'WeChat Pay (QR Code)')}
                </div>
                <div className="flex flex-col items-center px-4 py-5">
                  <Image
                    src="/images/wechat-pay-qr.jpg"
                    alt={ui('wechatPay', 'WeChat Pay (QR Code)')}
                    width={280}
                    height={280}
                    className="h-auto max-w-full rounded-lg border border-stone-200 bg-white object-contain shadow-sm"
                  />
                  <p className="mt-3 max-w-xs text-center text-xs leading-relaxed text-stone-600">
                    {ui('wechatPayScanHint', 'Open WeChat, tap Scan, and point at the QR code to pay.')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {method === 'airwallex' && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-stone-600">{ui('airwallexHint', 'Secure checkout via Airwallex.')}</p>
              <p className="text-xs leading-relaxed text-stone-500">
                {ui(
                  'paymentAirwallexDirectHint',
                  'Tap the button to open Airwallex checkout. Allow pop-ups or redirects if your browser blocks them.',
                )}
              </p>
              <AirwallexCheckoutButton
                label={ui('payWithAirwallex', 'Pay with Airwallex')}
                countryCode={airwallexCountry}
                className="w-full rounded-lg bg-[#FF6100] px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#e55700] disabled:opacity-60"
              />
            </div>
          )}

          {method === 'stripe' && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-stone-600">
                {ui(
                  'stripeCheckoutHint',
                  'Secure payment on Stripe Checkout (hosted by Stripe). This site does not store your card details.',
                )}
              </p>
              <p className="text-xs leading-relaxed text-stone-500">
                {ui(
                  'paymentStripeDirectHint',
                  'Tap the button to open Stripe. For subscriptions, configure a Price and STRIPE_PRICE_LOOKUP_KEY per the Stripe Billing quickstart.',
                )}
              </p>
              <StripeCheckoutButton
                label={ui('payWithStripe', 'Pay with Stripe')}
                className="w-full rounded-lg bg-[#635bff] px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
              />
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/payment/" className="text-sm text-stone-600 transition hover:text-burgundy">
            ← {ui('paymentJumpBackToMethods', 'Back to payment options')}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
