'use client'

import { useState } from 'react'
import { init } from '@airwallex/components-sdk'

type AirwallexCheckoutButtonProps = {
  label: string
  className?: string
  /** ISO 3166-1 alpha-2, e.g. US, CN, DE */
  countryCode?: string
  successPath?: string
}

/**
 * 空中云汇 Airwallex — Hosted Payment Page via @airwallex/components-sdk.
 *
 * Env (browser): NEXT_PUBLIC_AIRWALLEX_CLIENT_ID, NEXT_PUBLIC_AIRWALLEX_ENV (demo|prod)
 * Intent API: defaults to same-origin POST /api/airwallex/intent, or set NEXT_PUBLIC_AIRWALLEX_INTENT_API (full URL) for static hosting.
 */
export default function AirwallexCheckoutButton({
  label,
  className,
  countryCode = 'US',
  successPath = '/payment/',
}: AirwallexCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clientId = process.env.NEXT_PUBLIC_AIRWALLEX_CLIENT_ID
  const env = process.env.NEXT_PUBLIC_AIRWALLEX_ENV === 'prod' ? 'prod' : 'demo'
  const intentApi = process.env.NEXT_PUBLIC_AIRWALLEX_INTENT_API?.trim() || '/api/airwallex/intent'

  async function handleClick() {
    setError(null)
    if (!clientId) {
      setError('Configure NEXT_PUBLIC_AIRWALLEX_CLIENT_ID (Airwallex Web App client id).')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(intentApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = (await res.json()) as { error?: string; id?: string; client_secret?: string; currency?: string }
      if (!res.ok) {
        throw new Error(data.error || `Intent API failed (${res.status})`)
      }
      if (!data.id || !data.client_secret || !data.currency) {
        throw new Error('Invalid intent response')
      }

      const { payments } = await init({
        env,
        clientId,
        enabledElements: ['payments'],
      })

      if (!payments?.redirectToCheckout) {
        throw new Error('Airwallex SDK did not load payments module')
      }

      const origin = window.location.origin
      payments.redirectToCheckout({
        intent_id: data.id,
        client_secret: data.client_secret,
        currency: data.currency,
        country_code: countryCode,
        successUrl: `${origin}${successPath.startsWith('/') ? successPath : `/${successPath}`}?status=success`,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {loading ? '…' : label}
      </button>
      {error ? <p className="mt-2 text-left text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
