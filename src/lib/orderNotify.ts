type PaymentIntentLike = {
  id?: string
  merchant_order_id?: string
  amount?: number
  currency?: string
  status?: string
}

export type AirwallexPaymentEvent = {
  id?: string
  name?: string
  data?: { object?: PaymentIntentLike }
}

function formatPaymentSuccessMessage(event: AirwallexPaymentEvent): string {
  const obj = event.data?.object ?? {}
  const orderRef = obj.merchant_order_id || obj.id || '—'
  const amt = obj.amount != null ? String(obj.amount) : '—'
  const cur = obj.currency || '—'
  const status = obj.status || 'SUCCEEDED'
  return [
    '【Thangka Shop】支付成功',
    `商户订单号: ${orderRef}`,
    `PaymentIntent: ${obj.id ?? '—'}`,
    `金额: ${amt} ${cur}`,
    `状态: ${status}`,
    `事件ID: ${event.id ?? '—'}`,
  ].join('\n')
}

function webhookBodyForProvider(url: string, text: string, summary: Record<string, unknown>): string {
  if (url.includes('discord.com/api/webhooks')) {
    return JSON.stringify({ content: text })
  }
  if (url.includes('hooks.slack.com')) {
    return JSON.stringify({ text })
  }
  if (url.includes('qyapi.weixin.qq.com')) {
    return JSON.stringify({ msgtype: 'text', text: { content: text } })
  }
  return JSON.stringify({
    source: 'thangka-shop',
    message: text,
    ...summary,
  })
}

/**
 * Fire-and-forget notifications (Telegram + optional HTTP webhook).
 */
export async function notifyPaymentSucceeded(event: AirwallexPaymentEvent): Promise<void> {
  const text = formatPaymentSuccessMessage(event)
  const obj = event.data?.object ?? {}
  const summary: Record<string, unknown> = {
    event: event.name,
    event_id: event.id,
    merchant_order_id: obj.merchant_order_id,
    payment_intent_id: obj.id,
    amount: obj.amount,
    currency: obj.currency,
  }

  const tasks: Promise<unknown>[] = []

  const hookUrl = process.env.ORDER_NOTIFY_WEBHOOK_URL?.trim()
  if (hookUrl) {
    tasks.push(
      fetch(hookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: webhookBodyForProvider(hookUrl, text, summary),
      }).catch(() => null)
    )
  }

  const tgToken = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const tgChat = process.env.TELEGRAM_CHAT_ID?.trim()
  if (tgToken && tgChat) {
    const url = `https://api.telegram.org/bot${tgToken}/sendMessage`
    tasks.push(
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChat,
          text: text.slice(0, 4096),
        }),
      }).catch(() => null)
    )
  }

  if (tasks.length > 0) {
    await Promise.allSettled(tasks)
  }
}
