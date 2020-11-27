const { ref, toRefs, isRef, reactive, watch } = vue;

const getFn = (fn) => {
  return typeof fn === 'function' ? fn : (e) => e;
}

export function useRequestPage(fn, page, o) {
  const dataHandle = getFn(o['dataHandle']);
  let data = reactive({
    key: page.key || '',
    items: [],
    pages: { pagesize: page.pagesize || 10, curpage: page.page || 1, total: 0 },
  })
  o['dataValue'] = { items: [], pages: {} }
  o['dataHandle'] = (e) => {
    e = dataHandle(e);
    data.items = ref(e.items);
    e.page.pagesize = data.pages.pagesize;
    data.pages = ref(e.page);
    return e;
  }
  const res = useRequestWith(() => {
    let param = { pagesize: data.pages.pagesize, page: data.pages.curpage }
    if (!!data.key) {
      param['key'] = data.key;
    }
    return fn(param)
  }, o);
  data.reload = res.run;
  data.error = res.error;
  data.data = res.data;
  data.loading = res.loading;
  data.run = res.run;
  return {
    change() {
      res.run()
    },
    search(key) {
      data.key = key;
      data.pages.curpage = 1;
      res.run();
    },
    ...toRefs(data)
  };
}

export function useRequestWith(fn, options = {}) {
  const dataHandle = getFn(options['dataHandle']);
  options['dataHandle'] = (e) => {
    const err = '接口异常';
    if (!e || typeof e !== 'object' || !e.code) {
      throw err;
    } else if (e.code >= 210) {
      throw (e.msg || err);
    }
    return dataHandle(e.data);
  };
  return useRequest(fn, options);
}

export function useRequest(fn, options = {}) {
  const { ready, manual, pollingInterval, repeat, dataHandle, dataValue } = options;
  const { loading, withLoading } = hook.useLoading();
  let data = ref(dataValue === undefined ? {} : dataValue), error = ref(''), run = (...d) => {
    if (!repeat && loading.value) {
      return;
    }
    error.value = '';
    return withLoading(() => (typeof fn === 'function' ? fn(...d) : fn).then(e => {
      data.value = dataHandle ? dataHandle(e) : e;
      return [e, null];
    }).catch(e => {
      error.value = e;
      return [{}, e];
    }));
  }, cancel = () => {
  };
  if (isRef(ready)) {
    const stop = watch(() => ready.value, (e) => {
      if (e) {
        stop();
        run();
      }
    });
  } else if (!manual) {
    run();
  }
  return {
    loading,
    withLoading,
    data,
    error,
    cancel,
    run
  };
}
