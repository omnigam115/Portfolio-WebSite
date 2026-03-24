import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load .env variables if needed for other purposes
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // ── Dev-server configuration ───────────────────────────────────────────
    // No proxy needed for Groq API! The browser can call Groq directly
    // because Groq supports CORS properly.
    server: {
      // You can keep this if you have other APIs that need proxying
      // But for Groq, we're calling directly from the browser
    },

    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  }
})