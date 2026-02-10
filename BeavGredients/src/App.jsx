import { useEffect, useState } from "react";

export default function App() {
  const [health, setHealth] = useState(null);
  const [echo, setEcho] = useState(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth);
  }, []);

  async function sendEcho() {
    const res = await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "test" })
    });
    setEcho(await res.json());
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>React + Express on Vercel</h1>

      <h2>/api/health</h2>
      <pre>{health ? JSON.stringify(health, null, 2) : "Loading..."}</pre>

      <button onClick={sendEcho}>POST /api/echo</button>
      <pre>{echo ? JSON.stringify(echo, null, 2) : "No echo yet"}</pre>
    </div>
  );
}
