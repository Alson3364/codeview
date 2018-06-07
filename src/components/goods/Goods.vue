<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场 -->
        <li 
				class="menu-item" 
				:class="{'current':currentIndex === 0}" 
				@click="selectMenu(0)"
				>
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
            {{container.tag_name}}
          </p>
        </li>
         <!-- 其他商品菜单 -->
        <li 
				class="menu-item" 
				:class="{'current':currentIndex === index + 1}" 
				v-for="(item,index) in goods" 
				:key="index" 
				@click="selectMenu(index+1)"
				>
          <p class="text">
            <img  class="icon" :src="item.icon" v-if="item.icon">
            {{item.name}}
          </p>
					<i class="num" v-show="calculateCount(item.spus)">
						{{calculateCount(item.spus)}}
					</i>
        </li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </div>
        </li>

        <!-- 其他分类 -->
        <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>

          <!-- 具体的商品列表 -->
          <ul>
            <!-- 遍历商品数据 -->
            <li v-for="(food,index) in item.spus" :key="index" class="food-item" @click="showDetail(food)">
              <!-- 背景图 -->
              <div class="icon" :style="head_bg(food.picture)"></div>
              <!-- 内容 -->
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <!-- 月销售 -->
                  <span class="saled">{{food.month_saled_content}}</span>
                  <!-- 点赞 -->
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <!-- 商品图片 -->
                <img class="product" :src="food.product_label_picture" alt="">
                <p class="price">
                  <!-- 价格 -->
                  <span class="text">￥{{food.min_price}}</span>
                  <span class="text">/{{food.unit}}</span>
                </p>
              </div>
			  <div class="cartcontrol-wrapper">
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 购物车 -->
		<!-- :poiInfo="poiInfo" 属性传值，将获取到的数据传到购物车组件 -->
		<app-shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></app-shopcart>

    <!-- 商品详情 -->
	<app-product-detail :food="selectFood" ref="foodView"></app-product-detail>
    
  </div>
</template>

<script>
// 引入滚动插件
import BScroll from 'better-scroll'
// 引入购物车组件
import Shopcart from '../shopcart/Shopcart'
// 引入CartControl增减商品组件
import CartControl from '../cartcontrol/Cartcontrol'
// 引入ProductDetail商品详情组件
import ProductDetail from '../productDetail/ProductDetail'
export default {
	data() {
		return {
			container: {},
			goods: [],
			poiInfo:{},
			listHeight:[],
			menuScroll:{},
			foodScroll:{},
			scrollY:0,
			selectFood:{}
		}
	},
	// 计算属性不能接收参数
	methods: {
		head_bg(imgName) {
			return 'background-image: url(' + imgName + ');';
		},
		// 实例化滚动方法，标记可实现滚动的元素
		initScroll(){
			this.menuScroll = new BScroll(this.$refs.menuScroll,{
				click:true
			})
			this.foodScroll = new BScroll(this.$refs.foodScroll,{
				probeType:3,
				// 设置click:true使得Cartcontrol.vue组件中的添加商品事件increaseCart与减少商品事件decreaseCart生效
				click:true
			})

			//foodScroll 监听事件
			this.foodScroll.on("scroll",(pos) => {
				// console.log(pos.y)
				this.scrollY = Math.abs(Math.round(pos.y))
				//  console.log(this.scrollY)

			})
		},
		// 计算每个菜单分类的区间高度
		calculateHeight(){
			// 获取所有分类元素,并将其放入数组foodlist中
			let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
			// console.log(foodlist)
			let height = 0
			// 第一个区间高度
			this.listHeight.push(height)

			for(let i=0;i<foodlist.length;i++){
				// 拿到其他每个元素
				let item = foodlist[i]
				// 累加
				height += item.clientHeight
				this.listHeight.push(height)
			}
				// console.log(this.listHeight)
		},
		// 左侧菜单点击事件
		selectMenu(index){
			// console.log(index)
			let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
			let element = foodlist[index]
			// console.log(element)
			// 滚动到对应元素的位置
			this.foodScroll.scrollToElement(element,250)
		},
		// 右侧在对应区间添加商品后，左侧菜单上显示该分类中选择的商品数量
		calculateCount(spus){
			let count = 0
			// 遍历所选商品分类中的商品数量
			spus.forEach((food) => {
				if(food.count > 0){
					count += food.count
				}
			})
			return count
		},
		showDetail(food){
			// 将点击的商品赋值给food
			this.selectFood = food
			// 调用显示商品详情页面事件
			this.$refs.foodView.showView()
		}
	},
	// 钩子函数请求商品数据
	created() {
		fetch('/api/goods')
			.then(res => {
				return res.json();
			})
			.then(response => {
				// console.log(response)
				if (response.code == 0) {
					// 获取到商品数据，赋值给container

					this.container = response.data.container_operation_source
					this.goods = response.data.food_spu_tags

					// 获取商家信息并赋值给poiInfo
					this.poiInfo = response.data.poi_info
					// console.log(this.container)
					// console.log(this.goods)
					// console.log(this.poiInfo)

				// 当DOM已经更新后才会执行$nextTick方法里的方法
				this.$nextTick(() => {
						// 执行滚动方法
					this.initScroll()

					// 实现左侧菜单根据右侧下拉进行变化
					// 1.计算每个分类的区间高度
					this.calculateHeight()
					// 2.监听滚动的位置
					// 3.根据滚动位置确认下标，与左侧菜单对应
					// 4.通过下标实现点击左侧，右侧滚动到对应区间
				})
				}
			})
	},
	
	computed:{
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){
				// 获取商品区间的范围
				let height1 = this.listHeight[i]
				let height2 = this.listHeight[i+1]
				// 是否在上述区间中
				if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
					// console.log(i)
					return i;
				}
			}
				return 0
		},
		// 监听数组food是否发生变化
		selectFoods(){
			let foods = []
			// 遍历商品数据
			this.goods.forEach((myfoods) => {
				// 遍历商品数组spus中的商品
				myfoods.spus.forEach((food) => {
					if(food.count > 0){//如果count发生变化，既点击添加了商品
						// 将数据push到数组food中
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
	components:{
		"app-shopcart":Shopcart,
		"app-cart-control":CartControl,
		"app-product-detail":ProductDetail
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods {
	display: flex;
	position: absolute;
	top: 190px;
	bottom: 51px;
	overflow: hidden;
	width: 100%;
}

.goods .menu-wrapper {
	flex: 0 0 85px;
	background: #f4f4f4;
	/* background: red; */
}

.goods .foods-wrapper {
	flex: 1;
	/* background: blue; */
}

/* Menu item */
.goods .menu-wrapper .menu-item {
	padding: 16px 23px 15px 10px;
	border-bottom: 1px solid #e4e4e4;
	position: relative;
}

.goods .menu-wrapper .menu-item .text {
	font-size: 13px;
	color: #333333;
	line-height: 17px;
	vertical-align: middle;
	/*-webkit-line-clamp 限制在一个块元素显示的文本的行数，此处限制菜单名称只显示两行，多余部分隐藏 */
	-webkit-line-clamp: 2;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.goods .menu-wrapper .menu-item .text .icon {
	width: 15px;
	height: 15px;
	vertical-align: middle;
}

/* 专场样式 */
.goods .foods-wrapper .container-list {
	padding: 11px 11px 0 11px;
	border-bottom: 1px solid #e4e4e4;
}

.goods .foods-wrapper .container-list img {
	width: 100%;
	margin-bottom: 11px;
	border-radius: 5px;
}

/* 具体分类商品布局 */
.goods .foods-wrapper .food-list {
	padding: 11px;
}

.goods .foods-wrapper .food-list .title {
	height: 13px;
	font-size: 13px;
	background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
	background-size: 2px 10px;
	padding-left: 7px;
	margin-bottom: 12px;
}

.goods .foods-wrapper .food-list .food-item {
	display: flex;
	margin-bottom: 25px;
	position: relative;
}

.goods .foods-wrapper .food-list .food-item .icon {
	flex: 0 0 63px;
	background-position: center;
	background-size: 120% 100%;
	background-repeat: no-repeat;
	margin-right: 11px;
	height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content {
	flex: 1;
}

/* 具体内容样式 */
.goods .foods-wrapper .food-list .food-item .content .name {
	font-size: 16px;
	line-height: 21px;
	color: #333333;
	margin-bottom: 10px;
	padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc {
	font-size: 10px;
	line-height: 19px;
	color: #bfbfbf;
	margin-bottom: 8px;

	/* 超出部分显示省略号*/
	-webkit-line-clamp: 1;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra {
	font-size: 10px;
	color: #bfbfbf;
	margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled {
	margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product {
	height: 15px;
	margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price {
	font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text {
	font-size: 14px;
	color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit {
	font-size: 12px;
	color: #bfbfbf;
}

/* 当前选中 */
.goods .menu-wrapper .menu-item.current {
	background: white;
	font-weight: bold;
	margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current {
	margin-top: 1px;
}

.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper {
	position: absolute;
	right: 0;
	bottom: 0;
}

.goods .menu-wrapper .menu-item .num {
	position: absolute;
	right: 5px;
	top: 5px;
	width: 13px;
	height: 13px;
	border-radius: 50%;
	color: white;
	background: red;
	text-align: center;
	font-size: 7px;
	line-height: 13px;
}
</style>
