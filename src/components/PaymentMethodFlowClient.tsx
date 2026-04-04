'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AirwallexCheckoutButton from '@/components/AirwallexCheckoutButton'
import { useLanguage } from '@/contexts/LanguageContext'

const STRIPE_URL = 'https://buy.stripe.com/test_example'
const PAYPAL_URL = 'https://www.paypal.com/paypalme/example'

export type PaymentFlowMethod = 'wechat' | 'alipay' | 'stripe' | 'paypal' | 'airwallex'

type Props = { method: PaymentFlowMethod }

export default function PaymentMethodFlowClient({ method }: Props) {
  const { locale, messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback
  const [step, setStep] = useState<0 | 1>(0)
  const airwallexCountry =
    locale === 'zh' ? 'CN' : locale === 'ja' ? 'JP' : locale === 'de' ? 'DE' : locale === 'ko' ? 'KR' : 'US'

  const title: Record<PaymentFlowMethod, string> = {
    wechat: ui('wechatPay', 'WeChat Pay (QR Code)'),
    alipay: ui('alipay', 'Alipay (QR Code)'),
    stripe: ui('payWithStripe', 'Pay with Stripe (Credit Card)'),
    paypal: ui('payWithPayPal', 'Pay with PayPal'),
    airwallex: ui('payWithAirwallex', 'Pay with Airwallex'),
  }

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-lg px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">
          {ui('paymentJumpEyebrow', 'Payment')}
        </p>
        <h1 className="mt-3 text-center font-serif text-2xl text-stone-900 sm:text-3xl">{title[method]}</h1>
        <p className="mt-2 text-center text-xs text-stone-500">
          {step === 0
            ? ui('paymentJumpStepLabel', 'Step 1 of 2')
            : ui('paymentJumpStepLabel2', 'Step 2 of 2')}
        </p>

        <div className="mt-8 rounded-xl border border-stone-200/90 bg-white p-6 shadow-thangka sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              {method === 'wechat' && (
                <p className="text-sm leading-relaxed text-stone-600">
                  {ui(
                    'paymentJumpWechatStep1',
                    'You will see the WeChat Pay collection QR code on the next screen. Please complete the transfer in WeChat after scanning.',
                  )}
                </p>
              )}
              {method === 'alipay' && (
                <p className="text-sm leading-relaxed text-stone-600">
                  {ui(
                    'paymentJumpAlipayStep1',
                    'The next screen explains how to pay with Alipay. If no QR code is configured yet, contact support for the Alipay collection code.',
                  )}
                </p>
              )}
              {(method === 'stripe' || method === 'paypal') && (
                <p className="text-sm leading-relaxed text-stone-600">
                  {ui(
                    'paymentJumpExternalStep1',
                    'You will open a secure payment page run by a third-party provider. This site does not store your card details.',
                  )}
                </p>
              )}
              {method === 'airwallex' && (
                <>
                  <p className="text-sm leading-relaxed text-stone-600">{ui('airwallexHint', 'Secure checkout via Airwallex.')}</p>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {ui(
                      'paymentJumpAirwallexStep1',
                      'On the next step you will start Airwallex checkout. Make sure pop-ups are allowed if your browser blocks redirects.',
                    )}
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full rounded-lg bg-burgundy px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                {ui('paymentJumpNext', 'Next')}
              </button>
            </div>
          )}

          {step === 1 && method === 'wechat' && (
            <div className="space-y-4">
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
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                {ui('paymentJumpPrevious', 'Back')}
              </button>
            </div>
          )}

          {step === 1 && method === 'alipay' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-200 bg-[#e6f4ff] p-5 text-center">
                <p className="text-sm leading-relaxed text-stone-700">
                  {ui('paymentAlipayPlaceholder', 'Alipay collection QR is not configured on this page yet. Please contact support for payment details.')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                {ui('paymentJumpPrevious', 'Back')}
              </button>
            </div>
          )}

          {step === 1 && method === 'stripe' && (
            <div className="space-y-4">
              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-[#635bff] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
              >
                {ui('paymentJumpOpenPayment', 'Open payment page')}
              </a>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                {ui('paymentJumpPrevious', 'Back')}
              </button>
            </div>
          )}

          {step === 1 && method === 'paypal' && (
            <div className="space-y-4">
              <a
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-[#0070ba] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
              >
                {ui('paymentJumpOpenPayment', 'Open payment page')}
              </a>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                {ui('paymentJumpPrevious', 'Back')}
              </button>
            </div>
          )}

          {step === 1 && method === 'airwallex' && (
            <div className="space-y-4">
              <AirwallexCheckoutButton
                label={ui('payWithAirwallex', 'Pay with Airwallex')}
                countryCode={airwallexCountry}
                className="w-full rounded-lg bg-[#FF6100] px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#e55700] disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                {ui('paymentJumpPrevious', 'Back')}
              </button>
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
