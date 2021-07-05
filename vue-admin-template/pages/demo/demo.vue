<template>
  <div>
    <div class="view-title float-clear">
      <!--占位-->
    </div>
    <fieldset>
      <legend @click="useDemoClick">{{ title }}</legend>
      <aside class="center" :aria-label="title">
        <qriously class="flex justify-evenly" :size="160"
                  value="https://docs.73zls.com/zls-php/#/packages-manage/started"></qriously>
        开发手册
        <a
          href="https://docs.73zls.com/zls-php/#/packages-manage/started"
          target="_blank"
        >zls-manage</a>
        <br>UI 文档
        <a
          href="http://element-cn.eleme.io/#/zh-CN/component/layout"
          target="_blank"
        >element@2.13.0</a>
        <br>主题定制
        <a
          href="https://elementui.github.io/theme-chalk-preview/#/zh-CN"
          target="_blank"
        >#2c6eb1/#324157</a>
        <br>字体图标库
        <a href="https://www.iconfont.cn/collections/detail?cid=14834" target="_blank">iconfont</a>
      </aside>
    </fieldset>
    <div>
      <demo></demo>
      <demo></demo>
    </div>
  </div>
</template>
<script>
const {ref, reactive, computed, onMounted, watch} = vue;

import Demo from '@/components/demo.vue';

export default load({js: ['//cdn.jsdelivr.net/npm/zls-manage/qriously/qriously.js']}).then(async () => {
  return {
    components: {
      Demo
    },
    setup(prop, ctx) {
      const title = ref(ctx.root.title)
      function useDemoClick() {
        title.value = "示例" + +new Date();
      }

      return {
        title,
        useDemoClick
      };
    }
  };
});
</script>

<style scoped>
</style>
