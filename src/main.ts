import Vue from "vue";

import "normalize.css";
import ElementUI from "element-ui";
import SvgIcon from "vue-svgicon";

import "@/styles/element-variables.scss";
import "@/styles/index.scss";

import App from "@/App.vue";
import store from "@/store";
import { AppModule } from "@/store/modules/app";
import router from "@/router";
import i18n from "@/lang";
import "@/icons/components";
import "@/permission";
// import "@/utils/error-log";

// import * as directives from "@/directives";
// import * as filters from "@/filters";

Vue.use(ElementUI, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
});

Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em"
});

// // Register global directives
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
// });

// // Register global filter functions
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, (filters as { [key: string]: Function })[key]);
// });

Vue.config.productionTip = false;

Vue.config.errorHandler = function(err) {
  const { message, stack } = err;
  // console.log(stack);
  // Processing error
  // let resourceUrl = "";
  // let col = 0;
  // let line = 0;

  // let errs = stack?.match(/\(.+?\)/);
  // console.log(errs);
  // if (errs && errs.length) errs = errs[0];
  // errs = errs.replace(/\w.+js/g, $1 => {
  //   resourceUrl = $1;
  //   return "";
  // });

  // errs = errs.split(":");
  // if (errs && errs.length > 1) line = parseInt(errs[1] || 0);
  // col = parseInt(errs[2] || 0);

  // Fixed parameters
  // Call the Performance.addError method
  (Performance as any).addError({
    msg: message,
    col: 0,
    line: 0,
    resourceUrl: stack
  });
};

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
