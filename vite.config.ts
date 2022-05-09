import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import WindiCSS from 'vite-plugin-windicss'
import { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
  plugins: [
    react(),
    ssr(),
    WindiCSS({
      scan: {
        dirs: [path.resolve(__dirname, 'src')],
        fileExtensions: ['js', 'ts', 'jsx', 'tsx', 'html'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src/'),
    },
  },
}

export default config
