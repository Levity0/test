const express = require("express");
const app = express();

app.use(express.json());

// ✅ Example API routes
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Express API working on Vercel" });
});

app.post("/api/echo", (req, res) => {
  res.json({ youSent: req.body });
});

// Export the app for Vercel Serverless Functions
module.exports = app;
