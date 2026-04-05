'use client'

import Script from 'next/script'

/**
 * GA4: set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX).
 * Chat: set NEXT_PUBLIC_CHAT_SCRIPT_URL to a single script src (Tidio: //code.tidio.co/xxxx.js).
 */
export default function SiteIntegrations() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  const chatSrc = process.env.NEXT_PUBLIC_CHAT_SCRIPT_URL?.trim()

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="site-ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {chatSrc ? <Script src={chatSrc} strategy="lazyOnload" /> : null}
    </>
  )
}
