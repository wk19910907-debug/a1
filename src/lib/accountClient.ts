const ACCOUNTS_KEY = 'thangka-shop-accounts-v1'
const SESSION_KEY = 'thangka-shop-session-v1'

type AccountMap = Record<string, string>

function loadAccounts(): AccountMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as AccountMap) : {}
  } catch {
    return {}
  }
}

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder().encode(password)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function registerAccount(email: string, password: string): Promise<'ok' | 'exists' | 'invalid'> {
  const key = email.trim().toLowerCase()
  if (!key || !password) return 'invalid'
  const accounts = loadAccounts()
  if (accounts[key]) return 'exists'
  accounts[key] = await hashPassword(password)
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  return 'ok'
}

export async function verifySignIn(email: string, password: string): Promise<boolean> {
  const key = email.trim().toLowerCase()
  const accounts = loadAccounts()
  const expected = accounts[key]
  if (!expected) return false
  const h = await hashPassword(password)
  return h === expected
}

export function getSessionEmail(): string | null {
  if (typeof window === 'undefined') return null
  const v = localStorage.getItem(SESSION_KEY)
  return v ? v.trim().toLowerCase() : null
}

export function setSessionEmail(email: string) {
  localStorage.setItem(SESSION_KEY, email.trim().toLowerCase())
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
