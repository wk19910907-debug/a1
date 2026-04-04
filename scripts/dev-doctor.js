const http = require('node:http')

function resolvePort() {
  const args = process.argv.slice(2)
  const positional = args.find((arg) => /^\d+$/.test(arg))
  if (positional) return Number(positional)

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if ((arg === '-p' || arg === '--port') && args[i + 1]) return Number(args[i + 1])
    if (arg.startsWith('--port=')) return Number(arg.slice('--port='.length))
  }
  const envPort = Number(process.env.PORT)
  if (Number.isFinite(envPort) && envPort > 0) return envPort
  return 54352
}

function checkUrl(url, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      res.resume()
      resolve({ ok: res.statusCode >= 200 && res.statusCode < 500, statusCode: res.statusCode })
    })

    req.on('timeout', () => req.destroy(new Error('timeout')))
    req.on('error', (error) => resolve({ ok: false, error: error.message }))
  })
}

async function main() {
  const port = resolvePort()
  if (!Number.isFinite(port) || port <= 0) {
    console.error('[doctor] invalid port. Use e.g. npm run doctor:dev -- -p 54352')
    process.exit(1)
  }

  const url = `http://127.0.0.1:${port}/`
  console.log(`[doctor] checking ${url}`)
  const result = await checkUrl(url)

  if (result.ok) {
    console.log(`[doctor] OK: server reachable (status ${result.statusCode}).`)
    process.exit(0)
  }

  console.error(`[doctor] FAIL: cannot reach ${url}. ${result.error ? `Error: ${result.error}` : ''}`.trim())
  console.error('[doctor] Fix steps:')
  console.error(`[doctor] 1) Start dev server: npm run dev -- -p ${port}`)
  console.error('[doctor] 2) If port occupied: netstat -ano | findstr :<port> then taskkill /PID <pid> /F')
  process.exit(1)
}

main()
