import { NextResponse } from 'next/server'
import { createHostedCheckoutSession } from '@/lib/stripeCheckout'

export const dynamic = 'force-dynamic'

function publicBaseUrl(request: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '')
  if (env) return env
  return new URL(request.url).origin
}

export async function POST(request: Request) {
  const base = publicBaseUrl(request)
  const result = await createHostedCheckoutSession({
    successUrl: `${base}/payment/stripe-success/?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${base}/payment/`,
  })

  if ('error' in result && result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ url: (result as { url: string }).url })
}
