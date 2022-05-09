import React, { FC } from 'react'
import { LayoutProps } from '.'
import Header from '@/components/Header'

const DefaultLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto">{children}</div>
    </>
  )
}

export default DefaultLayout
