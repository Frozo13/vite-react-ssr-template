import { FC, ReactNode } from 'react'
import DefaultLayout from './Default'
import ClearLayout from './Clear'

export { getLayout, Layout, LayoutProps }

const layouts = { DefaultLayout, ClearLayout }

type Layout = keyof typeof layouts

type LayoutProps = {
  children: ReactNode
}

function getLayout(key: Layout) {
  if (layouts[key]) {
    return layouts[key]
  }
  return DefaultLayout
}
