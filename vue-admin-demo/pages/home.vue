<template>
  <div></div>
</template>
<script>
const { ref, computed } = vue;

export default {
  setup(prop, ctx) {
    hook.useRouter(ctx).push("/main");
    return {};
  },
};
</script>

<style scoped>
</style>
