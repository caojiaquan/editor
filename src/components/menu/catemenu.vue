<template>
	<div class="category-list">
		<router-link to="/editor/headline" tag="div" class="category-item">
			<span class="category-item-fir">头条号</span><br/>
			<!-- <span class="category-item-sec">账号:toutiao123</span> -->
		</router-link>
		<router-link to="/editor/hundred" tag="div" class="category-item">
			<span class="category-item-fir">百家号</span><br/>
			<!-- <span class="category-item-sec">账号:toutiao123</span> -->
		</router-link>
<!-- 		<router-link to="/editor/netease" tag="div" class="category-item">
			<span class="category-item-fir">网易号</span><br/>
			<span class="category-item-sec">账号:toutiao123</span>
		</router-link> -->
		<router-link to="/editor/penguins" tag="div" class="category-item">
			<span class="category-item-fir">企鹅号</span><br/>
			<!-- <span class="category-item-sec">账号:toutiao123</span> -->
		</router-link>
<!-- 		<router-link to="/editor/uc" tag="div" class="category-item">
			<span class="category-item-fir">UC号</span><br/>
			<span class="category-item-sec">账号:toutiao123</span>
		</router-link> -->
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
  		
  	}
  }
}
</script>

<style scoped>
	.category-list{
		float: left;
		background-color:#f8f9fc;
	}
	.category-item{
		width:160px;
		height: 90px;
		padding-top:15px;
		transition: all .2s ease 0s;
		cursor: pointer;
	}
	.category-item:hover{
		width:160px;
		height:90px;
	}

	.category-item.selected{
		background-color:#fff;
	}
	.category-item-fir{
		display: inline-block;
		font-size:20px;
		color:#333c4d;
		/* margin-bottom: 15px; */

		margin-top: 28px;
		text-align: center;
		display: block;

		transition: all .2s ease 0s;
	}
	.category-item:hover .category-item-fir,
	.category-item.router-link-active .category-item-fir {
		color: #448ff8;
	}
	.category-item-sec{
		font-size:12px;
		color:#999999;
		line-height:12px;
		margin-left: 20px;
	}
	.category-item.router-link-active{
		background-color: #d7e5f9;
	}

</style>