const express = require("express");
const app = express();

// IMPORTANT: parse JSON bodies
app.use(express.json());

// Example routes
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Express API working on Vercel" });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/api/echo", (req, res) => {
  res.json({ youSent: req.body });
});

// Export the app for Vercel
module.exports = app;