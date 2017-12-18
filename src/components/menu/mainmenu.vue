<template>
  	<div class="left-menu">
  			<router-link tag="div" to="/admin" class="menu-options">
  				<span class="menu-icon n1"></span><br/>
  				<span class="menu-fonts">账号管理</span>
  			</router-link>
  			<router-link tag="div" to="/editor" class="menu-options">
  				<span class="menu-icon n2"></span><br/>
  				<span class="menu-fonts">发布</span>
  			</router-link>
  			<router-link tag="div" to="/publish" class="menu-options">
  				<span class="menu-icon n3"></span><br/>
  				<span class="menu-fonts">我的发布</span>
  			</router-link>
  	</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted(){
  },
  methods:{
  	
  }
}
</script>

<style scoped>

	.left-menu{
		float: left;
		width:100px;
		background:#333c4d;
	}
	.right-menu{
		width:154px;
		float: left;
		background:#3e495f;
		min-height: 2000px;
		
	}
	.menu-options{
		width:100px;
		height:100px;
		text-align: center;
		cursor: pointer;
	}
	.menu-icon{
		display: inline-block;
		width:29px;
		height: 29px;
		margin-top:21px;
		margin-bottom: 10px;

	}
	.menu-icon.n1{
		background:url('../../assets/images/group3.png') no-repeat;
		background-position: center center;
	}
	.menu-icon.n2{
		background:url('../../assets/images/group1.png') no-repeat;
		background-position: center center;

	}
	.menu-icon.n3{
		background:url('../../assets/images/group2.png') no-repeat;
		background-position: center center;

	}
	.menu-fonts{
		font-size:16px;
		color:#a7acb5;
	}
	.menu-options.router-link-active{
		background:#3e495f;
	}
	.menu-oper.selected{
		color:white;
	}




	
</style>