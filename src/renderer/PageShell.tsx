import React, { FC, ReactNode } from 'react'
import { PageContextProvider } from './usePageContext'
import { PageContext } from './types'
import { getDocumentProps } from './getDocumentProps'
import { getLayout } from '@/layouts'
import RouteLoader from './RouteLoader'
import '@/index.css'

export { PageShell }

const PageShell: FC<{
  children: ReactNode
  pageContext: PageContext
}> = ({ children, pageContext }) => {
  pageContext.documentProps?.layout
  const documentProps = getDocumentProps(pageContext)
  const Layout = getLayout(documentProps?.layout || 'DefaultLayout')

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <RouteLoader />
        <Layout>{children}</Layout>
      </PageContextProvider>
    </React.StrictMode>
  )
}
