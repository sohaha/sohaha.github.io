declare class vue {
  onMounted(fn: Function)

  reactive(v: Object)

  ref(v: any)

  watch(v: any, fn: Function)
}

declare class util {
  useInitTitle(ctx)

  formCreate()
}

declare class hook {
  useTip()
}

declare class api {
  useRequestPage(fn: Function, p: Object, o: Object)

  useRequestWith(fn: Function, o: Object)

  useRequest(fn: Function, o: Object)

  sys: Object;
}
