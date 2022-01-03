import { WebStorage, Options, ParseValue, validateParams, value2Stringify, } from "./WebStorage";
import { readonlySet } from "./../utils/util";

// sessionStorage 实现类
export class SessionStorage implements WebStorage {
  session: Storage;
  opts: Options;

  constructor () {
    this.session = window.sessionStorage;
    this.opts = {
      type: 'd',
      expires: 0,
      encrypt: false,
    };
  }

  // set session storage item
  set (key: string, value: any, opts: Options = this.opts): void {
    if (!validateParams(key, value)) { return; }
    if (opts.encrypt) {
      // 
      this.session.setItem(key, value2Stringify(value));
    } else {
      this.session.setItem(key, value2Stringify(value));
    }
  }

  // get session storage item
  get (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    return ParseValue(this.session.getItem(key));
  }

  // update session storage item
  update (key: string, value: any, opts: Options = this.opts): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.set(key, value, opts);
    return tempItem;
  }

  // remove session storage item
  remove (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.session.removeItem(key);
    return ParseValue(tempItem);
  }

  key (index: number): string | undefined {
    if (typeof index !== 'number') { return undefined; }
    return this.session.key(index) as string;
  }

  clear (): void {
    this.session.clear();
  }
}

export function sessionStorage () {
  debugger
  const ss = new SessionStorage();
  
  const sealed = Object.seal(ss);

  readonlySet.set(sealed, true);

  return sealed;
}
