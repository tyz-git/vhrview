import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Test1 from '../views/Test1'
import Test2 from '../views/Test2'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    hidden: true
  },
  {
      path: '', //写不写都没有关系，这个制作菜单栏遍历
      name: '导航栏一',
      component: Home,
      children: [
          //当拦截到test1的请求时会替换Home(父组件)组件中的router-views,不会替换App.vue中的router-view
          {
              path: '/test1',
              name: 'Test1',
              component: Test1
          },
          {
              path: '/test2',
              name: 'Test2',
              component: Test2
          }
      ]
  }
]

const router = new VueRouter({
  routes
})

export default router
