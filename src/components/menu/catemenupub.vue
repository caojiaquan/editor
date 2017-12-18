<template>
	<div class="category-list">
<!-- 		<div class="category-item selected">
			<span class="category-item-fir">头条号</span><br/>
			<span class="category-item-sec">账号:toutiao123</span>
		</div>
		<div class="category-item">
			<span class="category-item-fir">百家号</span><br/>
			<span class="category-item-sec">账号:toutiao123</span>
		</div> -->
<!-- 		<div class="category-item">
			<span class="category-item-fir">网易号</span><br/>
			<span class="category-item-sec">账号:toutiao123</span>
		</div> -->
<!-- 		<div class="category-item">
			<span class="category-item-fir">企鹅号</span><br/>
			<span class="category-item-sec">账号:toutiao123</span>
		</div> -->
<!-- 		<div class="category-item">
			<span class="category-item-fir">UC号</span><br/>
			<span class="category-item-sec">账号:toutiao123</span>
		</div> -->
	</div>

</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted(){
  	this.init();
  },
  methods:{
  	init(){

  		$(".category-item").on('click', function(){
  			$(this).addClass('selected').siblings().removeClass('selected');
  		});
  	}
  }
}
</script>

<style scoped>
	.category-list{
		float: left;
		background:#f8f9fc;
	}
	.category-item{
		width:160px;
		height: 90px;
		padding-top:15px;
		cursor: pointer;
	}
	.category-item:hover{
		/*opacity:0.14;*/
		background:#448ff8;
		width:160px;
		height:90px;
	}
	.category-item.selected{
		background:#fff;
	}
	.category-item-fir{
		display: inline-block;
		font-size:20px;
		color:#333c4d;
		margin-bottom:15px;
		margin-left: 20px;
		margin-top:10px;
	}
	.category-item-sec{
		font-size:12px;
		color:#999999;
		line-height:12px;
		margin-left: 20px;
	}

</style>