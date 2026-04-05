import Stripe from 'stripe'

export type StripeCheckoutResult = { url: string } | { error: string }

/**
 * Creates a Stripe Checkout Session (hosted page).
 * Aligns with https://docs.stripe.com/billing/quickstart — use Product + Price in Dashboard,
 * then set STRIPE_PRICE_LOOKUP_KEY or STRIPE_PRICE_ID.
 */
export async function createHostedCheckoutSession(opts: {
  successUrl: string
  cancelUrl: string
}): Promise<StripeCheckoutResult> {
  const secret = process.env.STRIPE_SECRET_KEY?.trim()
  if (!secret) {
    return { error: 'Stripe is not configured (missing STRIPE_SECRET_KEY).' }
  }

  const stripe = new Stripe(secret)
  const priceIdEnv = process.env.STRIPE_PRICE_ID?.trim()
  const lookupKey = process.env.STRIPE_PRICE_LOOKUP_KEY?.trim()

  let priceId = priceIdEnv || ''
  if (!priceId && lookupKey) {
    const prices = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1, active: true })
    priceId = prices.data[0]?.id || ''
  }

  if (!priceId) {
    return { error: 'Set STRIPE_PRICE_ID or STRIPE_PRICE_LOOKUP_KEY in the environment.' }
  }

  const modeEnv = process.env.STRIPE_CHECKOUT_MODE?.trim().toLowerCase()
  const mode: Stripe.Checkout.SessionCreateParams.Mode = modeEnv === 'payment' ? 'payment' : 'subscription'

  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    billing_address_collection: 'auto',
  })

  if (!session.url) {
    return { error: 'Stripe did not return a checkout URL.' }
  }

  return { url: session.url }
}
