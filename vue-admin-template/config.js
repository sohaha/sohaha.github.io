var config = {
  title: '管理后台',
  // baseURL: 'http://yapi.zj.73zls.com/mock/88',
  baseURL: '',
  timeout: 5000,
  navServe: true,// 是否从服务器端获取菜单，如果是则忽略 router.json 菜单配置
  debug: false
};

VueRun.config({
  cdn: '//cdn.jsdelivr.net/npm/vue-run-static@0.0.7',
  debug: config.debug,
  notExist: function (url) {
    console.log("不存在", url)
    hook.useTip().message('warning', "路由文件不存在");
  }
});

var themes = {
  lavender: [VueRun.lib('/themes/lavender/theme/index.css'), VueRun.lib('/themes/lavender/app.css')],
  green: [VueRun.lib('/themes/green/theme/index.css'), VueRun.lib('/themes/green/app.css')],
  dark: [VueRun.lib('/themes/dark/theme/index.css'), VueRun.lib('/themes/dark/app.css')],
  diablo: ['./themes/diablo/theme/index.css', './themes/diablo/app.css'],
};

VueRun.init(function () {
  app.requestInit();
  Vue.mixin({beforeCreate: hook.setVm});
  new Vue({
    router: app.initRouter(),
    store: app.initStore(),
    data: function () {
      return {
        initSate: false,
        loading: true,
        ProjectName: config.title,
      };
    },
    mounted: function () {
      this.getUserInfo();
    },
    methods: {
      getUserInfo: function () {
        var t = this, store = hook.useStore();
        if (!store.state.token) {
          t.initSate = true;
          return;
        }
        var done = function (data, router) {
          store.commit('setUser', data);
          // 根据情况动态注入路由
          if (config.debug) router = (app.demoMenu()).concat(router)
          store.commit('setRouter', router);

          t.initSate = true;
        };

        return api.user.current().then(function (e) {
          if (e.code === 200) {
            if (!config.navServe) {
              return VueRun.httpRequest('./router.json').then(function (router) {
                if (typeof router === 'string') {
                  router = JSON.parse(router)
                }

                done(e.data, router);
                return e;
              });
            }

            done(e.data, e.data.menu);
          } else {
            hook.useTip().message('warning', e.msg);
            t.initSate = true;
          }
          return e;
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }).$mount('#app');
}, {
  global: {
    hook: 'script/hook.es6',
    util: 'script/util.es6',
    app: 'script/app.es6',
    apiUtil: 'script/api-util.es6',
    api: 'script/api.es6',
  },
  js: [
    VueRun.isSupportEs6('new WeakMap()') ? '' : VueRun.lib('/lib/weakmap-polyfill.js'),
    'getOwnPropertySymbols' in Object ? '' : VueRun.lib('/lib/get-own-property-symbols-polyfill.js'),
    [VueRun.lib('/lib/axios.js'), {async: true}],
    VueRun.lib('/lib/vue-router.js'),
    VueRun.lib('/lib/vuex.js'),
    VueRun.lib('/lib/composition.js'),
    VueRun.lib('/element.js'),
    VueRun.lib('/nprogress/nprogress.js'),
    '//cdn.jsdelivr.net/npm/zls-manage/echarts/echarts.js',
  ],
  css: [
    VueRun.lib('/element.css'),
    VueRun.lib('/fonts/iconfont/iconfont.css'),
    VueRun.lib('/nprogress/nprogress.css'),
  ]//.concat(themes.lavender)
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    if (location.protocol === 'https:') navigator.serviceWorker.register('/sw.js');
  });
  var refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) {
      return;
    }
    refreshing = true;
    window.location.reload();
  });
}