import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 把封装的请求方法导入进来
import {postKeyValueRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'

//导入方法后，声明
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false
Vue.use(ElementUI);

//全局前置守卫:可以监听所有页面跳转。to:目的地 from:起始地 next:执行next后续代码才会执行，不执行next就不会执后续逻辑
router.beforeEach((to, from, next) => {
  //如果去的是login页,直接放行
  if (to.path == '/'){
    next();
  }else {
    //如果用户没有登录就请求接口，先跳转到登录页让用户登录
    if (window.sessionStorage.getItem("user")){
        //如果跳转其他页面就去从后台加载菜单数据
        initMenu(router, store);
        next();
    }else {
        //如果用户在没登录的情况下想访问其他接口，那么把用户想访问的接口保存下来，用户登录后直接请求刚才用户想请求的接口(为了用户体验更好)
        if (to.path){
            next("/?redirect="+to.path);
        }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
