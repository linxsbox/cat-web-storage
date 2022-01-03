import { inBrowser } from './utils/util'
import { Plugin } from './vueInstall'

export default Plugin

export {
  LocalStorage,
  SessionStorage,
  CookieStorage,
  WebStorage,
  Options,
  CookieOptions,
  localStorage,
  sessionStorage,
  cookieStorage,
} from './storage';

export const version = '__VERSION__'

// auto install when using CDN
if (inBrowser && window.Vue) {
  window.Vue.use(Plugin)
}
