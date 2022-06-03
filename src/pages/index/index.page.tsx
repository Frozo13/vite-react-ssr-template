import React, { FC } from 'react'
import { DocumentProps, FetchFucntion, PageProps } from '@/renderer/types'

import UsersList from '@/components/UsersList'
import { useStore } from '@/store/StoreProvider'

export { Page, fetch, documentProps }

const documentProps: DocumentProps = {
  title: 'Index page',
}

const fetch: FetchFucntion<any> = async (ctx, store) => {
  if (store.usersStore.users.length) {
    return
  }
  await store.usersStore.fetchUsers()
}

const Page: FC<PageProps> = () => {
  const { usersStore: users } = useStore()

  async function refetch() {
    await users.fetchUsers()
  }

  return (
    <>
      <h2 className="mt-3 text-lg text-center">
        Test data from{' '}
        <a
          href="https://jsonplaceholder.typicode.com"
          target="_blank"
          className="text-blue-500"
        >
          jsonplaceholder.typicode.com
        </a>
      </h2>
      <UsersList />
      <button
        onClick={refetch}
        className="border rounded mx-auto border-gray-500 py-3 px-6 transition-colors block hover:bg-gray-100"
      >
        Refresh
      </button>
    </>
  )
}
