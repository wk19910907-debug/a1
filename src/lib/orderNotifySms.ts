/**
 * 可选：通过 Twilio 发短信到 ORDER_NOTIFY_SMS_TO（需 E.164，如 +86138xxxxxxxx）。
 * 国内更常见是阿里云/腾讯云短信（要模板审核）；可另写 Serverless 再填 ORDER_NOTIFY_WEBHOOK_URL 触发。
 */
export async function sendPaymentSuccessSms(text: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim()
  const token = process.env.TWILIO_AUTH_TOKEN?.trim()
  const from = process.env.TWILIO_SMS_FROM?.trim()
  const to = process.env.ORDER_NOTIFY_SMS_TO?.trim()
  if (!sid || !token || !from || !to) return

  const body = new URLSearchParams()
  body.set('To', to)
  body.set('From', from)
  body.set('Body', text.slice(0, 1200))

  const auth = Buffer.from(`${sid}:${token}`).toString('base64')
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: body.toString(),
  })
  if (!res.ok) {
    await res.text().catch(() => '')
  }
}
