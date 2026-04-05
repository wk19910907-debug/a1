'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NewsletterSubscribe() {
  const { messages } = useLanguage()
  const ui = (key: string, fallback: string) => messages.ui?.[key] || fallback

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; already?: boolean }
      if (res.ok && data.ok) {
        setStatus('ok')
        setMessage(
          data.already
            ? ui('newsletterAlreadySubscribed', "You're already on the list.")
            : ui('newsletterThanks', 'Thanks — check your inbox to confirm if required.')
        )
        setEmail('')
        return
      }
      setStatus('err')
      setMessage(
        data.error ||
          ui('newsletterUnavailable', 'Subscription is not available yet. Please try again later.')
      )
    } catch {
      setStatus('err')
      setMessage(ui('newsletterNetworkError', 'Network error. Please try again.'))
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          {ui('emailLabel', 'E-Mail')}
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ui('newsletterPlaceholder', 'your@email.com')}
          className="min-h-[40px] flex-1 border border-[#8a8a8a]/40 bg-black/25 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#c9a227]/60 focus:outline-none focus:ring-1 focus:ring-[#c9a227]/40"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="min-h-[40px] shrink-0 border border-[#c9a227]/80 bg-[#c9a227]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#c9a227] transition hover:bg-[#c9a227]/25 disabled:opacity-50"
        >
          {status === 'loading'
            ? ui('newsletterSubmitting', '…')
            : ui('newsletterSubmit', 'Subscribe')}
        </button>
      </div>
      {message ? (
        <p
          className={`text-xs ${status === 'ok' ? 'text-emerald-300/90' : 'text-amber-200/90'}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}
