<template>
  <div id="app">
    <!-- 头部信息 -->
      <app-header :poiInfo="poiInfo"></app-header>
      
      <!-- 导航 -->
      <app-nav>

      </app-nav>

      <!-- 内容 -->
     <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
// import Header from './components/header/Header'
export default {
  name: 'App',
  // 注册组件
  components:{
    "app-header":Header,
    "app-nav":Nav
  },
  data(){
    return{
      poiInfo:{}
    }
  },
  // 钩子函数
  created(){
    fetch("/api/goods")
    .then(res => {
      return res.json()
    })
    .then(response => {
      // console.log(response)
      if(response.code ==0){
        this.poiInfo = response.data.poi_info
        // console.log(this.poiInfo)
      }
    })
  }
}
</script>

<style>

</style>
