/**
 * Client-safe contact (NEXT_PUBLIC_* are inlined at build time).
 * Override in .env; fallbacks come from messages (en/zh) in components.
 */
export function getPublicContact() {
  const phone = (process.env.NEXT_PUBLIC_SITE_PHONE ?? '').trim()
  const email = (process.env.NEXT_PUBLIC_SITE_EMAIL ?? '').trim()
  const email2 = (process.env.NEXT_PUBLIC_SITE_EMAIL_2 ?? '').trim()
  return {
    phone: phone || null,
    email: email || null,
    email2: email2 || null,
  }
}

export function getResolvedContact(fallbackPhone: string, fallbackEmail: string) {
  const c = getPublicContact()
  return {
    phone: c.phone ?? fallbackPhone,
    email: c.email ?? fallbackEmail,
  }
}

/** Second inbox (e.g. Gmail); optional env overrides i18n fallback. */
export function getResolvedSecondEmail(fallbackEmail2: string): string | null {
  const c = getPublicContact()
  if (c.email2) return c.email2
  const f = fallbackEmail2.trim()
  return f || null
}

export function getAuthLoginUrl(): string | null {
  const u = (process.env.NEXT_PUBLIC_AUTH_LOGIN_URL ?? '').trim()
  return u || null
}

export function getAuthSignupUrl(): string | null {
  const u = (process.env.NEXT_PUBLIC_AUTH_SIGNUP_URL ?? '').trim()
  return u || null
}
