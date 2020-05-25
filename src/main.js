import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 把封装的请求方法导入进来
import {postKeyValueRequest} from "../utils/api";
import {postRequest} from "../utils/api";
import {getRequest} from "../utils/api";
import {putRequest} from "../utils/api";
import {deleteRequest} from "../utils/api";

//导入方法后，声明
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
