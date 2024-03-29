var config = {
  title: '管理后台',
  baseURL: '',
  timeout: 5000,
  navServe: true,
  debug: false
};

VueRun.config({
  cdn: 'https://resources.73zls.com/vue-admin',
  debug: config.debug,
  version: version,
  notExist: function (url) {
    console.log('不存在', url);
    util.useTip().message('warning', '页面不存在');
  }
});

var assetsCdn = '.'; // 'https://sohaha.73zls.com/vue-admin-template';
var navColorConf = window.navColorConf ? window.navColorConf : {};
var themeConf = {
  name: 'autumn', // ['autumn','lavender', 'green', 'dark', 'diablo']
  nav: 'left',
};

// noinspection JSValidateTypes
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
    computed: {
      title: function () {
        return this.$store.state.viewTitle
      },
      navColor: function () {
        if (themeConf.name) {
          if (navColorConf.hasOwnProperty(themeConf.name)) {
            if (navColorConf[themeConf.name].hasOwnProperty(themeConf.nav)) {
              return navColorConf[themeConf.name][themeConf.nav];
            }
          }
        }
        return {};
      }
    },
    methods: {
      setTitle: function (title) {
        this.$store.commit('setViewTitle', title);
      },
      getUserInfo: function () {
        var t = this, store = hook.useStore();
        if (!store.state.token) {
          t.initSate = true;
          return;
        }
        var done = function (data, router) {
          store.commit('setUser', data);
          // 根据情况动态注入路由
          if (config.debug) router = (router).concat(app.demoMenu());
          store.commit('setRouter', router);

          t.initSate = true;
        };

        var f = [api.useRequestWith(api.user.current(), false).run()];
        if (api.user.apis) {
          f.push(api.useRequest(api.user.apis, false).run());
        }
        return Promise.all(f).then(function (val) {
          var res = val[0], a = val[1];
          if (a[0] && !a[1] && a[0]['code'] === 200) {
            var apiData = a[0]['data'];
            for (var k in apiData) {
              if (apiData.hasOwnProperty(k))
                api[k] = apiData[k];
            }
          }
          var data = res[0];
          var err = res[1];
          if (!err && data) {
            if (!config.navServe) {
              return VueRun.httpRequest('./router.json').then(function (router) {
                if (typeof router === 'string') {
                  router = JSON.parse(router);
                }

                done(data, router);
                return res;
              });
            }

            done(data, data.menu);
            return res;
          }
          if (err) {
            console.log(err);
            util.useTip().message('warning', err);
          }
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
  ].concat((function () {
    var u = assetsCdn + '/themes/' + themeConf.name;
    return themeConf.name ? [u + '/ui.js'] : [];
  })()),
  css: [
    VueRun.lib('/element.css'),
    VueRun.lib('/fonts/iconfont/iconfont.css'),
    VueRun.lib('/nprogress/nprogress.css'),
  ].concat((function () {
    var u = assetsCdn + '/themes/' + themeConf.name;
    return themeConf.name ? [u + '/ui.css', u + '/app.css'] : [];
  })())
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    if (location.protocol === 'https:') navigator.serviceWorker.register('./sw.js');
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
