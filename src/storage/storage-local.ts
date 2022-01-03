import { WebStorage, Options, ParseValue, validateParams, value2Stringify, } from "./definition";

// localStorage 实现类
export class LocalStorage implements WebStorage {
  local: Storage;
  opts: Options;

  constructor () {
    this.local = window.localStorage;
    this.opts = {
      type: 'd',
      expires: 0,
      encrypt: false,
    };
  }

  // set local storage item
  set (key: string, value: any, opts: Options = this.opts): void {
    if (!validateParams(key, value)) { return; }
    if (opts.encrypt) {
      // 
      this.local.setItem(key, value2Stringify(value));
    } else {
      this.local.setItem(key, value2Stringify(value));
    }
  }

  // get local storage item
  get (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    return ParseValue(this.local.getItem(key));
  }

  // update local storage item
  update (key: string, value: any, opts: Options = this.opts): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.set(key, value, opts);
    return tempItem;
  }

  // remove local storage item
  remove (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.local.removeItem(key);
    return ParseValue(tempItem);
  }

  key (index: number): string | undefined {
    if (typeof index !== 'number') { return undefined; }
    return this.local.key(index) as string;
  }

  clear (): void {
    this.local.clear();
  }
}