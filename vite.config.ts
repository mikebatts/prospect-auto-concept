import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages under https://<owner>.github.io/prospect-auto-concept/final/
export default defineConfig({
  base: '/prospect-auto-concept/final/',
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Keep GSAP in its own cacheable chunk so the app shell stays small.
        manualChunks(id: string) {
          if (id.includes('node_modules/gsap/') || id.includes('node_modules/@gsap/')) {
            return 'gsap'
          }
          return undefined
        },
      },
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
})
