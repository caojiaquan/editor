<template>
  	<div class="head">
  		<div class="logo"><img src="../../assets/images/logo.png" width="90" height="35" alt=""></div>
  		<div class="bianjibu">编辑部</div>
<!--   		<div class="big_login">
    		<div class="touxiang">
    			<img src="../../assets/images/1.png" width="32" height="32" alt="">Elizabeth
    		</div>
    		<a href="#" class="exit">退出</a>
    	</div> -->
	</div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
	.head {
		height: 58px;
		background: #448ff8;
		overflow: hidden;
		margin: 0 auto;
		width: 100%;
		position:fixed;
		top: 0;
		left: 0%;
		/* margin-left: -640px; */
		min-width: 1280px;
		z-index: 10;

	}

	.logo {
		padding: 11px 0 0 15px;
		float: left;
	}

	.bianjibu {
		float: left;
		line-height: 58px;
		font-size: 20px;
		color: #fff;
		font-weight: bold;
		padding-left: 10px;
	}

	.big_login {
		float: right;
		padding: 11px 15px 0 0;
	}

	.big_login .touxiang {
		float: left;
		line-height: 36px;
		font-size: 14px;
		color: #A9CDFB;
		padding-right: 20px;
	}

	.big_login .touxiang img {
		float: left;
		margin-right: 15px;
		border: 2px solid #A9CDFB;
		border-radius: 32px;
	}

	.big_login a.exit {
		float: left;
		height: 22px;
		line-height: 22px;
		font-size: 14px;
		color: #A9CDFB;
		border-left: 2px solid #609FF9;
		padding-left: 42px;
		margin: 7px 0 0 0;
		background: url(../../assets/images/exit.png) 20px 4px no-repeat;
	}

</style>