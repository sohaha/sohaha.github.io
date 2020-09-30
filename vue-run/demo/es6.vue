<template>
  <div class="main">
    {{ text }}
    <hr>
    <router-link to="/"> 点击返回</router-link>
  </div>
</template>

<style scoped>
/* 支持 scoped */
.main {
  color: #ffbe85;
}
</style>

<script>
/* vue 3 写法 */
const {ref} = vue;
export default {
  components: {},
  setup(prop, ctx) {
    const text = ref("This is ES6 Demo，1s 后改变");
    setTimeout(() => {
      text.value = "时间到，变变变"
    }, 1000)
    return {text}
  }
}
</script>

