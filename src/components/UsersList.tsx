import { useStore } from '@/store/StoreProvider'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import UserCard from './UserCard'

const UsersList: FC = () => {
  const { usersStore } = useStore()

  return (
    <div className="flex flex-wrap p-2">
      {usersStore.users.map(user => (
        <UserCard {...user} key={user.id} />
      ))}
    </div>
  )
}

export default observer(UsersList)
