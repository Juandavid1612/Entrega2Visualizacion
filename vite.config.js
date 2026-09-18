import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Entrega2Visualizacion/',
  plugins: [react(), tailwindcss()],
})