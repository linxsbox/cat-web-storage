import Vue from 'vue';
import WebStorage, {
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

export default WebStorage

export {
  LocalStorage,
  SessionStorage,
  CookieStorage
} from './web-storage'

