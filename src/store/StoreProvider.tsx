import React, { createContext, ReactNode, useContext } from 'react'
import Store from '.'

const StoreContext = createContext<Store | undefined>(undefined)

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}

export function StoreProvider({
  children,
  store,
}: {
  children: ReactNode
  store: Store
}) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
