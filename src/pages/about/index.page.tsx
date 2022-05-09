import React, { FC } from 'react'
import { DocumentProps, PageProps } from '@/renderer/types'

export { Page, documentProps }

const documentProps: DocumentProps = {
  title: 'About page',
}

const Page: FC<PageProps> = () => {
  return (
    <div className="mt-5 text-center">
      <p className="text-lg">This is about page</p>
    </div>
  )
}
