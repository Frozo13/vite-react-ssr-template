import React, { FC } from 'react'
import { DocumentProps } from './types'
import { usePageContext } from './usePageContext'

export { Page, documentProps }

const documentProps: DocumentProps = {
  layout: 'ClearLayout',
}

const Page: FC<{ is404: boolean }> = ({ is404 }) => {
  const pageContext = usePageContext()

  if (is404) {
    return (
      <div className='flex flex-col h-screen justify-center items-center'>
        <h1 className='font-bold text-3xl'>404 Page Not Found</h1>
        <p className='mb-4'>This page could not be found.</p>
        <a
          href='/'
          className='border rounded border-gray-400 py-2 px-4 transition-colors hover:bg-light-500'
        >
          Back to home
        </a>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col h-screen justify-center items-center'>
        <h1 className='font-bold text-3xl'>500 Internal Server Error</h1>
        <p className='mb-4'>Something went wrong.</p>
        {import.meta.env.DEV && <p className='mb-4'>{pageContext.error}</p>}
        <a
          href={pageContext.urlPathname}
          className='border rounded border-gray-400 py-2 px-4 transition-colors hover:bg-light-500'
        >
          Reload page
        </a>
      </div>
    )
  }
}
