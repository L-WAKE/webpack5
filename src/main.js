import "./css/index.css";
import "./css/index.less";
import "./css/index.scss";
import $ from "jquery"; // $：表示jquery变量名
import testTree from "./index";

let array = {
  hob: {
    age: null,
    hib: [5, 5, 6],
  },
};
let es6Arr = array?.hob?.age ?? 18;
debugger;
console.log("main文件es6Arr", es6Arr);
console.log("testTree2222", testTree);

// jQuery("body").addClass("add-class");
$("body").addClass("add-class");
