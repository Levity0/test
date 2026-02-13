import { useState } from "react";

export default function App() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Test email");
  const [message, setMessage] = useState("Hello from Vercel!");
  const [status, setStatus] = useState(null);

  async function sendEmail(e) {
    e.preventDefault();
    setStatus("Sending...");

    const r = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, message }),
    });

    const data = await r.json();
    setStatus(data.ok ? "✅ Sent!" : `❌ ${data.error || "Failed"}`);
  }

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Email Test</h1>

      <form onSubmit={sendEmail}>
        <label>
          To
          <input value={to} onChange={(e) => setTo(e.target.value)} type="email" required />
        </label>
        <br /><br />

        <label>
          Subject
          <input value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </label>
        <br /><br />

        <label>
          Message
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
        </label>
        <br /><br />

        <button type="submit">Send Email</button>
      </form>

      {status && <p>{status}</p>}
    </main>
  );
}