import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // <-- allow access from other devices
    port: 5173,         // <-- default Vite port
    strictPort: true    // <-- force it to use 5173 or fail (optional)
  }
})
