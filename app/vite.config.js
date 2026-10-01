import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const siteRoot = path.resolve(__dirname, '..')
const siteOrigin = 'https://www.certchamps.ie'

const routePages = [
  {
    file: 'pricing.html',
    path: '/pricing',
    title: 'Pricing | CertChamps',
    description:
      'Start free with every Leaving Cert paper, Discover, and a taste of AI. Upgrade to CertChamps ACE when you want higher limits.',
    body: '<h1>Simple pricing</h1><p>Start free with every paper, Discover, and a taste of AI. Upgrade to CertChamps ACE when you want higher limits.</p><p>Free is €0. CertChamps ACE is €40 per year.</p>',
  },
  {
    file: 'about.html',
    path: '/about',
    title: 'About | CertChamps',
    description:
      'Ben and Cian built CertChamps after sitting the Leaving Cert, so students can practise questions and prepare for exams in one place.',
    body: '<h1>Our story</h1><p>It all began with two students, one shared experience, and one simple question: why isn\'t there an easier way to learn?</p><p>Ben and Cian sat the Leaving Cert and built the study platform they wished they had.</p>',
  },
  {
    file: 'privacy.html',
    path: '/privacy',
    title: 'Privacy Policy | CertChamps',
    description: 'How CertChamps collects, uses, stores, and shares personal information.',
    body: '<h1>Privacy Policy</h1><p>This policy explains how CertChamps collects, uses, stores, and shares personal information when you use our websites and applications.</p>',
  },
  {
    file: 'terms.html',
    path: '/terms',
    title: 'Terms of Service | CertChamps',
    description: 'The terms that apply when you use CertChamps.',
    body: '<h1>Terms of Service</h1><p>These terms apply when you use the CertChamps websites, applications, and related services.</p>',
  },
]

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function withPageMeta(html, page) {
  const url = `${siteOrigin}${page.path}`
  const title = escapeAttr(page.title)
  const description = escapeAttr(page.description)
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace('<div id="root"></div>', `<div id="root">${page.body}</div>`)
}

// GitHub Pages only returns 200 for files that exist. Client routes otherwise
// come back as 404.html, which Google will not index.
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const indexPath = path.join(siteRoot, 'index.html')
      const indexHtml = fs.readFileSync(indexPath, 'utf8')
      fs.copyFileSync(indexPath, path.join(siteRoot, '404.html'))
      for (const page of routePages) {
        fs.writeFileSync(path.join(siteRoot, page.file), withPageMeta(indexHtml, page))
      }
      const urls = ['/', ...routePages.map((page) => page.path)]
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${siteOrigin}${url === '/' ? '/' : url}</loc></url>`).join('\n')}
</urlset>
`
      fs.writeFileSync(path.join(siteRoot, 'sitemap.xml'), sitemap)
      fs.writeFileSync(
        path.join(siteRoot, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`,
      )
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
  assetsInclude: ['**/*.riv'],
  base: '/',
})
