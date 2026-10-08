import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function previewStaticPages(): Plugin {
  const dist = path.resolve('dist')

  function isFile(filePath: string) {
    try {
      return fs.statSync(filePath).isFile()
    } catch {
      return false
    }
  }

  return {
    name: 'preview-static-pages',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url ?? '/').split('?')[0])
        const relative = url.replace(/^\//, '').replace(/\/$/, '')
        const asFile = path.join(dist, relative)
        const asIndex =
          relative === '' ? path.join(dist, 'index.html') : path.join(dist, relative, 'index.html')

        if (url === '/' && isFile(path.join(dist, 'index.html'))) {
          next()
          return
        }

        if (isFile(asFile) || isFile(asIndex)) {
          if (isFile(asIndex) && !isFile(asFile)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(fs.readFileSync(asIndex))
            return
          }
          next()
          return
        }

        const notFound = path.join(dist, '404.html')
        if (isFile(notFound)) {
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
  plugins: [react(), previewStaticPages()],
})
