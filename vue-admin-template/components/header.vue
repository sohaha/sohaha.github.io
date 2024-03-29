<template>
  <el-container :class='isCollapse?"is-collapse":"not-collapse"'>
    <el-aside v-if="themeLeftNav" width="auto" class="header-logo tap" @click.native.prevent="useHandleNav">
      <img src="./static/images/logo.svg" alt="Logo">
    </el-aside>
    <el-main class="header-nav relative">
      <div id='navIcon' v-if="themeLeftNav" class="tap absolute left-0 !hover:(bg-transparent text-[inherit])" @click.prevent="useHandleNav">
        <el-badge class="tip-msg">
          <i class="icon-menu-arrow" :class='isCollapse?"rotate-180":""'></i>
        </el-badge>
      </div>
      <div v-else class="absolute left-0 !w-auto nav-top">
        <nav-top mode="horizontal"></nav-top>
      </div>
      <div class="tap">
        <el-dropdown trigger="click" class="user-menu" @command="useClickMenu">
          <div>
            <el-avatar fit="cover" icon="el-icon-user-solid" class="header-avatar" :src="avatar">
              {{ nickname }}
            </el-avatar>
            <i class="el-icon-caret-bottom el-icon--right"></i>
            <!-- <span class="header-name text-nowrap">{{ nickname }}</span> -->
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="useUser">
              <i class="icon-person"></i> <span>账号信息</span>
            </el-dropdown-item>
            <el-dropdown-item command="useLogs">
              <i class="icon-award-outline"></i> <span>查看消息</span>
            </el-dropdown-item>
            <el-dropdown-item command="useEditPassword">
              <i class="icon-unlock-outline"></i> <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item command="useClear" divided>
              <i class="icon-charging-outline"></i> <span>清除缓存</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <i class="icon-log-out"></i> <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div @click="useLogs" class="tap" v-show="unreadMessageCount">
        <el-badge :value="unreadMessageCount" class="tip-msg">
          <i class="icon-email-outline"></i>
        </el-badge>
      </div>
      <!-- <el-dropdown class="tap" trigger="click">
        <span class="el-dropdown-nav">
          <i class="icon-options-"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="icon-options-"></i><span>系统设置</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </el-main>
  </el-container>
</template>
<script>
let MessageCountTime;
const { useStore, useRouter } = hook;
const { useTip } = util;
const { reactive, ref, watch, computed, onMounted, onBeforeUnmount } = vue;
const { user: userApi, useRequestWith } = api;

export default {
  components: {
    navTop: VueRun('components/nav.vue'),
  },
  name: 'headerView',
  props: {
    logout: Function,
    default: () => {},
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup (prop, ctx) {
    const $store = useStore(ctx);

    onMounted(() => {
      getUnreadMessageCount();
      window['SysGetUnreadMessageCount'] = getUnreadMessageCount;
    });

    onBeforeUnmount(() => {
      setTimeout(() => {
        clearTimeout(MessageCountTime);
      });
    });

    const nickname = computed(() => {
      return $store.getters.nickname;
    });

    const avatar = computed(() => {
      return $store.getters.avatar;
    });

    const unreadMessageCount = computed(() => {
      return $store.state.unreadMessageCount;
    });

    const unreadMessageCountApi = useRequestWith(userApi.unreadMessageCount, { manual: true });

    async function getUnreadMessageCount () {
      clearTimeout(MessageCountTime);

      const [data, err] = await unreadMessageCountApi.run();
      if (err) {
        useTip().message('warning', err);
      } else {
        if ($store.state.unreadMessageCount !== data.count) {
          $store.commit('setUnreadMessageCount', data.count);
        }
      }
      if ($store.state.token && window['messagesRegularly']) {
        MessageCountTime = setTimeout(getUnreadMessageCount, window['messagesRegularly']);
      }
    }

    function useClickMenu (command) {
      if (this[command]) {
        this[command]();
      }
      ctx.emit('click', command);
    }

    function useUser () {
      useRouter(ctx).replace('/main/user/lists?key=' + $store.state.user.username + '&v=' + +new Date());
    }

    function useLogs () {
      useRouter(ctx).replace('/main/user/logs?v=' + +new Date());
    }

    function useClear () {
      VueRun.clearCache();
      location.reload();
    }

    function useHandleNav () {
      ctx.emit('handle');
    }

    return {
      avatar,
      nickname,
      unreadMessageCount,
      getUnreadMessageCount,
      useUser,
      useLogs,
      useClear,
      useClickMenu,
      useHandleNav,
      themeLeftNav:$store.getters.themeLeftNav,
    };
  }
};
</script>

<style scoped>
.header-logo {
  padding: 0 0 0 5px;
  text-align: center;
  color: #2c6eb1;
  font-weight: bold;
  letter-spacing: 2px;
}

.is-collapse .header-logo.tap {
  width: 52px !important;
  overflow: hidden;
}

.header-logo img {
  height: 42px;
  vertical-align: middle;
  padding-bottom: 4px;
  width: 164px;
  display: inline-block;
}

.is-collapse .header-logo img {
  max-width: inherit;
}

.header-nav {
  padding: 0;
  height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  -ms-flex-direction: row-reverse;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  flex-direction: row-reverse;
}

.header-nav > div {
  width: 60px;
  text-align: center;
  padding: 0 10px;
}

.header-nav > div:hover {
  /*background-color: #eaf1f7;*/
  background-color: #28344a;
}

.tip-msg {
  font-size: 30px;
  line-height: 20px;
}

.el-dropdown-nav {
  font-size: 30px;
  line-height: 56px;
}

.header-avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 50%;
  margin: 10px 5px 0 7px;
}

.el-dropdown-menu.el-popper {
  white-space: nowrap;
  margin-top: 5px !important;
}

.header-nav .user-menu.el-dropdown {
  height: 60px;
  line-height: 25px;
  display: block;
  width: 65px;
  text-align: center;
  float: right;
  box-sizing: border-box;
  overflow: hidden;
}

.header-nav .el-icon--right {
  position: absolute;
  right: -3px;
  top: 37px;
  color: #e3e4e4;
}

.header-name {
  display: block;
  font-size: 12px;
  color: #999999;
  border-top: 1px solid #e4e8eb;
  margin-top: 5px;
  padding-top: 2px;
  line-height: 12px;
}

</style>
