import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Use POST" });

  try {
    const { to, subject, message } = req.body ?? {};

    if (!to || !subject || !message) {
      return res.status(400).json({ ok: false, error: "Missing to/subject/message" });
    }

    // Basic safety: prevent huge payloads
    if (String(message).length > 5000) {
      return res.status(400).json({ ok: false, error: "Message too long" });
    }

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM, // e.g. "Your App <no-reply@yourdomain.com>"
      to,
      subject,
      text: message,
    });

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
}