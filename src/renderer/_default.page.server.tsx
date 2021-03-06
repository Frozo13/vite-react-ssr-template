import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { escapeInject, pipeNodeStream } from 'vite-plugin-ssr'
import { PageShell } from './PageShell'
import { FetchProps, PageContext } from './types'
import { PageContextBuiltIn } from 'vite-plugin-ssr'
import { getDocumentProps } from '@/renderer/getDocumentProps'
import { getStore } from '@/store'
import { StoreProvider } from '@/store/StoreProvider'
import { getHead } from './getHead'
import { Page as ErrorPage } from '@/renderer/_error.page'

export { render, passToClient }

const passToClient = [
  'pageProps',
  'documentProps',
  'initialState',
  'fetchedProps',
  'error',
]

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const Page = pageContext.Page
  let pageProps = pageContext.pageProps
  let fetchedProps!: FetchProps
  let error: any
  const store = getStore()

  if (pageContext.pageExports.fetch) {
    try {
      fetchedProps = await pageContext.pageExports.fetch(pageContext, store)
    } catch (err) {
      error = (err as Error).message
    }
    if (fetchedProps) {
      pageProps = { ...pageProps, ...fetchedProps }

      let { redirectTo } = fetchedProps
      if (redirectTo) {
        if (redirectTo[0] !== '/') {
          redirectTo = `/${redirectTo}`
        }
        return {
          documentHtml: null,
          pageContext: {
            redirectTo,
          },
        }
      }
    }
  }

  const streamPipe = pipeNodeStream(writable => {
    ReactDOMServer.renderToPipeableStream(
      <StoreProvider store={store}>
        <PageShell pageContext={pageContext}>
          {error ? <ErrorPage is404={false} /> : <Page {...pageProps} />}
        </PageShell>
      </StoreProvider>,
    ).pipe(writable)
  })

  const head = getHead(getDocumentProps(pageContext))

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${head.title!}</title>
        <meta charset="UTF-8" />
        <meta name="description" content="${head.description!}">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
      </head>
      <body>
        <div id="page-view">${streamPipe}</div>
      </body>
    </html>`

  const initialState = store.getInitialState()

  return {
    documentHtml,
    pageContext: { initialState, fetchedProps, error },
  }
}
