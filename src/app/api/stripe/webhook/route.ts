import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Stripe → your app. Subscribe in Dashboard to subscription / checkout events.
 * @see https://docs.stripe.com/billing/quickstart (webhook section)
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim()
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!secret || !whSecret) {
    return new NextResponse('Stripe webhook not configured', { status: 500 })
  }

  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  if (!sig) {
    return new NextResponse('Missing stripe-signature', { status: 400 })
  }

  const stripe = new Stripe(secret)
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, whSecret)
  } catch {
    return new NextResponse('Invalid signature', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'invoice.paid':
    case 'invoice.payment_failed':
      // Extend: grant access, send email, call ORDER_NOTIFY_WEBHOOK_URL, etc.
      break
    default:
      break
  }

  return NextResponse.json({ received: true })
}
