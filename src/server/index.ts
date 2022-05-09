import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env` })
import express from 'express'
import compression from 'compression'
import { createPageRenderer } from 'vite-plugin-ssr'
import config from '../../vite.config'

const isProduction = process.env.NODE_ENV === 'production'
const root = isProduction ? `${__dirname}/../..` : `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      ...config,
      root,
      server: { middlewareMode: 'ssr' },
    })

    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })

  app.get('*', async (req, res, next) => {
    const pageContextInit = { url: req.url }
    const pageContext = await renderPage(pageContextInit)
    const redirectTo = (pageContext as any).redirectTo
    if (redirectTo) {
      res.redirect(redirectTo)
    }

    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    res.type(httpResponse.contentType)
    httpResponse.pipeToNodeWritable(res)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
