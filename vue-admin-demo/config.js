var config = {
    title: '管理后台',
    debug: true
};

VueRun.config({
    cdn: '/vue-admin',
    debug: config.debug,
    version: version,
    notExist: function (url) {
        console.log('不存在', url);
        util.useTip().message('warning', '页面不存在');
    }
});

var assetsCdn = '.'; // 'https://sohaha.73zls.com/vue-admin-template';
var themeConf = {
    name: '',
    nav: 'top',
};

// noinspection JSValidateTypes
VueRun.init(function () {
    app.requestInit();
    Vue.mixin({ beforeCreate: hook.setVm });
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
            var t = this;
            var done = function (data, router) {
                if (config.debug) router = (app.demoMenu()).concat(router);
                t.$store.commit('setRouter', router);
                t.$store.commit('setToken', "123");
                t.$store.commit('setUser', { name: '123' });
                t.initSate = true;
            };
            VueRun.httpRequest('./router.json').then(function (router) {
                if (typeof router === 'string') {
                    router = JSON.parse(router);
                }
                done({}, router);
            });
        },
        computed: {
            title: function () {
                return this.$store.state.viewTitle
            }
        },
        methods: {
            setTitle: function (title) {
                this.$store.commit('setViewTitle', title);
            },

        }
    }).$mount('#app');
}, {
    global: {
        hook: './script/hook.es6',
        util: './script/util.es6',
        app: './script/app.es6',
        apiUtil: './script/api-util.es6',
        api: './script/api.es6',
    },
    js: [
        VueRun.isSupportEs6('new WeakMap()') ? '' : VueRun.lib('/lib/weakmap-polyfill.js'),
        'getOwnPropertySymbols' in Object ? '' : VueRun.lib('/lib/get-own-property-symbols-polyfill.js'),
        [VueRun.lib('/lib/axios.js'), { async: true }],
        VueRun.lib('/lib/vue-router.js'),
        VueRun.lib('/lib/vuex.js'),
        VueRun.lib('/lib/composition.js'),
        VueRun.lib('/element.js'),
        VueRun.lib('/nprogress/nprogress.js'),
    ],
    css: [
        VueRun.lib('/element.css'),
        VueRun.lib('/fonts/iconfont/iconfont.css'),
        VueRun.lib('/nprogress/nprogress.css'),
    ].concat((function () {
        var u = assetsCdn + '/themes/' + themeConf.name;
        return themeConf.name ? [u + '/ui.css', u + '/app.css'] : [];
    })())
});
