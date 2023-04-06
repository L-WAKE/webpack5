//vue 的入口文件
import "./css/index.css";
import "./css/index.less";
import "./css/index.scss";
import $ from "jquery"; // $：表示jquery变量名
import testTree from "../src/js/index";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

let array = {
  hob: {
    age: null,
    hib: [5, 5, 6],
  },
};
let es6Arr = array?.hob?.age ?? 18;
debugger;
console.log("main文件es6Arr", es6Arr);
console.log("testTree2222888", testTree);

// jQuery("body").addClass("add-class");
$("body").addClass("add-class");

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount("#app");

// new Vue({
//   router,
//   el: "#app",
//   render: (h) => h(App),
// });

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
