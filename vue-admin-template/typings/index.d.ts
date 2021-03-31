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

declare class d_util {
  useInitTitle(ctx)

  formCreate()
}

declare class d_hook {
  useTip()

  useRouter(ctx)
}

declare class d_app {
}

declare class d_apiUtil {
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
