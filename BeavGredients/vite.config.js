import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_ID__: JSON.stringify(
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "local"
    ),
  },
});