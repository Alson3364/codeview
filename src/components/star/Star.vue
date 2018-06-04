<template>
  <div class="star">
    <span class="star-item" v-for="(itemClass,index) in itemClass" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
// 星星的长度
const LENGTH = 5;

// 星星的状态
// 全星
const CLS_ON = 'on';
// 半星
const CLS_HALF = 'half';
// 空星
const CLS_OFF = 'off';

export default {
	props: {
		score: {
			type: Number,
		},
	},
	computed: {
		//   计算星级评价星星全星，半星，空星
		itemClass() {
			//   存放星星的空数组
			let result = [];
			//4.7分,计算分数得出星星状态
			let score = Math.floor(this.score * 2) / 2;

			//4.7分,计算分数得出半星状态个数
			let hasDecimal = score % 1 != 0;

			//4.7分,计算分数得出全星个数
			let integer = Math.floor(score);

			//遍历拥有几颗全星
			for (let i = 0; i < integer; i++) {
				result.push(CLS_ON);
			}

			//   处理半星
			if (hasDecimal) {
				result.push(CLS_HALF);
			}

			//补齐
			while (result.length < LENGTH) {
				result.push(CLS_OFF);
			}
			return result;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star {
	font-size: 0;
}
.star .star-item {
	display: inline-block;
	width: 10px;
	height: 10px;
	margin-right: 3px;
	background-repeat: no-repeat;
	background-size: 10px 10px;
}
.star .star-item:last-child {
	margin-right: 0;
}

/* 三种图片类型*/
.star .on {
	background-image: url(img/star24_on@2x.png);
}
.star .half {
	background-image: url(img/star24_half@2x.png);
}
.star .off {
	background-image: url(img/star24_off@2x.png);
}
</style>
