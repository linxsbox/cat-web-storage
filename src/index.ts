import {
  LocalStorage,
  SessionStorage,
  CookieStorage,
} from './storage';

// export 
let _VUE: any;

const install = (Vue: any, opts = {}) => {
  if (install.installed && _VUE === Vue) { return; }
  install.installed = true;

  _VUE = Vue;

  const localStorage = new LocalStorage();
  const sessionStorage = new SessionStorage();
  const cookieStorage = new CookieStorage();

  Object.defineProperty(Vue.prototype, '$localStorage', {
    get () { return localStorage; },
  });
  Object.defineProperty(Vue.prototype, '$sessionStorage', {
    get () { return sessionStorage; },
  });
  Object.defineProperty(Vue.prototype, '$cookieStorage', {
    get () { return cookieStorage; },
  });
};

install.installed = false;

export default class WebStorage {
  static install: (Vue: any, opts: object) => void;
}

WebStorage.install = install;

const inBrowser = typeof window !== 'undefined';

if (inBrowser && (window as any).Vue) {
  (window as any).Vue.use(WebStorage);
}
