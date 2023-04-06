<template>
  <!-- <div id="app">
    <p class="example">app{{ msg }}</p>
    <button @click="tap">点击</button>
  </div> -->
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "我是一条信息",
    };
  },
  methods: {
    tap() {
      console.log("23234");
    },
  },
};
</script>
<style>
.example {
  color: red;
}
</style>
