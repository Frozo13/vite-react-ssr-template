import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{html,jsx,tsx}'],
  },
  theme: {},
  plugins: [],
})
