import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/atlas-mundo/', // Nombre exacto del repositorio
  plugins: [
    react(),
    tailwindcss(),
  ],
})