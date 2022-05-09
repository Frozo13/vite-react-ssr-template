import { UsersStore } from '@/store/usersStore'
import { AppStore } from '@/store/appStore'
import { enableStaticRendering } from 'mobx-react-lite'

export { usersStore, appStore, initStore, getInitialState }

enableStaticRendering(typeof window === 'undefined')

let initialized = false

let usersStore: UsersStore
let appStore: AppStore

let stores: Record<string, object>

function initStore(initialState?: Record<string, string>) {
  if (typeof window === 'undefined' || !initialized) {
    usersStore = new UsersStore()
    appStore = new AppStore()

    stores = { usersStore, appStore }

    if (initialState) {
      for (const store in stores) {
        if (initialState[store]) {
          Object.assign(stores[store], JSON.parse(initialState[store]))
        }
      }
    }

    initialized = true
  }
}

function getInitialState() {
  const data: Record<string, string> = {}

  for (const store in stores) {
    data[store] = JSON.stringify(stores[store])
  }

  return data
}
