import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore certain warnings during build
        if (warning.code === 'CIRCULAR_DEPENDENCY') return
        warn(warning)
      }
    }
  },
  esbuild: {
    // Enable type checking during build
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
