import { NextResponse } from 'next/server'
import { verifyAirwallexWebhookSignature } from '@/lib/airwallex/verifyWebhookSignature'
import { notifyPaymentSucceeded, type AirwallexPaymentEvent } from '@/lib/orderNotify'

export const dynamic = 'force-dynamic'

/**
 * Airwallex → your site: subscribe to `payment_intent.succeeded` in the Airwallex dashboard.
 * Notification URL: https://<your-domain>/api/airwallex/webhook/
 * Env: AIRWALLEX_WEBHOOK_SECRET (from the same webhook subscription in Airwallex).
 */
export async function POST(req: Request) {
  const secret = process.env.AIRWALLEX_WEBHOOK_SECRET?.trim()
  if (!secret) {
    return NextResponse.json({ error: 'AIRWALLEX_WEBHOOK_SECRET not configured' }, { status: 503 })
  }

  const rawBody = await req.text()
  const timestamp = req.headers.get('x-timestamp') ?? ''
  const signature = req.headers.get('x-signature') ?? ''

  const ok = verifyAirwallexWebhookSignature({
    rawBody,
    timestamp,
    signature,
    secret,
  })
  if (!ok) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let event: AirwallexPaymentEvent
  try {
    event = JSON.parse(rawBody) as AirwallexPaymentEvent
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.name === 'payment_intent.succeeded') {
    await notifyPaymentSucceeded(event)
  }

  return NextResponse.json({ received: true })
}
