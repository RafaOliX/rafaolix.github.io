import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // sitio de usuario: rafaolix.github.io
  plugins: [tailwindcss()],
  server: { host: true, port: 5173 },
  build: { outDir: 'dist' },
})
