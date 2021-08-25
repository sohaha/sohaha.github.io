<template>
  <div class="relative flex">
    <el-menu
      mode="horizontal"
      :default-active="routePath"
      :router="true"
      :collapse="isCollapse"
      :text-color="textColor"
      :background-color="navBgColor"
      @select="handleSelect"
      active-text-color="#fff"
      unique-opened
      class="flex-1 overflow-hidden h-[60px]"
    >
      <template v-for="(v, i) in state.nav">
        <el-submenu
          v-if="isChildren(v) && navShow(v)"
          :index="'nav-' + i"
          :key="'submenu1-' + i"
        >
          <template slot="title">
            <i v-if="v.hasOwnProperty('icon') && !!v.icon" :class="v.icon"></i>
            <i v-else class="icon-flag"></i>
            <span slot="title" class="menu_title">{{ v.name }}</span>
          </template>
          <el-menu-item
            v-for="(vv, ii) in v['children']"
            :index="vv.path"
            :key="'menuitem-' + ii"
            v-show="vv.meta.show !== false"
          >
            <i
              v-if="vv.hasOwnProperty('icon') && !!vv.icon"
              :class="vv.icon"
            ></i>
            <i v-else class="icon-flag"></i>
            <span>{{ vv.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="!isChildren(v) && navShow(v)"
          :index="v.path"
          :key="'submenu2-' + i"
        >
          <i v-if="v.hasOwnProperty('icon') && !!v.icon" :class="v.icon"></i>
          <i v-else class="icon-flag"></i>
          <span slot="title" class="menu_title">{{ v.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="bg-[#324157] h-[60px] flex items-center text-gray-50 pr-10">
      <div class="mr-5 cursor-pointer" @click="viewCode">查看源代码</div>
      <div class="cursor-pointer" @click="copyCode">复制代码</div>
    </div>

    <el-dialog
      title="源代码"
      :visible.sync="dialogCodeVisible"
      width="80%">
      <el-input
        type="textarea"
        :rows="20"
        placeholder=""
        v-model="codeText">
      </el-input>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogCodeVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
const {useRouter, useStore} = hook;
const {useTip} = util;
const {reactive, toRef, ref, watch, computed} = vue;

const httpReq = (url) => {
  return new Promise((resolve) => {
    let r = new XMLHttpRequest;
    r.open('GET', url);
    r.responseType = 'text';
    r.setRequestHeader('Cache-Control', 'no-cache');
    r.onreadystatechange = function () {
      if (r.readyState === 4) {
        if (r.status >= 200 && r.status < 300) {
          resolve(r.responseText);
        } else {
          resolve('');
        }
      }
    };
    r.send();
  })
}

export default {
  name: "navView",
  props: {
    isCollapse: Boolean,
    default: false,
  },
  setup(prop, ctx) {
    const state = reactive({
      nav: [],
    });

    const navfunc = {
      hasSystems: computed(() => {
        return app.hasPermission("systems");
      }),
      navShow: (nav) => {
        if (navfunc.hasSystems.value) {
          return nav.meta.show !== false;
        }

        if (nav.path === "/main/system") {
          return false;
        }

        return nav.meta.show !== false;
      },
      demoNav: computed(() => {
        const {router: {2: {children: {1: {children: demoNav}}}}} = useStore(ctx).state;
        if (Object.prototype.toString.call(demoNav) === '[object Array]') {
          return demoNav;
        }
        return [];
      }),
      demoNavUrl: computed(() => {
        const {path} = useRouter(ctx).route;
        let url = '';
        navfunc.demoNav.value.forEach((val) => {
          if (val.path === path) {
            url = val.url;
          }
        });
        if (url.startsWith('./')) {
          url = url.slice('./'.length)
        }
        if (url.startsWith('/')) {
          url = url.slice('/'.length)
        }
        if (!!url) {
          url = '/vue-admin-demo/' + url;
        }

        return url;
      }),
      async viewCode() {
        dialogCode.codeText.value = await httpReq(navfunc.demoNavUrl.value);
        dialogCode.dialogCodeVisible.value = true;
      },
      async copyCode() {
        let clipboard = navigator.clipboard;
        if (Object.prototype.toString.call(clipboard) !== '[object Clipboard]') {
          useTip().message("warning", "该浏览器暂不支持复制功能");
          return;
        }

        let codeText = await httpReq(navfunc.demoNavUrl.value);
        await clipboard.writeText(codeText.toString());
        useTip().message("success", "复制成功");
      }
    };

    const currentPath = computed(() => {
      return useRouter(ctx).route.path;
    });

    function activePath(arr) {
      const grandParentCollapse =
        Object.prototype.toString.call(arr[1]) === "[object Object]" &&
        Object.prototype.toString.call(arr[1]["meta"]["collapse"]) !==
        "[object Undefined]" &&
        !!arr[1]["meta"]["collapse"];
      if (!grandParentCollapse) {
        return arr[1] ? arr[1].path : "";
      }

      for (let i = arr.length - 1; i >= 0; i--) {
        const val = arr[i];
        if (currentPath === val.path && val["meta"]["show"]) {
          return val.path;
        } else if (val["meta"]["show"]) {
          return val.path;
        }
      }

      return "/main/main";
    }

    const routePath = computed(() => {
      return activePath(useRouter(ctx)["route"]["matched"]);
    });

    function handleSelect(e) {
      console.log(e);
    }

    const routerOk = computed(
      () => useStore(ctx).state.router.length > 0 && ctx.root.initSate
    );
    watch(
      () => routerOk.value,
      (init) => {
        if (init) {
          console.log("路由准备好了,可以设置导航了");

          state.nav = useStore(ctx).state.router[2]["children"];
        }
      },
      {immediate: true}
    );

    const isChildren = (v) => {
      return v.meta.collapse && v["children"];
    };

    const dialogCode = {
      dialogCodeVisible: ref(false),
      codeText: ref('')
    };

    return {
      routePath,
      handleSelect,
      isChildren,
      navBgColor: ref("#324157"),
      textColor: ref("#b3becd"),
      state,
      ...navfunc,
      ...dialogCode
    };
  },
};
</script>

<style>
.el-menu {
  border: 0 !important;
}

.nav-left {
  overflow: hidden;
  -webkit-transition: width 0.35s cubic-bezier(0.55, 1.03, 0.54, 1.33);
  transition: width 0.35s cubic-bezier(0.55, 1.03, 0.54, 1.33);
}

.nav-left .menu_title {
  font-size: 16px;
  margin-left: 10px;
}

.nav-left .el-scrollbar__wrap {
  overflow-x: hidden;
}

.nav-left .el-menu {
  background: none !important;
}

.nav-left .el-menu-item,
.nav-left .el-submenu__title {
  height: 60px;
}

.el-menu--collapse .el-submenu__title i,
.el-menu-item > .el-tooltip > i {
  margin-right: 0;
}

.nav-left .el-menu-item:focus {
  background: none;
}

.nav_scrollbar {
  /* padding: 5px 0 10px 0; */
  max-height: calc(100vh - 50px);
  box-sizing: border-box;
  margin-bottom: -10px !important;
}

.el-submenu__title,
.el-menu-item[role="menuitem"],
.el-submenu__title:hover {
  background: none !important;
}

.not-collapse ul[role="menu"] .el-menu-item [class^="icon-"] {
  position: absolute;
  left: 30px;
}

ul[role="menu"] .el-menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

ul[role="menu"] .el-menu-item::after {
  content: "";
  margin-right: 5px;
}

.el-menu-item {
  position: relative;
}
</style>
