import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Airwallex webhook HMAC: SHA256(secret, x-timestamp + rawBody) as hex, compare to x-signature.
 * @see https://www.airwallex.com/docs/developer-tools__listen-for-webhook-events
 */
export function verifyAirwallexWebhookSignature(params: {
  rawBody: string
  timestamp: string
  signature: string
  secret: string
}): boolean {
  const { rawBody, timestamp, signature, secret } = params
  if (!signature || !timestamp || !secret) return false
  const valueToDigest = timestamp + rawBody
  const expectedHex = createHmac('sha256', secret).update(valueToDigest, 'utf8').digest('hex')
  try {
    const a = Buffer.from(signature, 'utf8')
    const b = Buffer.from(expectedHex, 'utf8')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}
