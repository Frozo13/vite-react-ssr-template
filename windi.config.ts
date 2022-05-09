import { defineConfig } from 'windicss/helpers'
import FormsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{html,jsx,tsx}'],
  },
  theme: {},
  plugins: [FormsPlugin],
})
