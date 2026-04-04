/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'thangka-dark': '#1a1a1a',
        'thangka-gold': '#c9a227',
        'thangka-gold-bright': '#d4af37',
        'thangka-brown': '#4a3f35',
        'thangka-cream': '#f3eee6',
        'thangka-parchment': '#f3eee6',
        'thangka-parchment-deep': '#ebe6dc',
        burgundy: {
          DEFAULT: '#8b0000',
          deep: '#5c0000',
          darker: '#4a0000',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        thangka: '0 4px 24px -4px rgba(28, 25, 23, 0.12), 0 0 0 1px rgba(28, 25, 23, 0.06)',
        'thangka-lg': '0 12px 40px -8px rgba(28, 25, 23, 0.15), 0 0 0 1px rgba(28, 25, 23, 0.05)',
      },
    },
  },
  plugins: [],
}
