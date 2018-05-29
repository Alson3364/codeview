<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- new pizza -->
      <app-new-pizza></app-new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <!-- 品种展示 -->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-defatult">
          <tr>
            <th>品种</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td>{{item.name}}</td>
            <td><button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">x</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
// 引入组件NewPizza
import NewPizza from './NewPizza.vue'
export default {
	data() {
		return {
			// getMenuItems:[]
		};
	},
	components: {
		'app-new-pizza': NewPizza,
	},
	computed: {
		getMenuItems: {
			get() {
				//在vuex中获取数据
				// return this.$store.state.menuItems;

				// 通过getters获取数据
				return this.$store.getters.getMenuItems
      },
      set(){}
		}
	},
	created() {
		fetch('https://wd9991546176bwmblh.wilddogio.com/menu.json')
			.then(res => {
				return res.json();
			})
			.then(data => {
				//  console.log(data)
				let menuArray = [];
				for (let key in data) {
					//遍历数据表中的key
					// console.log(key)//打印key
					// console.log(data[key])//打印根据key获取到的对象值
					data[key].id = key; //给每个对象赋值一个ID
					menuArray.push(data[key]);
				}
        // this.getMenuItems = menuArray;

        // 数据同步
        this.$store.commit("setMenuItems",menuArray)
			});
	},
	methods: {
		deleteData(item) {
			fetch('https://wd9991546176bwmblh.wilddogio.com/menu/' + item.id + '/.json', {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then(res => res.json())
				// .then(res => console.log(data))
        // .then(res => this.$router.push({ name: 'menuLink' }))
        .then(data => {
          this.$store.commit('removeMenuItems',item)
        })
				.catch(err => console.log(err));
		},
	},
	// data(){
	//     return{
	//         name:"Henry"
	//     }
	// },
	// 组件内守卫
	// beforeRouteEnter: (to, from, next) => {
	//     // alert("Hello " + this.name);
	//     // next();

	//     next(vm =>{
	//         alert("Hello " + vm.name)
	//     })
	// }

	// beforeRouteLeave: (to, from, next) => {
	//     if(confirm("确定离开此页面么？") == true){
	//         next();
	//     }else{
	//         next(false);
	//     }
	// }
};
</script>
