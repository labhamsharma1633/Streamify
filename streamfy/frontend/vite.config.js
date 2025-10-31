import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // default, but ensure it's defined
  },
  server: {
    port: 5173,
    host: true,
  },
});
