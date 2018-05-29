<template>
<div class="row">
  <!-- 菜单 -->
  <div class="col-sm-12 col-md-8">
    <table class="table">
      <thead class="thead-default">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>添加</th>
        </tr>
      </thead>
      <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td><strong>{{item.name}}</strong></td>
        </tr>
        <tr v-for="option in item.options" :key="option.size">
          <td>{{option.size}}</td>
          <td>{{option.price}}</td>
          <td><button @click="addToBasket(item,option)" class="btn btn-sm btn-outline-success">+</button> </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 购物车 -->
  <div class="col-md-4 col-sm-12">
    <div v-if="baskets.length > 0">
      <table class="table">
          <thead class="thead-default">
            <tr>
              <th>数量</th>
              <th>品种</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody v-for="item in baskets" :key="item.name">
            <tr>
              <td>
                <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
                <span>{{item.quantity}}</span>
                <button @click="increaseQuanity(item)" class="btn btn-sm">+</button>
              </td>
              <td>{{item.name}}{{item.size}}</td>
              <td>{{item.price * item.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <p>总价：{{total + "RMB"}}</p>
        <button class="btn btn-success btn-block">提交</button>
    </div>
    <div v-else>
      {{basketText}}
    </div>
  </div>
</div>

</template>
<script>
// 使用axios获取数据方式1，必须在想要使用axios的页面引入axios，如下
// import axios from "axios";
export default {
	data() {
		return {
      baskets: [],
      basketText:"购物车还没有任何商品，快去逛逛吧！",
			// getMenuItems: {}
		}
  },
  computed:{
    getMenuItems(){
      //在vuex中获取数据
      // return this.$store.state.menuItems
     // 通过getters获取数据
     return this.$store.getters.getMenuItems
    },
    total(){
      let totalCost = 0
      for(let index in this.baskets){
        let individualItem = this.baskets[index]
        // 总价累加
        totalCost += individualItem.quantity * individualItem.price
      }
      return totalCost
    }
  },
  // 钩子函数
  created(){
    this.fetchData()
  },
	methods: {
   
    // 请求数据库数据
    fetchData(){
       // fetch方法获取数据
      // fetch("https://wd9991546176bwmblh.wilddogio.com/menu.json")
      // .then(res => {
      //   return res.json()
      // })
      // .then(data => {
      //   this.getMenuItems = data
      // })

      // axios方法获取数据方式1
      // axios.get("menu.json")
      // .then(res => this.getMenuItems = res.data)

      // axios方法获取数据方式2
      // this.http.get("menu.json")
      // .then(res => this.getMenuItems = res.data)

      // 将请求下来的数据存储到vuex中
       this.http.get("menu.json")
                .then(res => this.$store.commit("setMenuItems",res.data))
    },
    // 将商品添加到购物车
		addToBasket(item, option) {
      let basket = {
				name: item.name,
				size: option.size,
				price: option.price,
				quantity: 1, 
      }
      
      if(this.baskets.length > 0 ){
        // 过滤
        let result =  this.baskets.filter((basket) => {
          return (basket.name === item.name && basket.price === option.price)
        })

        if(result != null && result.length >0 ){
          result[0].quantity++
        }else{
          this.baskets.push(basket)
        }
      }else{  
			  this.baskets.push(basket);
      }

    },
    // 购物车内减少产品数量
    decreaseQuantity(item){
      item.quantity--
      if(item.quantity <= 0){
        this.removeFromBasket(item)
      }
    },
    // 购物车内增加产品数量
    increaseQuanity(item){
      item.quantity++
    },
    // 当购物车内产品数量为1时，再次点击“-”则清空该产品，如果是最后一件商品则清空购物车
    removeFromBasket(item){
      this.baskets.splice(this.baskets.indexOf(item),1)
    }
	},
};
</script>
