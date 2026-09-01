import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Version B is deployed beside the original concept for direct comparison.
export default defineConfig({
  base: '/prospect-auto-concept/alt-fable-51/',
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
