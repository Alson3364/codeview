import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from './routers'
import axios from 'axios'
// import store from "./store"//如果store中的js为index.js，直接这样引入即可
import {store} from "./store/store.js"

Vue.use(VueRouter)

// axion默认根路径
// 使用axios获取数据方式1
axios.defaults.baseURL = 'https://wd9991546176bwmblh.wilddogio.com/'

// 使用axios获取数据方式2
// 配置Vue原型(在任何组件中都可以正常使用axios，使用时直接)
Vue.prototype.http = axios

const router = new VueRouter({
  routes,
  mode:'history',
  scrollBehavior (to, from, savedPosition){
    // return{x:0,y:100}//滑动指定值
    // return{selector:'.btn'} //活动到指定元素
    // 保存滑动位置，返回时还在之前滑动的位置
    if(savedPosition){
      return savedPosition
    }else{
      return{x:0,y:0}
    }

    
  }
})

// 全局守卫
// router.beforeEach((to,from,next)=> {
//   // alert("您还没有登录，请先登录！");
//   // next();
//   // console.log(to);
//   // 判断store.gettes.isLogin === false
 
 
//   if(to.path == '/login'|| to.path == '/register'){//判断是否在登录或者注册页面，如果是，则展示页面，如果不是则跳转至登录界面
//     next();
//   }else{
//     alert("您还没有登录，请先登录！");
//     next('/login');
//   }
// }) 

// 后置钩子
// router.afterEach((to,from)=>{
//   alert("after each");
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
