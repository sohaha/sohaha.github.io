const {ref, toRef, watch, computed, onMounted, onUnmounted, getCurrentInstance, nextTick} = vue;

export default {};

const ele = window['ELEMENT'];
// 显示提示
export function useTip() {
  const getOpt = (type, message, duration = 3000) => {
    if (!message && !type) return;
    if (typeof type === 'object')
      return Object.assign({duration: duration}, type);
    if (!message) {
      [type, message] = [message, type];
    }
    if (!type) type = 'info';
    return {message, type, duration};
  };
  const message = function (type, tip, duration) {
    ele.Message(Object.assign({
      showClose: true,
      center: true,
    }, getOpt(type, tip, duration)));
  };
  const notify = function (type, tip, title = '温馨提示', duration) {
    ele.Notification(Object.assign({
      customClass: 'custom-notify-class',
      title: title,
      offset: 58
    }, getOpt(type, tip, duration)));
  };
  return {message, notify};
}

export function useConfirm() {
  const defaultCft = {
    center: true,
    showCancelButton: true,
    showConfirmButton: true
  }

  const warning = function (title, message, confirmFn, cancelFn, opt) {
    if (typeof opt !== 'object') opt = {};
    ele.MessageBox(Object.assign(defaultCft, {
      title: title,
      message: message,
      type: 'warning',
      callback: function (type) {
        switch (type) {
          case 'confirm':
            if (typeof confirmFn === 'function') confirmFn();
            break;
          case 'cancel':
            if (typeof cancelFn === 'function') cancelFn();
            break;
          default:
        }
      }
    }, opt))
  };
  return { warning };
}

export function initWindowFunc() {
  window['arrayAdd'] = function (arr, v) {
    var i = arr.indexOf(v);
    if (i < 0) {
      arr.push(v);
    }
  };

  window['arrayReduce'] = function (arr, v) {
    var i = arr.indexOf(v);
    if (i >= 0) {
      arr.splice(i, 1);
    }
  };
}

export function useInitTitle(ctx) {
  let title = ref(hook.useStore(ctx).state.viewTitle);
  watch(() => hook.useStore(ctx).state.viewTitle, (val) => {
    title.value = val;
  });

  let SpaTitle = ref('SpaTitle');
  onMounted(() => {
    if (!SpaTitle.value && title.value) {
      SpaTitle.value = title.value + ' - %s';
    }
  });

  return {
    title,
    SpaTitle
  };
}

export function useMlSearchKeyObserver(ctx, ml_searchKey) {
  let useRouter = hook.useRouter;
  ml_searchKey.value = !useRouter(ctx).route.query.hasOwnProperty('key') ? '' : useRouter(ctx).route.query.key;
  let searchKey = computed(() => {
    return !useRouter(ctx).route.query.hasOwnProperty('key') ? '' : useRouter(ctx).route.query.key;
  });

  watch(searchKey, (val) => {
    ml_searchKey.value = val;
  });
}

export function getInfo() {
  const {loading, error, data, run} = api.useRequest(api.user.userInfo);
  watch(data, (val) => {
    if (val.data && val.code < 400) {
      // if (!_t.childView) _t.childView = 'main_main';
      app.store.commit('setUser', val.data);
    }
    watch(error, (val) => {
      if (val) {
        util.useTip().notify('error', '网络繁忙，请稍后再试！', '温馨提示');
      }
    });
  });
}

export function isMobile() {
  let ua = navigator.userAgent;
  if (typeof ua !== 'string') return false;
  let mobileRE = /(iphone|android|ipad|huawei|webos|samsung|midp|wap|phone|^ucweb)/i;
  let result = mobileRE.test(ua);
  if (
    !result &&
    navigator.maxTouchPoints > 1 &&
    ua.indexOf('Macintosh') !== -1 &&
    ua.indexOf('Safari') !== -1
  ) {
    result = true;
  }

  return result;
}

export function throttle(fn, delay) {
  let go = true;
  return () => {
    if (!go) {
      return false;
    }

    go = false;
    setTimeout(() => {
      fn();
      go = true;
    }, delay);
  };
}

export function formCreate(el, rules, opts = {}) {
  if (!('formCreate' in window)) {
    throw "需要先引入 form-create.js";
  }

  const {$f, mount, remove, destroy} = window.formCreate.init(rules, Object.assign({
    form: {
      hideRequiredAsterisk: true,
      labelPosition: 'top',
      showMessage: true,
      size: 'mini',
    },
    submitBtn: {
      size: 'mini',
      loading: false,
      disabled: false,
      icon: 'icon-save',
      innerText: '提 交',
      width: 'auto',
    },
  }, opts));
  vue.onMounted(() => {
    mount(document.querySelector(el));
  });
  return {
    $f, remove, destroy
  };
}
