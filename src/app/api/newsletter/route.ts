import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function mailchimpServerPrefix(apiKey: string): string | null {
  const dash = apiKey.lastIndexOf('-')
  if (dash === -1 || dash === apiKey.length - 1) return null
  const dc = apiKey.slice(dash + 1).trim()
  return dc ? dc : null
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function omnisendTags(): string[] {
  const base = ['thangka-shop', 'footer-newsletter']
  const extra =
    process.env.OMNISEND_TAGS?.split(',')
      .map((t) => t.trim())
      .filter(Boolean) ?? []
  const merged = [...base, ...extra]
  return merged.filter((t, i) => merged.indexOf(t) === i)
}

/**
 * @see https://api-docs.omnisend.com/v3/reference/post-contacts
 */
async function subscribeOmnisend(email: string): Promise<NextResponse> {
  const apiKey = process.env.OMNISEND_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json({ error: 'Omnisend not configured' }, { status: 500 })
  }

  const statusDate = new Date().toISOString()
  const res = await fetch('https://api.omnisend.com/v3/contacts', {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifiers: [
        {
          type: 'email',
          id: email,
          channels: {
            email: {
              status: 'subscribed',
              statusDate,
            },
          },
        },
      ],
      tags: omnisendTags(),
    }),
  })

  if (res.ok) {
    return NextResponse.json({ ok: true })
  }

  const raw = await res.text()
  let message = raw
  try {
    const j = JSON.parse(raw) as { error?: string; message?: string }
    message = j.error || j.message || raw
  } catch {
    /* keep raw */
  }
  const lower = message.toLowerCase()
  if (
    lower.includes('already') ||
    lower.includes('duplicate') ||
    (lower.includes('exist') && lower.includes('contact'))
  ) {
    return NextResponse.json({ ok: true, already: true })
  }

  return NextResponse.json(
    { error: message || 'Omnisend request failed' },
    { status: 502 }
  )
}

/**
 * POST { "email": "user@example.com" }
 * Priority: OMNISEND_API_KEY → Mailchimp → NEWSLETTER_WEBHOOK_URL.
 */
export async function POST(req: Request) {
  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (process.env.OMNISEND_API_KEY?.trim()) {
    return subscribeOmnisend(email)
  }

  const mcKey = process.env.MAILCHIMP_API_KEY?.trim()
  const mcList = process.env.MAILCHIMP_LIST_ID?.trim()
  if (mcKey && mcList) {
    const dc = mailchimpServerPrefix(mcKey)
    if (!dc) {
      return NextResponse.json({ error: 'Invalid Mailchimp API key format' }, { status: 500 })
    }
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${mcList}/members`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`key:${mcKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    })

    if (res.ok) {
      return NextResponse.json({ ok: true })
    }

    const err = (await res.json().catch(() => ({}))) as { title?: string; detail?: string }
    if (err.title === 'Member Exists') {
      return NextResponse.json({ ok: true, already: true })
    }
    return NextResponse.json(
      { error: err.detail || err.title || 'Mailchimp request failed' },
      { status: 502 }
    )
  }

  const hook = process.env.NEWSLETTER_WEBHOOK_URL?.trim()
  if (hook) {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'thangka-shop-newsletter',
        subscribed_at: new Date().toISOString(),
      }),
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'Newsletter webhook failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json(
    {
      error:
        'Newsletter not configured (set OMNISEND_API_KEY, or MAILCHIMP_* , or NEWSLETTER_WEBHOOK_URL)',
    },
    { status: 503 }
  )
}
