import { WebStorage, Options } from "./WebStorage";
import { readonlySet } from "./../utils/util";

// Cookie Options 接口定义
export interface CookieOptions extends Options {
  path?: string;
}

// document.cookie 实现类
export class CookieStorage implements WebStorage {
  opts: CookieOptions;

  constructor() {
    this.opts = {
      type: 'd',
      expires: 0,
      encrypt: false,
      path: '/',
    };
  }

  // 设置过期时间
  setExpiresTime (type: string | undefined, num: number): string | '' {
    const tempTimeObj = new Date();
    const tempTime = +new Date();
    
    const TIME_SECOND = 1000;
    const TIME_MINUTE = 60 * 1000;
    const TIME_HOURS = 3600 * 1000;
    const TIME_DAY = 24 * 3600 * 1000;
    const TIME_DAY30 = 30 * 24 * 3600 * 1000;
    const TIME_DAY365 = 365 * 24 * 3600 * 1000;

    switch (type) {
      case 's':
        tempTimeObj.setTime(tempTime + num * TIME_SECOND);
        break;
      case 'm':
        tempTimeObj.setTime(tempTime + num * TIME_MINUTE);
        break;
      case 'h':
        tempTimeObj.setTime(tempTime + num * TIME_HOURS);
        break;
      case 'D':
        tempTimeObj.setTime(tempTime + num * TIME_DAY);
        break;
      case 'M':
        tempTimeObj.setTime(tempTime + num * TIME_DAY30);
        break;
      case 'Y':
        tempTimeObj.setTime(tempTime + num * TIME_DAY365);
        break;
      default:
        tempTimeObj.setTime(tempTime + num * TIME_DAY);
        break;
    }
    return tempTimeObj.toUTCString();
  }

  // set cookie storage item
  set (key: string, value: string, opts: CookieOptions = this.opts): void {
    if (!key || !value) { return; }
    if (typeof key !== 'string' || typeof value !== 'string') { return; }
    let tempCookie = '';
    if (opts.encrypt) {
      // 
      tempCookie += `${key}=${value}`;
    } else {
      tempCookie += `${key}=${value}`;
    }
    if (typeof opts.expires === 'number' && opts.expires > 0) {
      tempCookie += `; expires=${this.setExpiresTime(opts.type, opts.expires)}`;
    }
    if (opts.path && opts.path !== '' && opts.path !== '/') {
      tempCookie += `; path=${opts.path}`;
    }
    document.cookie = tempCookie;
  }

  // get cookie storage item
  get (key: string): string | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    if (!document.cookie) { return undefined; }
    const tempCookie = document.cookie;
    const tempItems = tempCookie.split('; ');
    let cookieValue = '';
    tempItems.forEach((item, index) => {
      const i = item.split('=');
      if (key === i[0]) { cookieValue = i[1]; }
    });
    return cookieValue;
  }

  // update cookie storage item
  update (key: string, value: any, opts: Options = this.opts): string | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempCookieItem = this.get(key);
    if (tempCookieItem) {
      this.set(key, value, opts);
    }
    return tempCookieItem;
  }

  // remove cookie storage item
  remove (key: string): string | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempCookie = this.get(key);
    document.cookie = `${key}=; expires=${this.setExpiresTime('all', -1)}`;
    return tempCookie;
  }

  key (index: number): string | undefined {
    if (typeof index !== 'number') { return undefined; }
    const tempCookie = document.cookie;
    const tempItems = tempCookie.split('; ');
    let cookieKey = '';
    tempItems.forEach((item, cindex) => {
      const i = item.split('=');
      if (index === cindex) { cookieKey = i[0]; }
    });
    return cookieKey;
  }

  clear (): void {
    if (!document.cookie) { return; }
    const tempCookie = document.cookie;
    const tempItems = tempCookie.split('; ');
    tempItems.forEach(item => {
      const i = item.split('=');
      document.cookie = `${i[0]}=; expires=${this.setExpiresTime('all', -1)}`;
    });
  }
}

export function cookieStorage () {
  const cs = new CookieStorage();
  
  const sealed = Object.seal(cs);

  readonlySet.set(sealed, true);

  return sealed;
}

