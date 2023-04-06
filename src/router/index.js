import Vue from "vue";
//1.引入路由
import Router from "vue-router";
//2.安装 路由
Vue.use(Router);

//3.定义组件
const routes = [
  {
    path: "/",
    component: () => import("@/views/home.vue"),
  },
];
// 4. 创建路由实例
const router = new Router({
  routes,
});

export default router;
