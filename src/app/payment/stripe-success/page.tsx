import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default function StripeSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={0} />
      <div className="mx-auto max-w-lg px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-stone-200/90 bg-white p-8 text-center shadow-thangka">
          <h1 className="font-serif text-2xl text-stone-900">Thank you</h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Your Stripe checkout completed. You should receive a confirmation from Stripe by email.
          </p>
          {sessionId && (
            <p className="mt-4 break-all text-xs text-stone-400">
              Session: {sessionId}
            </p>
          )}
          <Link
            href="/"
            className="mt-8 inline-block text-sm font-medium text-burgundy hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
