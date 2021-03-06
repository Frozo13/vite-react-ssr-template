import React, { FC } from 'react'
import { IUser } from '@/store/usersStore'
import { useStore } from '@/store/StoreProvider'

const UserCard: FC<IUser> = user => {
  const { usersStore } = useStore()

  function removeUser() {
    usersStore.removeUser(user.id)
  }

  return (
    <div
      onClick={removeUser}
      className="border rounded-md cursor-pointer flex-grow m-1 py-1 px-3 transform transition-all select-none hover:shadow-lg hover:-translate-y-0.5"
    >
      <h3 className="font-bold">{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

export default UserCard
