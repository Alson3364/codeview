<template>
  <div id="app">
    <!-- 头部 -->
    <app-header :poiInfo="poiInfo"></app-header>

    <!-- 导航 -->
    <app-nav :commentNum="commentNum"></app-nav>

    <!-- 内容 -->
    <!-- <keep-alive>主要用于保留组件状态或者避免重新渲染 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
      poiInfo:{},
      commentNum:0
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

    // 请求rating数据
    fetch("/api/ratings")
    .then(res => {
      return res.json()
    })
    .then(response => {
      // console.log(response)
      if(response.code == 0){
        // 拿到评价条数数据，赋值给poiInfo
        this.commentNum = response.data.comment_num
        // console.log(this.poiInfo)
      }
    })
  }
}
</script>

<style>
</style>
