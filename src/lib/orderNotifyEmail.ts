import nodemailer from 'nodemailer'

/**
 * QQ 邮箱：网页邮箱 → 设置 → 账户 → 开启 SMTP，生成「授权码」填 SMTP_PASS（不是 QQ 登录密码）。
 */
export async function sendPaymentSuccessEmail(subject: string, text: string): Promise<void> {
  const to = process.env.ORDER_NOTIFY_EMAIL_TO?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  if (!to || !user || !pass) return

  const host = process.env.SMTP_HOST?.trim() || 'smtp.qq.com'
  const port = Number.parseInt(process.env.SMTP_PORT?.trim() || '465', 10)
  const secure = process.env.SMTP_SECURE !== '0' && process.env.SMTP_SECURE !== 'false'

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })

  const from = process.env.SMTP_FROM?.trim() || user

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  })
}
