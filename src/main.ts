import Vue from "vue";
import "normalize.css";
import ElementUI from "element-ui";
import SvgIcon from "vue-svgicon";

import "@/styles/element-variables.scss";
import "@/styles/index.scss";

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/icons/components";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
