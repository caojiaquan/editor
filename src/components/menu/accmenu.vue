<template>
	<div class="right-menu">
		<router-link to="/admin/addaccount" tag="div"  class="menu-oper selected">
			<span class="menu-oper-left"></span>
  			<span class="menu-oper-center">添加账号</span>
  			<span class="menu-oper-right"></span>
		</router-link>
		<!-- <router-link to="/admin/adminaccount" tag="div"  class="menu-oper">
			<span class="menu-pub-icon"></span>
			<span class="menu-oper-center">管理账号</span>
		</router-link> -->
	</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.right-menu {
  width: 154px;
  float: left;
  background: #3e495f;
}
.menu-oper {
  margin-top: 30px;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
  cursor: pointer;
  color: #a7acb5;
}
.menu-oper-left {
  display: inline-block;
  width: 18px;
  height: 20px;
  margin-left: 20px;
  margin-right: 9px;
  vertical-align: text-bottom;
  background: url("../../assets/images/nav_list_s.png") no-repeat;
  background-position: 0 -11px;
}
.menu-oper-right {
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-left: 19px;
  background: url("../../assets/images/going.png") no-repeat;
}
.menu-pub {
  margin-top: 30px;
  font-size: 14px;
  color: #ffffff;
  vertical-align: middle;
}
.menu-pub-icon {
  display: inline-block;
  width: 16px;
  height: 20px;
  margin-left: 20px;
  margin-right: 10px;
  background: url("../../assets/images/nav_list_s.png") no-repeat;
  vertical-align: middle;
  background-position: 0 -92px;
}
.menu-pub-font {
}
.menu-oper.router-link-active {
  color: white;
}
</style>