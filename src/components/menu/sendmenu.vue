<template>
	<div class="right-menu">
		<div class="menu-oper selected">
			<span class="menu-oper-left"></span>
  			<span class="menu-oper-center">发布</span>
  			<span class="menu-oper-right"></span>
		</div>
  	</div>
</template>
<script>
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
		background:url('../../assets/images/nav_list_s.png') no-repeat;
		background-position:0 -330px;
		vertical-align: text-bottom;
		
	}
	.menu-oper-right{
		display: inline-block;
		width: 11px;
		height: 11px;
		margin-left: 34px;
		background:url('../../assets/images/going.png') no-repeat;
	}
	.menu-pub{
		margin-top:30px;
		font-size:14px;
		color:#ffffff;
		vertical-align: middle;
	}

	.menu-oper.selected{
		color:white;
	}


</style>