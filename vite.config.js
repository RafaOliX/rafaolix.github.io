import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // rafaolix.github.io es un "user site": se sirve desde la raíz '/'
  base: '/',
  plugins: [tailwindcss()],
  server: {
    host: true,            // necesario para exponer el puerto desde Docker
    port: 5173,
    watch: { usePolling: true }, // hot reload fiable en volúmenes Docker
  },
  build: { outDir: 'dist' },
})
