'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  clearSession,
  getSessionEmail,
  registerAccount,
  setSessionEmail,
  verifySignIn,
} from '@/lib/accountClient'
import { getAuthLoginUrl, getAuthSignupUrl } from '@/lib/contact'

type Panel = 'home' | 'login' | 'register'

export default function AccountPage() {
  const { messages } = useLanguage()
  const t = (section: string, key: string, fallback: string) => messages?.[section]?.[key] || fallback
  const ui = (key: string, fallback: string) => messages?.ui?.[key] || fallback

  const externalLogin = getAuthLoginUrl()
  const externalSignup = getAuthSignupUrl()

  const [hydrated, setHydrated] = useState(false)
  const [sessionEmail, setSessionEmailState] = useState<string | null>(null)
  const [panel, setPanel] = useState<Panel>('home')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSessionEmailState(getSessionEmail())
    setHydrated(true)
  }, [])

  const signOut = () => {
    clearSession()
    setSessionEmailState(null)
    setPanel('home')
    setEmail('')
    setPassword('')
    setError(null)
  }

  const onLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError(ui('accountErrorRequired', 'Please fill in all fields.'))
      return
    }
    setBusy(true)
    try {
      const ok = await verifySignIn(email, password)
      if (!ok) {
        setError(ui('accountErrorInvalid', 'Incorrect email or password.'))
        return
      }
      setSessionEmail(email)
      setSessionEmailState(email.trim().toLowerCase())
      setPassword('')
      setPanel('home')
    } finally {
      setBusy(false)
    }
  }

  const onRegister = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError(ui('accountErrorRequired', 'Please fill in all fields.'))
      return
    }
    setBusy(true)
    try {
      const result = await registerAccount(email, password)
      if (result === 'exists') {
        setError(ui('accountErrorExists', 'An account with this email already exists.'))
        return
      }
      if (result === 'invalid') {
        setError(ui('accountErrorRequired', 'Please fill in all fields.'))
        return
      }
      setSessionEmail(email)
      setSessionEmailState(email.trim().toLowerCase())
      setPassword('')
      setPanel('home')
    } finally {
      setBusy(false)
    }
  }

  const showSignedIn = hydrated && sessionEmail

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-lg px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-thangka-gold">{ui('accountEyebrow', 'Account')}</p>
          <h1 className="mt-3 font-serif text-3xl text-stone-900 lg:text-4xl">{t('footer', 'myAccount', 'My Account')}</h1>
        </div>

        <div className="mt-10 rounded-xl border border-stone-200/90 bg-white px-6 py-10 text-center shadow-thangka sm:px-10">
          {!hydrated ? (
            <p className="text-sm text-stone-500">{ui('accountLoading', 'Loading…')}</p>
          ) : showSignedIn ? (
            <div className="space-y-6 text-left">
              <p className="text-stone-600">
                <span className="font-medium text-stone-800">{ui('accountWelcomeUser', 'Signed in as')}</span>{' '}
                <span className="text-stone-900">{sessionEmail}</span>
              </p>
              <p className="text-sm leading-relaxed text-stone-500">{ui('accountOrdersPlaceholder', 'Order history will appear here after checkout.')}</p>
              <button
                type="button"
                onClick={signOut}
                className="w-full rounded-sm border-2 border-stone-300 bg-transparent px-8 py-3 text-sm font-semibold text-stone-800 transition hover:border-thangka-gold hover:text-burgundy sm:w-auto"
              >
                {ui('accountSignOut', 'Sign out')}
              </button>
            </div>
          ) : panel === 'home' ? (
            <>
              <p className="text-stone-600">{ui('accountPrompt', 'Please log in to view your account')}</p>
              {(!externalLogin || !externalSignup) && (
                <p className="mt-3 text-xs leading-relaxed text-stone-400">
                  {ui(
                    'accountHintLocal',
                    'Sign-in or sign-up on this page stores data only in this browser (demo). Set NEXT_PUBLIC_AUTH_LOGIN_URL and NEXT_PUBLIC_AUTH_SIGNUP_URL to use your own auth pages.',
                  )}
                </p>
              )}
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                {externalLogin ? (
                  <a
                    href={externalLogin}
                    className="inline-flex items-center justify-center rounded-sm border-2 border-burgundy bg-burgundy px-8 py-3 text-sm font-semibold text-white transition hover:bg-burgundy-deep"
                  >
                    {t('header', 'login', 'Log in')}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setPanel('login')
                      setError(null)
                    }}
                    className="inline-flex items-center justify-center rounded-sm border-2 border-burgundy bg-burgundy px-8 py-3 text-sm font-semibold text-white transition hover:bg-burgundy-deep"
                  >
                    {t('header', 'login', 'Log in')}
                  </button>
                )}
                {externalSignup ? (
                  <a
                    href={externalSignup}
                    className="inline-flex items-center justify-center rounded-sm border-2 border-stone-300 bg-transparent px-8 py-3 text-sm font-semibold text-stone-800 transition hover:border-thangka-gold hover:text-burgundy"
                  >
                    {ui('createAccount', 'Create Account')}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setPanel('register')
                      setError(null)
                    }}
                    className="inline-flex items-center justify-center rounded-sm border-2 border-stone-300 bg-transparent px-8 py-3 text-sm font-semibold text-stone-800 transition hover:border-thangka-gold hover:text-burgundy"
                  >
                    {ui('createAccount', 'Create Account')}
                  </button>
                )}
              </div>
            </>
          ) : panel === 'login' ? (
            <form onSubmit={onLogin} className="space-y-4 text-left">
              <h2 className="text-center font-serif text-xl text-stone-900">{ui('accountSignInTitle', 'Log in')}</h2>
              {error && <p className="text-center text-sm text-red-600">{error}</p>}
              <label className="block">
                <span className="text-xs font-medium text-stone-500">{ui('accountEmailLabel', 'Email')}</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-thangka-gold focus:outline-none focus:ring-1 focus:ring-thangka-gold/40"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-stone-500">{ui('accountPasswordLabel', 'Password')}</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-thangka-gold focus:outline-none focus:ring-1 focus:ring-thangka-gold/40"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-sm border-2 border-burgundy bg-burgundy py-3 text-sm font-semibold text-white transition hover:bg-burgundy-deep disabled:opacity-60"
              >
                {busy ? ui('accountSubmitting', 'Please wait…') : ui('accountSubmitLogin', 'Log in')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPanel('home')
                  setError(null)
                }}
                className="w-full text-sm text-stone-500 underline-offset-2 hover:text-burgundy hover:underline"
              >
                {ui('accountBack', 'Back')}
              </button>
            </form>
          ) : (
            <form onSubmit={onRegister} className="space-y-4 text-left">
              <h2 className="text-center font-serif text-xl text-stone-900">{ui('accountRegisterTitle', 'Create account')}</h2>
              {error && <p className="text-center text-sm text-red-600">{error}</p>}
              <label className="block">
                <span className="text-xs font-medium text-stone-500">{ui('accountEmailLabel', 'Email')}</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-thangka-gold focus:outline-none focus:ring-1 focus:ring-thangka-gold/40"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-stone-500">{ui('accountPasswordLabel', 'Password')}</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-thangka-gold focus:outline-none focus:ring-1 focus:ring-thangka-gold/40"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-sm border-2 border-burgundy bg-burgundy py-3 text-sm font-semibold text-white transition hover:bg-burgundy-deep disabled:opacity-60"
              >
                {busy ? ui('accountSubmitting', 'Please wait…') : ui('accountSubmitRegister', 'Create account')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPanel('home')
                  setError(null)
                }}
                className="w-full text-sm text-stone-500 underline-offset-2 hover:text-burgundy hover:underline"
              >
                {ui('accountBack', 'Back')}
              </button>
            </form>
          )}
        </div>

        <p className="mt-8 text-center">
          <Link href="/" className="text-sm text-stone-600 transition hover:text-burgundy">
            ← {ui('backToHome', 'Back to Home')}
          </Link>
        </p>
      </div>
      <Footer />
    </main>
  )
}
