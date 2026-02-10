import express from "express";

const app = express();
app.use(express.json());

// Example route
app.get("/health", (req, res) => {
  res.json({ ok: true, source: "Express (ESM)" });
});

export default app;
