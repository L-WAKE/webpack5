import Router from "vue-router";

export const constantRoutes = [
  {
    path: "/",
    component: () => import("@/views/home.vue"),
    redirect: "/home",
    children: [],
  },
];

const createRouter = () =>
  new Router({
    mode: "hash",
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
