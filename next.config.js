const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // Vercel sets VERCEL=1 during build — use .next output and ship API routes (no static export).
  const isVercel = process.env.VERCEL === '1'
  const useStaticExport = !isDev && !isVercel

  return {
    // Keep dev artifacts in the default .next folder to avoid missing dist/server manifests.
    distDir: isDev || isVercel ? '.next' : 'dist',
    ...(useStaticExport ? { output: 'export' } : {}),
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  }
}
