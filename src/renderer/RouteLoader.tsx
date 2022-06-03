import appConfig from '@/app.config'
import { useStore } from '@/store/StoreProvider'
import React, { FC, useEffect, useState } from 'react'

let intervalHandler: NodeJS.Timer | null = null
let timeout: NodeJS.Timer | null = null
const interval = (appConfig.loader?.duration || 5000) / 100

const RouteLoader: FC = () => {
  const { appStore } = useStore()
  const [progress, setProgress] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    appStore.onTransitionEnd = onTransitionEnd
    appStore.onTransitionStart = onTransitionStart

    return () => {
      if (intervalHandler) {
        clearInterval(intervalHandler)
      }
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  const onTransitionStart = () => {
    if (intervalHandler) {
      clearInterval(intervalHandler)
    }
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      setEnabled(true)
      setProgress(0)
      intervalHandler = setInterval(update, interval)
    }, appConfig.loader?.throttle || 200)
  }

  const onTransitionEnd = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (intervalHandler) {
      clearInterval(intervalHandler)
    }

    setProgress(100)

    timeout = setTimeout(() => {
      setEnabled(false)
    }, 200)
  }

  const update = () => {
    setProgress(progress => {
      if (progress < 95) {
        return progress + 1
      }
      return 95
    })
  }

  if (enabled) {
    return (
      <div
        style={{
          height: `${appConfig.loader?.height || 2}px`,
          backgroundColor: appConfig.loader?.color || '#3B81F6',
          width: `${progress}%`,
        }}
        className="transition-all top-0 left-0 duration-100 absolute"
      ></div>
    )
  } else {
    return null
  }
}

export default RouteLoader
