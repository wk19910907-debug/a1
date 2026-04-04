import { notFound } from 'next/navigation'
import PaymentMethodFlowClient, { type PaymentFlowMethod } from '@/components/PaymentMethodFlowClient'

const METHODS: PaymentFlowMethod[] = ['wechat', 'alipay', 'stripe', 'paypal', 'airwallex']

function isMethod(s: string): s is PaymentFlowMethod {
  return (METHODS as string[]).includes(s)
}

export function generateStaticParams() {
  return METHODS.map((method) => ({ method }))
}

export default function PaymentMethodPage({ params }: { params: { method: string } }) {
  if (!isMethod(params.method)) notFound()
  return <PaymentMethodFlowClient method={params.method} />
}
