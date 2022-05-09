import { PageContextBuiltIn } from 'vite-plugin-ssr'
import { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router'
import { DocumentProps, PageContext } from './types'

export function getDocumentProps(
  pageContext: PageContextBuiltInClient | PageContextBuiltIn | PageContext
): DocumentProps | null {
  return (
    ((pageContext.pageExports.documentProps ||
      (pageContext as any).documentProps) as DocumentProps) || null
  )
}
