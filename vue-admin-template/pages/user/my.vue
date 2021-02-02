<template>
  <div>
    <div class="view-title float-clear"></div>
    <fieldset>
      <legend v-text="title"></legend>
      <aside class="center" aria-label="开发说明">
        <el-container>
          <el-aside width="auto">
            <el-tabs tab-position="left">
              <el-tab-pane label="个人资料"></el-tab-pane>
            </el-tabs>
          </el-aside>
          <el-main>
            <div>
              <el-image style="width: 200px; height: 200px" :src="avatar" fit="cover"></el-image>
              <div> {{ nickname }} </div>
            </div>
          </el-main>
        </el-container>
      </aside>
    </fieldset>
  </div>
</template>
<script>
const { ref, reactive, computed, onMounted, watch, onBeforeUnmount } = vue;

export default {
  components: {},
  setup (prop, ctx) {
    const $store = hook.useStore(ctx);

    let title = ref('个人设置');

    const nickname = computed(() => {
      return $store.getters.nickname;
    });

    const avatar = computed(() => {
      return $store.getters.avatar;
    });

    return {
      title,
      nickname,
      avatar
    };
  }
};
</script>

<style scoped>
.page-user-menu .tree-placeholder {
  display: inline-block;
  width: 20px;
  line-height: 20px;
  height: 20px;
  text-align: center;
  margin-right: 3px;
}
</style>
