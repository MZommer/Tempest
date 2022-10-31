import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets":     path.join(__dirname, 'src/assets'),
      "@components": path.join(__dirname, 'src/components'),
      "@contexts":   path.join(__dirname, 'src/contexts'),
      "@libs":       path.join(__dirname, 'src/libs'),
      "@reducers":   path.join(__dirname, 'src/reducers'),
      "@routes":     path.join(__dirname, 'src/routes'),
      "@screens":    path.join(__dirname, 'src/screens'),
      "@utils":      path.join(__dirname, 'src/utils'),
      "@actions":    path.join(__dirname, 'src/actions'),
    },
  },
})
