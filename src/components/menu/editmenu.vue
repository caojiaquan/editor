<template>
	<div class="right-menu">
		<router-link to="/editor/edit" tag="div" class="menu-oper editor">
			<span class="menu-oper-left"></span>
  			<span class="menu-oper-center">编辑器</span>
  			<span class="menu-oper-right"></span>
		</router-link>
		<router-link to="/editor/headline" tag="div" class="menu-oper publish">
			<span class="menu-pub-icon"></span>
  			<span class="menu-pub-font">发布文章</span>
  			<span class="menu-oper-right2"></span>
		</router-link>
  	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		mounted(){
		},
		watch: {
			'$route': function(){
				//console.log(this.$route.path);
     		 	if(this.$route.path != '/editor/edit'){
            		$(".menu-oper.publish").addClass('router-link-active');
            	}
        	}
		}
	}
</script>
<style scoped>
	.right-menu{
		width:154px;
		float: left;
		background:#3e495f;
	}
	.menu-oper{
		margin-top: 30px;
		font-size:14px;
		color:#ffffff;
		line-height: 20px;
		cursor: pointer;
		color:#a7acb5;
	}
	.menu-oper-left{
		display: inline-block;
		width: 18px;
		height: 20px;
		margin-left: 20px;
		margin-right: 9px;
		vertical-align: text-bottom;
		background:url('../../assets/images/nav_list_s.png') no-repeat;
		background-position:0 -170px;
	}
	.menu-oper-right{
		display: inline-block;
		width: 15px;
		height: 11px;
		margin-left: 34px;
		background:url('../../assets/images/going.png') no-repeat;
	}
	.menu-oper-right2{
		display: inline-block;
		width: 15px;
		height: 11px;
		margin-left: 20px;
		background:url('../../assets/images/going.png') no-repeat;
	}
	.menu-pub{
		margin-top:30px;
		font-size:14px;
		color:#ffffff;
		vertical-align: middle;
	}
	.menu-pub-icon{
		display: inline-block;
		width: 16px;
		height: 20px;
		margin-left: 20px;
		margin-right: 10px;
		background:url('../../assets/images/send.png') no-repeat;
		vertical-align: middle;
	}
	.menu-oper-right, .menu-oper-right2{
		display:none;
	}
	.router-link-active{
		color: white;
	}
	.router-link-active .menu-oper-right, .router-link-active .menu-oper-right2{
		display: inline-block;
	}



</style>