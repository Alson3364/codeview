// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

Vue.config.productionTip = false

// 使用路由
Vue.use(VueRouter)

// 设置路由
const routes = [
  {path:'/',redirect: "/goods"},//默认路由
  {path:"/goods",component:Goods},
  {path:"/ratings",component:Ratings},
  {path:"/seller",component:Seller}
]

// 实例化一个router
const router = new VueRouter({
  routes,
  linkActiveClass:"active",//给链接添加激活样式
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
