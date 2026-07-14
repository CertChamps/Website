import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const siteRoot = path.resolve(__dirname, '..')

// GitHub Pages serves 404.html for unknown paths; copying index.html lets the SPA handle client routes.
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const indexPath = path.join(siteRoot, 'index.html')
      fs.copyFileSync(indexPath, path.join(siteRoot, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: siteRoot,
    emptyOutDir: false,
  },
  base: '/',
})
