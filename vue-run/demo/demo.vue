<template>
  <div class="main">
    {{ text }}
    <hr>
    <router-link to="/">点击返回</router-link>
  </div>
</template>

<style>
.main {
  text-align: center;
  color: #41adff;
}
</style>

<script>
/* vue 2 写法 */
const text = "This is Demo";
export default {
  data() {
    return {
      text
    }
  }
}
</script>