import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function previewNotFound(): Plugin {
  const dist = path.resolve('dist')

  function exists(filePath: string) {
    try {
      return fs.statSync(filePath).isFile()
    } catch {
      return false
    }
  }

  return {
    name: 'preview-not-found',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '/').split('?')[0]
        const decoded = decodeURIComponent(url)
        const relative = decoded.replace(/^\//, '')
        const asFile = path.join(dist, relative)
        const asIndex = path.join(dist, relative, 'index.html')
        const asBare = relative.endsWith('.html')
          ? asFile
          : path.join(dist, `${relative}.html`)

        if (decoded === '/' || exists(asFile) || exists(asIndex) || exists(asBare)) {
          next()
          return
        }

        const notFound = path.join(dist, '404.html')
        if (exists(notFound)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(fs.readFileSync(notFound))
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), previewNotFound()],
})
