import { useEffect, useState } from "react";

export default function App() {
  const [now, setNow] = useState(new Date().toLocaleString());
  const hello = import.meta.env.VITE_HELLO ?? "(missing VITE_HELLO)";

  useEffect(() => {
    const id = setInterval(() => setNow(new Date().toLocaleString()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, lineHeight: 1.5 }}>
      <header>
        <h1>✅ React is running</h1>
        <p>This is a simple HTML-rendered smoke test page.</p>
      </header>

      <main>
        <section>
          <h2>Status</h2>
          <ul>
            <li>
              <strong>Current time:</strong> <time>{now}</time>
            </li>
            <li>
              <strong>Build ID:</strong> <code>{__BUILD_ID__}</code>
            </li>
          </ul>
        </section>

        <section>
          <h2>Environment variable test</h2>
          <p>
            <code>VITE_HELLO</code>: <strong>{hello}</strong>
          </p>
          <p>If that shows a real value, Vercel env vars are working.</p>
        </section>
      </main>

      <footer>
        <small>Vercel + React smoke test</small>
      </footer>
    </div>
  );
}