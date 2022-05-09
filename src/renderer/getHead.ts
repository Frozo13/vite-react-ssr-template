import appConfig from '@/app.config'
import { DocumentProps } from './types'

export function getHead(documentProps: DocumentProps | null) {
  return {
    title: documentProps?.title || appConfig.appName || 'Vite app',
    description: documentProps?.decsription || appConfig.description,
  }
}
