<template>
  <div id="app">
    <!-- 头部 -->
    <app-header :poiInfo="poiInfo"></app-header>

    <!-- 导航 -->
    <app-nav></app-nav>

    <!-- 内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Nav from './components/nav/Nav'

export default {
  name: 'App',
  components: {
    "app-header":Header,
    "app-nav":Nav
  },
  data(){
    return{
      poiInfo:{

      }
    }
  },
  // 钩子函数请求头部数据
  created(){
    fetch("/api/goods")
    .then(res => {
      return res.json()
    })
    .then(response => {
      // console.log(response)
      if(response.code == 0){
        // 拿到头部数据，赋值给poiInfo
        this.poiInfo = response.data.poi_info
        // console.log(this.poiInfo)
      }
    })
  }
}
</script>

<style>
</style>
