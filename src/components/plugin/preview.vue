<template>
	<div v-show="preStatus" class="mobile-box">
	  <div class="mobile">
		<div class="mobile-pre">
		  <h1 class="mobile-title">{{title}}</h1>
		  <div class="mobile-headicon">
			<span class="mobile-icon">泡泡网</span>
			<span class="mobile-date">2017-08-08</span>
		  </div>
		  <div class="view-contet" v-html="viewContet">
		  </div>
		</div>
	  </div>
	  <div  class="mask" @click="preStatus = false" v-show="preStatus"></div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["viewContet", "title"],
  computed: {
    preStatus: {
      get() {
        return this.$store.state.preStatus;
      },
      set(newValue) {
        this.$store.state.preStatus = newValue;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.mobile-box {
  position: relative;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  z-index: 2000;
}
.mobile {
  width: 312px;
  height: 637px;
  background: url("../../assets/images/mobilebox.png") no-repeat;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -318px;
  margin-left: -156px;
  z-index: 2001;
}
.mobile-pre {
  width: 262px;
  height: 480px;
  padding: 4px;
  margin-left: 21px;
  margin-top: 77px;
  overflow: scroll;
}
.mobile-title {
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #333333;
  text-align: left;
}
.mobile-headicon {
  margin-top: 10px;
  margin-bottom: 10px;
}
.mobile-headicon span {
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: #999999;
  text-align: left;
}
.mobile-date {
  margin-left: 20px;
}
.view-contet {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #666666;
  text-align: left;
}
.view-contet img {
  width: 262px !important;
}
</style>