import { Resend } from "resend"

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "")

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const name = clean(req.body?.name)
  const email = clean(req.body?.email)
  const message = clean(req.body?.message)

  if (name.length < 3 || name.length > 200 || email.length > 320 || !isEmail(email) || !message || message.length > 5000) {
    return res.status(400).json({ error: "Invalid form data" })
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
