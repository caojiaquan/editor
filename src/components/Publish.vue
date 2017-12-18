<template>
<div class="container-box"> 
    <header-com></header-com>
    <div class="w1200">
      <div class="left">
        <div class=navlist>
          <mainmenu></mainmenu>
          <sendmenu></sendmenu>
          <catemenupub></catemenupub>
        </div>
      </div>
      <div class="right publish-content">
<!--         <div class="publish-date-box">
          <span class="publish-date-sel">筛选：</span>
          <label class="publish-date">
            <el-radio v-model="radio" label="1">今天</el-radio> 
          </label>
          <label class="publish-date">
            <el-radio v-model="radio" label="2">昨天</el-radio> 
          </label>
          <label class="publish-date">
            <el-radio v-model="radio" label="3">本周</el-radio> 
          </label>
          <label class="publish-date">
            <el-radio v-model="radio" label="4">本月</el-radio> 
          </label>
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div> -->
        <div class="publish-title-box">
          <span class="publish-title-tit">标题</span>
          <span class="publish-title-date">发布日期</span>
          <span class="publish-title-plat">发布平台</span>
        </div>
        <ul v-for="item in moreData">
          <li class="publish-con-list" :class="{ 'have-child': item['son'].length }">
            <div class="publish-main-list">
              <span class="publish-con-font">{{ item['parent'].title }}</span>
              <span class="publish-con-date">{{ item['parent'].regularly_time }}</span>
              <span class="publish-con-num">{{ item['parent'].plat_name }}</span>
            </div>
            <div class="publish-sub-list" v-for="v in item['son']">
              <div>
                <span class="publish-con-font">{{v.title}}</span>
                <span class="publish-con-date">{{v.regularly_time}}</span>
                <span class="publish-con-num">{{v.plat_name}}</span>
              </div>
            </div>
          </li>
        </ul>
<!--         <div>
            <el-pagination class="publish-page"
              layout="prev, pager, next"
              :total="1000"
              :current-page="pageIdex">
            </el-pagination>
        </div> -->
      </div>
    </div>
    <el-button
    type="primary"
    v-loading.fullscreen.lock="fullscreenLoading">
    指令方式
    </el-button>
    <footer-com></footer-com>
</div>
</template>

<script>
import headerCom from "./layout/header.vue";
import footerCom from "./layout/footer.vue";
import preview from "./plugin/preview.vue";
import mainmenu from "./menu/mainmenu.vue";
import sendmenu from "./menu/sendmenu.vue";
import catemenupub from "./menu/catemenupub.vue";

export default {
  data() {
    return {
      radio: "1",
      content: "",
      title: "",
      article_content: "",
      original: "",
      frontcover: 0,
      frontcover_photo: "",
      regularly: false,
      regularly_time: "",
      platname: [],
      arr: [],
      editorOption: {},
      isOne: true,
      isThree: false,
      outerVisible: false,
      innerVisible: false,
      previewStatus: false,
      value6: "",
      moreData: [],
      pageIdex: 1,
      fullscreenLoading: false
    };
  },
  components: {
    headerCom,
    footerCom,
    preview,
    mainmenu,
    sendmenu,
    catemenupub
  },
  mounted: function() {
    var _this = this;
    this.fullscreenLoading = true;
    this.$axios
      .get(_this.$store.state.saveBaseUrl + "/search", {
        params: {
          u_id: 13261095537
        }
      })
      .then(function(data) {
        if (data) {
          console.log(data);
          _this.fullscreenLoading = false;
          _this.moreData = data.data.result || [];
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  updated: function() {},
  computed: {},
  methods: {}
};
</script>


<style scoped>
.publish-page {
  margin-top: 40px;
  margin-left: 200px;
  height: 50px;
}
.publish-content {
  padding: 70px 0 0 0;
  margin: 0 0 0 284px;
}
.publish-main-list {
  cursor: pointer;
}
/*  .publish-main-list.select:before{
    transform: rotate(-90deg);
  }*/
.login_list {
  width: 990px;
  clear: both;
  overflow: hidden;
  margin-left: 13px;
}

.login_list li {
  float: left;
  width: 300px;
  height: 140px;
  border: 1px solid #dedede;
  border-radius: 4px;
  overflow: hidden;
  margin: 60px 0 0 18px;
}

.login_list li img {
  float: left;
}

.login_list li a.btn {
  float: left;
  width: 100px;
  height: 40px;
  background: #419bf9;
  border-radius: 4px;
  line-height: 40px;
  margin: 50px 0 0 30px;
  display: inline;
  text-align: center;
  color: #fff;
  font-size: 16px;
}

.login_list li .login_list_r {
  float: right;
  width: 140px;
  padding: 20px 10px 0 10px;
}

.login_list li .login_list_r span {
  color: #7c7e7d;
  font-size: 16px;
  display: block;
}

.login_list li .login_list_r b {
  color: #3c3c3c;
  font-size: 18px;
  display: block;
  font-weight: normal;
  height: 60px;
  display: table;
}

.login_list li .login_list_r b i {
  line-height: 20px;
  display: table-cell;
  vertical-align: middle;
}

.login_list li .login_list_r p {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
}

.login_list li .login_list_r p a {
  color: #419bf9;
}

.login_list li .login_list_r p a.qie {
  float: right;
}

.inp {
  width: 700px;
  border: 1px solid #ccc;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  border-radius: 3px;
}

.bianjiqi_box {
  width: 800px;
  margin-left: 444px;
  padding-top: 60px;
}

.b_list {
  width: 800px;
  overflow: hidden;
}

.b_list li {
  width: 800px;
  font-size: 14px;
  padding-bottom: 30px;
}

.b_list li .l {
  float: left;
  width: 60px;
  padding-right: 18px;
  text-align: right;
  font-size: 14px;
  color: #666666;
}

.b_list li.n1 {
  height: 380px;
}

.b_list li .tishi {
  font-size: 12px;
  color: #999;
  display: inline-block;
  margin-left: 20px;
}

.b_list li .danxuan {
  display: inline-block;
  cursor: pointer;
  margin-right: 20px;
}

.b_list li .shangchuan {
  width: 700px;
  padding: 6px 0 0 78px;
  float: left;
  height: 92px;
}

.b_list li .shangchuan p {
  float: left;
  width: 122px;
  height: 92px;
  background: url(../assets/images/file.png) no-repeat;
  margin-right: 30px;
}

.b_list li .shangchuan p input {
  display: block;
  width: 122px;
  height: 92px;
  opacity: 0;
}

.b_list li .duoxuan {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.b_list li.btn2 {
  padding: 20px 0 0 78px;
  width: 500px;
}

.b_list li.btn2 a {
  float: left;
  width: 73px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background: #0091ff;
  color: #fff;
  margin-right: 20px;
  border: 1px solid #0091ff;
  border-radius: 2px;
  font-size: 12px;
}

.b_list li.btn2 a.quxiao {
  background: #f7f7f7;
  border: 1px solid #e6e6e6;
  color: #666;
}
.b_list .edit-tools {
  width: 721px;
  float: right;
}
.quill-editor.edit-tools .ql-editor {
  height: 330px;
}
#mceu_24,
#mceu_20 {
  width: 722px;
  height: 330px;
}

#mceu_25-body,
#mceu_21 {
  display: none;
}
.extension-box {
  margin-bottom: 19px;
  margin-top: 6px;
}
.extension span {
  display: inline-block;
}
.extension-her a {
  opacity: 0.85;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  line-height: 12px;
}
.extension-check {
  margin-left: 18px;
}
.extension-use {
  opacity: 0.85;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  line-height: 12px;
  text-align: left;
}
.extension-rule {
  margin-left: 30px;
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #65bcff;
  line-height: 12px;
  text-align: left;
}
.extension .extension-path {
  display: inline-block;
  width: 722px;
  height: 38px;
  background: #fafbfc;
  border: 1px solid #dedede;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -o-border-radius: 2px;
  border-radius: 2px;
  padding-left: 10px;
  margin-left: 79px;
}
.fans span {
  display: inline-block;
}
.fans-check {
  margin-left: 79px;
}
.fans-doubt {
  width: 16px;
  height: 16px;
  background: url("../assets/images/doubt.png") no-repeat;
}
.settime-ipt {
  display: inline-block;
  margin-left: 79px;
}
.settime-date {
  margin-left: 10px;
  opacity: 0.85;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #999999;
  line-height: 12px;
  text-align: left;
  margin-right: 10px;
}
.settime-change {
  opacity: 0.85;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #0091ff;
  line-height: 12px;
  text-align: left;
}
.subtitle-check {
  display: inline-block;
  margin-left: 79px;
}
.subtitle-ipt {
  margin-left: 79px;
  width: 700px;
}
.subtitle-label {
  display: inline-block;
  padding: 10px 0;
}
.tags-ipt {
  display: inline-block;
  margin-left: 79px;
  width: 732px;
  height: 38px;
  margin-top: 29px;
}
.danxuan.original {
  display: inline-block;
  margin-left: 79px;
}
.publish-date-box {
  /* padding-top:100px; */
}
.publish-date-sel {
  font-size: 14px;
  color: #999999;
  line-height: 12px;
}
.publish-date {
  display: inline-block;
  margin-right: 14px;
  font-size: 14px;
  color: #0091ff;
  line-height: 12px;
}
.publish-title-box {
  margin-top: 20px;
  background: #ecf0f6;
  border-radius: 3px;
  width: 807px;
  height: 36px;
  line-height: 36px;
}
.publish-title-box span {
  display: inline-block;
  font-size: 14px;
  color: #333333;
  line-height: 12px;
}
.publish-title-tit {
  margin-left: 48px;
}
.publish-title-date {
  margin-left: 375px;
}
.publish-title-plat {
  margin-left: 150px;
}
.publish-con-list {
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 2px 2px 0 0;
  width: 807px;
  line-height: 60px;
  margin: 8px 0;
  box-shadow: 1px 1px 6px #d0d0d078;
  -webkit-box-shadow: 1px 1px 6px #d0d0d078;
  -moz-box-shadow: 1px 1px 6px #d0d0d078;
}
.publish-con-font {
  display: inline-block;
  width: 400px;
  font-size: 14px;
  color: #333333;
  line-height: 12px;
}
.publish-con-list.have-child .publish-main-list .publish-con-font:before {
  content: "";
  width: 10px;
  height: 10px;
  display: inherit;
  margin-left: 20px;
  margin-right: 16px;
  background: url("../assets/images/arrow.png") no-repeat;
  background-position: center center;
  transform: rotate(-90deg);
}
.publish-con-list.have-child .publish-main-list.select .publish-con-font:before {
  transform: rotate(0deg);
}
.publish-con-date {
  display: inline-block;
  width: 170px;
  padding: 0 15px;
  font-size: 14px;
  color: #999999;
  line-height: 12px;
}
.publish-con-num {
  display: inline-block;
  width: 190px;
  font-size: 14px;
  color: #666666;
  line-height: 12px;
}
.publish-con-list .publish-main-list .publish-con-font {
  padding: 0 0 0 46px;
  box-sizing: border-box;
}
.publish-con-list.have-child .publish-main-list .publish-con-font {
  padding: 0 0 0 0;
  box-sizing: border-box;
}
.publish-con-list .publish-sub-list .publish-con-font{
  padding: 0 0 0 46px;
  box-sizing: border-box;

}
.publish-sub-list .publish-con-font:before {
  background: white;
}
.publish-main-list.select {
  background-color: #e6f0ff;
}
.publish-sub-list {
  background: #fdfdfd;
  border-top: 1px solid #dedede;
  display: none;
}
.publish-sub-list:hover {
  background-color: #f2f7ff;
}
</style>