export const inBrowser = typeof window !== 'undefined';

export const readonlySet = new WeakMap()

export function hasOwn(obj: Object, key: string): boolean {
  return Object.hasOwnProperty.call(obj, key)
}