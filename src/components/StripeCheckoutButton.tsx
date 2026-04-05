'use client'

import { useState } from 'react'

type Props = {
  label: string
  className?: string
  /** Defaults to /api/stripe/checkout-session or NEXT_PUBLIC_STRIPE_CHECKOUT_API when set (static export). */
  apiUrl?: string
}

export default function StripeCheckoutButton({ label, className, apiUrl }: Props) {
  const endpoint =
    apiUrl ?? (process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_API?.trim() || '/api/stripe/checkout-session')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok) {
        setError(data.error || `Request failed (${res.status})`)
        return
      }
      if (data.url) {
        window.location.href = data.url
        return
      }
      setError('No checkout URL returned')
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className={className}
      >
        {loading ? '…' : label}
      </button>
      {error && <p className="text-center text-xs text-red-600">{error}</p>}
    </div>
  )
}
