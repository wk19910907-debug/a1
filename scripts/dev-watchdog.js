const { spawn } = require('node:child_process')
const http = require('node:http')

function resolvePort() {
  const args = process.argv.slice(2)
  const positional = args.find((arg) => /^\d+$/.test(arg))
  if (positional) {
    const parsed = Number(positional)
    if (Number.isFinite(parsed) && parsed >= 0) return parsed
  }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if ((arg === '-p' || arg === '--port') && args[i + 1]) {
      const parsed = Number(args[i + 1])
      if (Number.isFinite(parsed) && parsed >= 0) return parsed
    }
    if (arg.startsWith('--port=')) {
      const parsed = Number(arg.slice('--port='.length))
      if (Number.isFinite(parsed) && parsed >= 0) return parsed
    }
  }
  const envPort = Number(process.env.PORT)
  if (Number.isFinite(envPort) && envPort >= 0) return envPort
  // Align with README / doctor:dev — same port whether you run `npm run dev` or `dev:port`
  return 54352
}

const port = resolvePort()
const healthUrl = `http://127.0.0.1:${port}/`
const healthIntervalMs = 15000
const requestTimeoutMs = 4000

let child = null
let restarting = false
let consecutiveFailures = 0

function startDevServer() {
  const nodeCmd = process.execPath
  const nextBin = './node_modules/next/dist/bin/next'
  child = spawn(
    nodeCmd,
    [nextBin, 'dev', '-p', String(port)],
    { stdio: 'inherit', env: process.env }
  )

  child.on('exit', (code, signal) => {
    if (restarting) return
    console.log(`[watchdog] dev exited (code=${code}, signal=${signal}), restarting...`)
    restartDevServer()
  })
}

function stopDevServer() {
  return new Promise((resolve) => {
    if (!child || child.killed) return resolve()
    const pid = child.pid
    child.once('exit', () => resolve())
    try {
      process.kill(pid, 'SIGTERM')
    } catch {
      resolve()
    }
    setTimeout(() => {
      try {
        process.kill(pid, 'SIGKILL')
      } catch {}
      resolve()
    }, 3000)
  })
}

async function restartDevServer() {
  if (restarting) return
  restarting = true
  try {
    await stopDevServer()
  } finally {
    startDevServer()
    restarting = false
    consecutiveFailures = 0
  }
}

function healthCheck() {
  if (!child || child.killed || restarting) return

  const req = http.get(healthUrl, { timeout: requestTimeoutMs }, (res) => {
    res.resume()
    if (res.statusCode && res.statusCode < 500) {
      consecutiveFailures = 0
      return
    }
    consecutiveFailures += 1
  })

  req.on('timeout', () => {
    req.destroy(new Error('timeout'))
  })

  req.on('error', () => {
    consecutiveFailures += 1
    if (consecutiveFailures >= 2) {
      console.log(`[watchdog] health check failed ${consecutiveFailures} times, restarting dev server...`)
      restartDevServer()
    }
  })
}

function shutdown() {
  stopDevServer().finally(() => process.exit(0))
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

console.log(`[watchdog] starting Next dev on ${healthUrl}`)
startDevServer()
setInterval(healthCheck, healthIntervalMs)
