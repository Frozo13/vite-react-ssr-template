import { Layout } from '@/layouts'
import Store from '@/store'

export type PageProps = Record<string, any>

export type PageContext = {
  Page: (pageProps: PageProps) => React.ReactElement
  pageProps: PageProps
  urlPathname: string
  documentProps?: DocumentProps
  is404?: boolean
  initialState?: Record<string, string>
  fetchedProps?: FetchProps
  error?: string
  pageExports: {
    fetch?: FetchFucntion<FetchProps>
    documentProps?: DocumentProps
  }
  urlParsed: {
    pathname: string
    search: null | Record<string, string>
    hash: null | string
  }
}

export type DocumentProps = {
  title?: string
  decsription?: string
  layout?: Layout
}

export type FetchFucntion<T> = (
  context: PageContext,
  store: Store,
) => Promise<FetchProps & T>

export type FetchProps = Record<string, any> | { redirectTo: string }
