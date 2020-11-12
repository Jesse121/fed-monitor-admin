import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css";
import "@/styles/index.scss";
import App from "./App";
import store from "./store";
import router from "./router";
import * as filters from "./filters";
import "@/icons";
import "@/permission";

Vue.use(ElementUI);

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

Vue.config.errorHandler = function(err) {
  const { message, stack } = err;
  Performance.addError({
    type: "vueError",
    data: {
      url: location.href,
      msg: message,
      stack
    }
  });
};

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
