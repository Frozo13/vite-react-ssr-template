import React from 'react'
import { createRoot, hydrateRoot, Root } from 'react-dom/client'
import {
  PageContextBuiltInClient,
  useClientRouter,
  navigate,
} from 'vite-plugin-ssr/client/router'
import { PageShell } from './PageShell'
import { FetchProps, PageContext } from '@/renderer/types'
import { getDocumentProps } from '@/renderer/getDocumentProps'
import { getStore } from '@/store'
import { StoreProvider } from '@/store/StoreProvider'
import { getHead } from './getHead'
import { Page as ErrorPage } from '@/renderer/_error.page'

let root: Root
useClientRouter({
  async render(pageContext: PageContextBuiltInClient & PageContext) {
    const Page = pageContext.Page
    let pageProps = pageContext.pageProps
    let fetchedProps: FetchProps | null = null

    let store = getStore(pageContext.initialState)

    if (pageContext.isHydration) {
      if (pageContext.fetchedProps) {
        pageProps = { ...pageProps, ...pageContext.fetchedProps }
      }
    }

    if (!pageContext.isHydration && pageContext.pageExports.fetch) {
      try {
        fetchedProps = await pageContext.pageExports.fetch(pageContext, store)
      } catch (error) {
        pageContext.error = (error as Error).message
      }
      if (fetchedProps) {
        pageProps = { ...pageProps, ...fetchedProps }
        let { redirectTo } = fetchedProps
        if (redirectTo) {
          if (redirectTo[0] !== '/') {
            redirectTo = `/${redirectTo}`
          }
          navigate(redirectTo)
          return
        }
      }
    }

    const page = (
      <StoreProvider store={store}>
        <PageShell pageContext={pageContext}>
          {pageContext.error ? (
            <ErrorPage is404={false} />
          ) : (
            <Page {...pageProps} />
          )}
        </PageShell>
      </StoreProvider>
    )
    const container = document.getElementById('page-view')!
    if (pageContext.isHydration) {
      root = hydrateRoot(container, page)
    } else {
      if (!root) {
        root = createRoot(container)
      }
      root.render(page)
    }

    const head = getHead(getDocumentProps(pageContext))
    if (head.title) {
      document.title = head.title
    }
    if (head.description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', head.description)
    }
  },
  onTransitionStart,
  onTransitionEnd,
})

function onTransitionStart() {
  const { appStore } = getStore()

  if (appStore.onTransitionStart) {
    appStore.onTransitionStart()
  }
}
function onTransitionEnd() {
  const { appStore } = getStore()

  if (appStore.onTransitionEnd) {
    appStore.onTransitionEnd()
  }
}
