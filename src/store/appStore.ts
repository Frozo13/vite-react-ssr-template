import { makeAutoObservable } from 'mobx'

export { AppStore }

class AppStore {
  constructor() {
    makeAutoObservable(this)
  }

  private _onTransitionStart: (() => void) | null = null
  private _onTransitionEnd: (() => void) | null = null

  get onTransitionStart() {
    return this._onTransitionStart
  }
  set onTransitionStart(callback) {
    this._onTransitionStart = callback
  }

  get onTransitionEnd() {
    return this._onTransitionEnd
  }
  set onTransitionEnd(callback) {
    this._onTransitionEnd = callback
  }
}
