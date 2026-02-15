import { useState } from "react";

function EmailForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Test Email");
  const [message, setMessage] = useState("Hello from Vercel!");
  const [status, setStatus] = useState("");

  async function sendEmail(e) {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, message }),
    });

    const data = await res.json();
    setStatus(data.ok ? "✅ Email sent!" : "❌ " + data.error);
  }

  return (
    <form onSubmit={sendEmail}>
      <h2>Send Email</h2>

      <label>Email To:</label><br />
      <input value={to} onChange={(e) => setTo(e.target.value)} required /><br /><br />

      <label>Subject:</label><br />
      <input value={subject} onChange={(e) => setSubject(e.target.value)} required /><br /><br />

      <label>Message:</label><br />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} /><br /><br />

      <button type="submit">Send Email</button>

      <p>{status}</p>
    </form>
  );
}

export default EmailForm;