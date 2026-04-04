import { randomUUID } from 'crypto'

const BASE = {
  demo: 'https://api-demo.airwallex.com',
  prod: 'https://api.airwallex.com',
} as const

export type CreateIntentInput = {
  amount?: number
  currency?: string
  merchant_order_id?: string
}

export type CreateIntentResult = {
  id: string
  client_secret: string
  currency: string
}

/**
 * Server-only: creates an Airwallex Payment Intent (空中云汇).
 * Amount is in the smallest currency unit (e.g. USD cents).
 */
export async function createAirwallexPaymentIntent(input: CreateIntentInput = {}): Promise<CreateIntentResult> {
  const clientId = process.env.AIRWALLEX_CLIENT_ID
  const apiKey = process.env.AIRWALLEX_API_KEY
  if (!clientId || !apiKey) {
    throw new Error('Missing AIRWALLEX_CLIENT_ID or AIRWALLEX_API_KEY')
  }

  const mode = process.env.AIRWALLEX_ENV === 'prod' ? 'prod' : 'demo'
  const baseUrl = BASE[mode]

  const loginRes = await fetch(`${baseUrl}/api/v1/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': clientId,
      'x-api-key': apiKey,
    },
  })

  const loginJson = (await loginRes.json()) as { token?: string; message?: string }
  if (!loginRes.ok || !loginJson.token) {
    throw new Error(loginJson.message || 'Airwallex authentication failed')
  }

  const currency = (input.currency || process.env.AIRWALLEX_DEFAULT_CURRENCY || 'USD').toUpperCase()
  const amount =
    typeof input.amount === 'number' && Number.isFinite(input.amount)
      ? Math.round(input.amount)
      : Number.parseInt(process.env.AIRWALLEX_DEFAULT_AMOUNT_MINOR || '100', 10)

  const createRes = await fetch(`${baseUrl}/api/v1/pa/payment_intents/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginJson.token}`,
    },
    body: JSON.stringify({
      request_id: randomUUID(),
      merchant_order_id: input.merchant_order_id || `thangka-${Date.now()}`,
      amount,
      currency,
    }),
  })

  const intent = (await createRes.json()) as {
    id?: string
    client_secret?: string
    currency?: string
    message?: string
    code?: string
  }

  if (!createRes.ok || !intent.id || !intent.client_secret) {
    throw new Error(intent.message || intent.code || 'Airwallex payment intent creation failed')
  }

  return {
    id: intent.id,
    client_secret: intent.client_secret,
    currency: intent.currency || currency,
  }
}
