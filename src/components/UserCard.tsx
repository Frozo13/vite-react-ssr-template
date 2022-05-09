import React, { FC } from 'react'
import { IUser } from '@/store/usersStore'
import { usersStore } from '@/store'

const UserCard: FC<IUser> = (user) => {
  function removeUser() {
    usersStore.removeUser(user.id)
  }

  return (
    <div
      onClick={removeUser}
      className='border rounded-md cursor-pointer flex-grow m-1 py-1 px-3 transform transition-colors transition-transform select-none  hover:(shadow-lg -translate-y-0.5) '
    >
      <h3 className='font-bold'>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

export default UserCard
