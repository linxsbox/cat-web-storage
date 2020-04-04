import { WebStorage } from './web-storage'
import {
  LocalStorage,
  SessionStorage,
  CookieStorage
} from './web-storage'

export default WebStorage

export {
  LocalStorage,
  SessionStorage,
  CookieStorage
} from './web-storage'

declare module 'vue/types/vue' {
  interface Vue {
    $localStorage: LocalStorage
    $sessionStorage: SessionStorage
    $cookieStorage: CookieStorage
  }
}
