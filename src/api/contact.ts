import { Resend } from "resend"

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "")

const MIN_FILL_TIME_MS = 3000
const MAX_LINKS = 3
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const LINK_PATTERN = /https?:\/\/|www\./gi

// Kept in memory, so the limit is per running function instance rather than global
const attempts = new Map<string, number[]>()

const isRateLimited = (ip: string) => {
  const now = Date.now()
  for (const [key, times] of attempts) {
    if (times.every(time => now - time >= RATE_WINDOW_MS)) attempts.delete(key)
  }
  const recent = (attempts.get(ip) || []).filter(time => now - time < RATE_WINDOW_MS)
  recent.push(now)
  attempts.set(ip, recent)
  return recent.length > RATE_LIMIT
}

const passesTurnstile = async (token: string, ip: string) => {
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    })
    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error("Turnstile error:", error)
    return false
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Likely bots get a normal success response, so they have no signal to adapt to
  const elapsedMs = Number(req.body?.elapsedMs)
  if (clean(req.body?.contact_fax) || !(elapsedMs >= MIN_FILL_TIME_MS)) {
    return res.status(200).json({ ok: true })
  }

  const name = clean(req.body?.name)
  const email = clean(req.body?.email)
  const message = clean(req.body?.message)

  if (name.length < 3 || name.length > 200 || email.length > 320 || !isEmail(email) || !message || message.length > 5000) {
    return res.status(400).json({ error: "Invalid form data" })
  }

  if (name.search(LINK_PATTERN) !== -1 || (message.match(LINK_PATTERN) || []).length > MAX_LINKS) {
    return res.status(400).json({ error: `Please remove links from your name, and keep your message to ${MAX_LINKS} links or fewer.` })
  }

  const ip = String(req.headers["x-nf-client-connection-ip"] || req.headers["x-forwarded-for"] || req.ip || "unknown").split(",")[0].trim()

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages. Please try again later." })
  }

  if (process.env.TURNSTILE_SECRET_KEY && !(await passesTurnstile(clean(req.body?.turnstileToken), ip))) {
    return res.status(400).json({ error: "Please complete the verification and try again." })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set")
    return res.status(500).json({ error: "Email service is not configured" })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // Name and message are sent as plain text, and line breaks are stripped from the subject
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
    to: process.env.CONTACT_TO_EMAIL || "dukstack4@gmail.com",
    replyTo: email,
    subject: `Portfolio message from ${name.replace(/\s+/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    console.error("Resend error:", error.message)
    return res.status(502).json({ error: "Message could not be sent" })
  }

  return res.status(200).json({ ok: true })
}
