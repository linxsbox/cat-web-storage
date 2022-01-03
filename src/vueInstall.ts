import { VueConstructor } from 'vue';
import { isVueRegistered } from './utils/vue/runtimeContext';
import {
  LocalStorage,
  SessionStorage,
  CookieStorage,
} from './storage';

export let _Vue: VueConstructor;

export function install(Vue: VueConstructor) {
  if (install.installed && _Vue === Vue) { return; }

  if (isVueRegistered(Vue)) { return; }

  install.installed = true;
  _Vue = Vue;

  const localStorage = new LocalStorage();
  const sessionStorage = new SessionStorage();
  const cookieStorage = new CookieStorage();

  Object.defineProperty(Vue.prototype, '$localStorage', {
    get() { return localStorage; },
  });
  Object.defineProperty(Vue.prototype, '$sessionStorage', {
    get() { return sessionStorage; },
  });
  Object.defineProperty(Vue.prototype, '$cookieStorage', {
    get() { return cookieStorage; },
  });
}

export const Plugin = {
  install: (Vue: VueConstructor) => install(Vue),
}






















// export 
let _VUE: any;

const _install = (Vue: any, opts: object) => {
  if (install.installed && _VUE === Vue) { return; }
  install.installed = true;

  _VUE = Vue;

  const localStorage = new LocalStorage();
  const sessionStorage = new SessionStorage();
  const cookieStorage = new CookieStorage();

  Object.defineProperty(Vue.prototype, '$localStorage', {
    get() { return localStorage; },
  });
  Object.defineProperty(Vue.prototype, '$sessionStorage', {
    get() { return sessionStorage; },
  });
  Object.defineProperty(Vue.prototype, '$cookieStorage', {
    get() { return cookieStorage; },
  });
};

install.installed = false;

export default class WebStorage {
  static install: (Vue: any, opts: object) => void;

  app: any;
  apps: any[];
  ready: boolean;
  options: object = {};

  constructor() {
    this.app = null;
    this.apps = [];
    this.ready = false;
    this.options = {};
  }
}

WebStorage.install = install;

const inBrowser = typeof window !== 'undefined';

if (inBrowser && (window as any).Vue) {
  (window as any).Vue.use(WebStorage);
} else if (inBrowser && Object.defineProperty) {
  Object.defineProperty(window, '$localStorage', {
    get() { return new LocalStorage(); },
  });
  Object.defineProperty(window, '$sessionStorage', {
    get() { return new SessionStorage(); },
  });
  Object.defineProperty(window, '$cookieStorage', {
    get() { return new CookieStorage(); },
  });
}
