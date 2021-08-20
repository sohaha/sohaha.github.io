<template>
  <div>
    <div class="view-title float-clear"></div>
    <fieldset>
      <legend>{{ title }}</legend>
      <aside class="center p-10" :aria-label="title">
        <span class="mb-3 block">
          开发手册
          <a
            href="https://docs.73zls.com/zls-php/#/packages-manage/started"
            target="_blank"
            >zls-manage
          </a>
        </span>
        <span class="mb-3 block"
          >UI 文档
          <a
            href="http://element-cn.eleme.io/#/zh-CN/component/layout"
            target="_blank"
            >element@2.13.0
          </a>
        </span>
        <span class="mb-3 block"
          >主题定制
          <a
            href="https://elementui.github.io/theme-chalk-preview/#/zh-CN"
            target="_blank"
            >#2c6eb1/#324157
          </a>
        </span>
        <span class="mb-3 block"
          >字体图标库
          <a
            href="https://www.iconfont.cn/collections/detail?cid=14834"
            target="_blank"
            >iconfont
          </a>
        </span>
      </aside>
    </fieldset>
  </div>
</template>
<script>
const { computed } = vue;

export default {
  setup(prop, ctx) {
    return {
      title: computed(() => ctx.root.title),
    };
  },
};
</script>

<style scoped>
</style>
