type AppConfig = {
  appName: string
  description: string
  loader?: {
    color?: string
    height?: number
    duration?: number
    throttle?: number
  }
}

const config: AppConfig = {
  appName: 'VITE-SSR-TEMPLATE',
  description: '',
}

export default config
