<template>
  <div class="home">
    <div class="title">我的个人中心</div>
    <button @click="$router.back()">返回</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.home {
  color: rgb(255, 0, 157);
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 30px;
  }
}
</style>
