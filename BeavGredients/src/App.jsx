import { useEffect, useState } from "react";

export default function App() {
  const [health, setHealth] = useState(null);
  const [echoResp, setEchoResp] = useState(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch((e) => setHealth({ ok: false, error: String(e) }));
  }, []);

  async function sendEcho() {
    const res = await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello backend!", time: Date.now() })
    });
    setEchoResp(await res.json());
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>React + Express (Vercel)</h1>

      <h2>GET /api/health</h2>
      <pre>{health ? JSON.stringify(health, null, 2) : "Loading..."}</pre>

      <h2>POST /api/echo</h2>
      <button onClick={sendEcho}>Send Echo</button>
      <pre>{echoResp ? JSON.stringify(echoResp, null, 2) : "Click the button"}</pre>
    </div>
  );
}
