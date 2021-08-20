<template>
  <div>
    <div class="view-title float-clear">
      <!--占位-->
    </div>
    <fieldset>
      <legend>{{ title }}</legend>
      <aside class="center" :aria-label="title"></aside>
    </fieldset>
  </div>
</template>

<script>
const { ref, computed } = vue;

export default {
  setup(prop, ctx) {
    return {
      title: computed(() => ctx.root.title),
    };
  },
};
</script>

<style>
</style>