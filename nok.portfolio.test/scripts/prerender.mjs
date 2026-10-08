/**
 * Prerender script - generates static HTML for all routes
 * This enables the site to work with JavaScript disabled (P0 SEO requirement)
 */

import { chromium } from 'playwright'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createServer, preview } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const routes = [
  '/',
  '/trabalhos/caldo-cafe',
  '/trabalhos/serra-bikes',
  '/trabalhos/atlas-arquitetura',
  '/trabalhos/pulso',
]

async function prerender() {
  console.log('🚀 Starting prerender...')

  if (!existsSync(distDir)) {
    console.error('❌ dist/ not found. Run `npm run build` first.')
    process.exit(1)
  }

  const server = await preview({
    preview: { port: 4173, strictPort: true },
  })

  const browser = await chromium.launch()
  const context = await browser.newContext()

  for (const route of routes) {
    const page = await context.newPage()
    const url = `http://localhost:4173${route}`

    console.log(`📄 Rendering ${route}...`)
    await page.goto(url, { waitUntil: 'networkidle' })

    await page.waitForTimeout(500)

    let html = await page.content()

    html = html
      .replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<script\b[^>]*\bsrc="[^"]*"[^>]*><\/script>/gi, '')

    const filePath =
      route === '/'
        ? join(distDir, 'index.html')
        : join(distDir, route.slice(1), 'index.html')

    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, html, 'utf-8')

    console.log(`✅ Saved ${filePath.replace(distDir, 'dist')}`)
    await page.close()
  }

  await browser.close()
  server.httpServer.close()

  console.log('\n🎉 Prerender complete!')
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})
