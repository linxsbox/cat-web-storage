import Vue, { VueConstructor } from "vue"
import { hasOwn } from "../util"


let vueConstructor: VueConstructor | null = null

const PluginInstalledFlag = '__composition_api_installed__'

function isVue(obj: any): obj is VueConstructor {
  return obj && typeof obj === 'function' && obj.name === 'Vue'
}

export function isVueRegistered(Vue: VueConstructor) {
  return hasOwn(Vue, PluginInstalledFlag)
}

export function isPluginInstalled() {
  return !!vueConstructor
}

export function warn(msg: string, vm?: Vue | null) {
  Vue.util.warn(msg, vm)
}
