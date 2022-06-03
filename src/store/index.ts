import { UsersStore } from '@/store/usersStore'
import { AppStore } from '@/store/appStore'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

let store: Store

export function getStore(initialState?: Record<string, string>) {
  if (typeof window === 'undefined') {
    return new Store()
  }
  if (!store) {
    store = new Store(initialState)
  }
  return store
}

export default class Store {
  private _usersStore: UsersStore
  private _appStore: AppStore

  private stores: Record<string, object>

  constructor(initialState?: Record<string, string>) {
    this._usersStore = new UsersStore()
    this._appStore = new AppStore()

    this.stores = { usersStore: this._usersStore, appStore: this._appStore }

    if (initialState) {
      for (const store in this.stores) {
        if (initialState[store]) {
          Object.assign(this.stores[store], JSON.parse(initialState[store]))
        }
      }
    }
  }

  get usersStore() {
    return this._usersStore
  }

  get appStore() {
    return this._appStore
  }

  public getInitialState() {
    const data: Record<string, string> = {}

    for (const store in this.stores) {
      data[store] = JSON.stringify(this.stores[store])
    }

    return data
  }
}
