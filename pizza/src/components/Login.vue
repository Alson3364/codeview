<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img src="../../src/assets/icon.png" alt="" class="mx-auto d-block">
          <form @submit.prevent="onSubmit" >
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button class="btn btn-block btn-success" type="submit">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      email:'',
      password:''
    }
  },
  // 组件内的守卫 设置组件内守卫，当退出登录后，清空用户账户信息,header内不再显示用户名
  beforeRouteEnter: (to, from, next) => {
    // this.$store.dispatch("setUser",null)//不能使用this，无法识别，必须使用next()方法传递一个回调函数，使用vm实例
    next(vm => vm.$store.dispatch("setUser",null))
  },
  methods:{
    onSubmit(){
      axios.get('/users.json')
      .then(res => {
        // 打印所有用户信息
        // console.log(res.data)
        const data = res.data
        const users = []
        for(let key in data){
          const user = data[key]
          // console.log(user)
          users.push(user)
        }
        // console.log(user)
        // 实现过滤
        let result = users.filter((user)=>{
          return user.email === this.email && user.password === this.password
        })
        // console.log(result)
        // 判断result的长度是否大于零
        if(result != null && result.length > 0){
          //登陆成功，将用户名email传值到header中
          this.$store.dispatch("setUser",result[0].email)
          this.$router.push({name:'homeLink'})
        }else{
          alert('账号或密码不正确')
          // 登录失败传值为null
          this.$store.dispatch("setUser",null)
        }
      })
    }
  }
}
</script>
