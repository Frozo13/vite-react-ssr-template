import { $axios } from '@/utils/axios'
import { AxiosResponse } from 'axios'
import { makeAutoObservable } from 'mobx'

export { UsersStore, IUser }

interface IUser {
  id: number
  name: string
  email: string
  phone: string
}

class UsersStore {
  constructor() {
    makeAutoObservable(this)
  }

  private _users: IUser[] = []

  public get users() {
    return this._users
  }
  private set users(users) {
    this._users = users
  }

  public removeUser(id: number) {
    this._users = this._users.filter(u => u.id !== id)
  }

  public async fetchUsers() {
    try {
      const response: AxiosResponse<IUser[]> = await $axios.get(
        'https://jsonplaceholder.typicode.com/users',
      )
      this.users = response.data
    } catch (error) {
      console.error(error)
    }
  }
}
