<template>
  <div class="cartcontrol">
      <!-- transition减号出现的动画 -->
      <transition name="move">
        <!-- 减号  @click.stop.prevent阻止冒泡事件 -->
        <div 
            class="cart-decrease icon-remove_circle_outline"
           @click.stop.prevent="decreaseCart"
            v-show="food.count"
            ></div>
      </transition>
      <!-- 商品数量 -->
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <!-- 加号  @click.stop.prevent阻止冒泡事件-->
    <div 
    class="cart-add icon-add_circle"
     @click.stop.prevent="increaseCart"
    >
        <i class="bg"></i>
    </div>
  </div>
</template>

<script>
// 引入vue
import Vue from 'vue';
export default {
	props: {
		food: {
			type: Object,
		},
	},
	methods: {
		//   减少商品
		decreaseCart() {
			//   console.log(123)
			this.food.count--;
		},
		//   添加商品
		increaseCart() {
			//   console.log(321)
			// 设置商品参数count，使用Vue.set(object,key,value)
			if (!this.food.count) {
				// 如果不存在count这个参数，则设置一个默认值为1的count参数
				Vue.set(this.food, 'count', 1);
			} else {
				this.food.count++;
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(../../common/css/icon.css);
.cartcontrol {
	font-size: 0;
}

.cartcontrol .cart-decrease {
	display: inline-block;
	width: 26px;
	height: 26px;
	font-size: 26px;
	color: #b4b4b4;
}

.cartcontrol .cart-add .bg {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: black;
	position: absolute;
	left: 3px;
	top: 3px;
	z-index: -1;
}

.cartcontrol .cart-count {
	display: inline-block;
	width: 25px;
	text-align: center;
	font-size: 12px;
	line-height: 26px;
	vertical-align: top;
}

.cartcontrol .cart-add {
	display: inline-block;
	width: 26px;
	height: 26px;
	font-size: 26px;
	color: #ffd161;
	position: relative;
}

.move-enter-active,
.move-leave-active {
	transition: all 0.5s linear;
}
.move-enter,
.move-leave-to {
	transform: translateX(20px) rotate(180deg);
}
</style>

