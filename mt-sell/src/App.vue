<template>
  <div id="app">
    <!-- 头部信息 -->
      <app-header></app-header>
      
      <!-- 导航 -->
      <div class="nav"></div>

      <!-- 内容 -->
      <div class="content">
        内容
      </div>
  </div>
</template>

<script>
import Header from './components/header/Header'
export default {
  name: 'App',
  components:{
    "app-header":Header
  }
}
</script>

<style>

</style>
