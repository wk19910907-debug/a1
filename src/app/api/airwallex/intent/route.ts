import { NextResponse } from 'next/server'
import { createAirwallexPaymentIntent } from '@/lib/airwallex/createPaymentIntent'

export const dynamic = 'force-dynamic'

/**
 * Creates a Payment Intent for Hosted Payment Page (HPP).
 * Requires AIRWALLEX_CLIENT_ID + AIRWALLEX_API_KEY (server env, never expose to the browser).
 *
 * Note: `output: 'export'` static builds do not ship API routes — set NEXT_PUBLIC_AIRWALLEX_INTENT_API
 * to your own backend (e.g. Vercel/Cloudflare Worker) or disable static export for this app.
 */
export async function POST(req: Request) {
  try {
    let body: { amount?: number; currency?: string; merchant_order_id?: string } = {}
    try {
      body = await req.json()
    } catch {
      /* empty body ok */
    }
    const result = await createAirwallexPaymentIntent(body)
    return NextResponse.json(result)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    const status = message.includes('Missing AIRWALLEX') ? 503 : 502
    return NextResponse.json({ error: message }, { status })
  }
}
