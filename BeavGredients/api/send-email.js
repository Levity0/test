import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Use POST" });
  }

  try {
    const { to, subject, message } = req.body ?? {};

    if (!to || !subject || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,   // your gmail
        pass: process.env.SMTP_PASS,   // your app password
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text: message,
    });

    return res.status(200).json({
      ok: true,
      messageId: info.messageId,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}