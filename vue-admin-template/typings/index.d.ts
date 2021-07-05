declare class d_vue {
  onMounted(callback: Function): void;

  onUnmounted(callback: Function): void;

  reactive(obj: Object)

  ref(raw: any)

  toRef(object: any, key: any)

  computed(fn: Function)

  watch(effect: any, fn: Function)

  watchEffect()

  nextTick(callback: Function)
}

declare class useTip {
  message(type: string, tip: string, duration?: number): void

  notify(type: string, tip: string, title?: string, duration?: number): void
}

declare class useConfirm {
  warning(title: string, message: string, confirmFn: Function, cancelFn: Function, opt: object): any
}

declare class useInitTitle {
  title
  SpaTitle
}

declare class d_util {
  useTip(): useTip

  useConfirm(): useConfirm

  useInitTitle(ctx): useInitTitle

  formCreate()
}

declare class useRouter {
  go(index)

  replace(path, query)

  push(path, query)

  getQuery()

  children()

  resetRouter(routerData: any[], global: boolean)
}

declare class useStore {
  state: any

  commit()

  getters: any

  dispatch()
}

declare class useCache {
  getCache(key, def)

  setCache(key, value, expi)
}

declare class useLoading {
  loading

  setLoading(value)

  withLoading(task, {autocomplete: boolean})
}

declare class d_hook {
  useRouter(ctx): useRouter

  useStore(ctx, module): useStore

  useCache(option, storage): useCache

  useLoading(): useLoading

  useHttp()

  useWebWorker()

  useWindowSize()

  useWindowSizeRealTime()
}

declare class d_app {
  vm: object
  request: object
  router: object
  store: object
  userData: object
  defaultAvatar: string

  hasPermission(key)

  setVm(app)

  initStore()

  resetRouter(router)

  initRouter()

  requestInit()
}

declare class useRequestPage {
  change()

  search(key)

  key: string
  items: Object
  pages: object
  reload
  error
  data
  loading
  run
}

declare class useRequest {
  loading
  withLoading
  data
  error
  cancel
  run
}

declare class d_apiUtil {
  useRequestPage(fn, page, o): useRequestPage

  useRequestWith(fn, o: Object)

  useRequest(fn, o: Object): useRequest
}


interface d_api {
  useRequestPage(fn: Function, p: Object, o: Object)

  useRequestWith(fn: Function, o: Object)

  useRequest(fn: Function, o: Object)

  sys: Object;

  cms: Object;
}

declare const vue: d_vue;
declare const util: d_util;
declare const hook: d_hook;
declare const api: d_api;
declare const app: d_app;
declare const apiUtil: d_apiUtil;
