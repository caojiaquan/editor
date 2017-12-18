<template>
	<div class="right">
        <div class="bianjiqi_box">
          <ul class="b_list">
            <li><span class="l">文章标题</span>
              <input type="text" class="inp" placeholder="6-40个汉字" v-model="title">
              <span class="hint" v-show=" this.title != '' ? false : true ">文章标题不符合要求，6-40个汉字</span>
            </li>
            <li class="clearfix"><span class="l">正文</span>
              <editor ref="myTextEditor"
                  :fileName="'myFile'"
                  :uploadUrl="uploadUrl"
                  v-model="content">
              </editor>
              <span class="hint" v-show=" this.content != '' ? false : true ">文章内容不能为空</span>
            </li>
            <li><span class="l">原创</span>
              <label for="isorigin">
                <i class="danxuan">
                  <el-radio v-model="original" :label="1" id="isorigin">是</el-radio>
                </i>
              </label>
              <label for="notorigin">
                <i class="danxuan">
                <el-radio v-model="original" :label="0" id="notorigin">否</el-radio>
              </i>
              </label>
            </li>
            <li class="clearfix"><span class="l">封面</span>
                   <el-radio v-model="frontcover" label="0" id="cover-one">单图</el-radio>
                  <el-radio v-model="frontcover" label="1" id="cover-three">三图</el-radio>
              <i class="tishi">请使用尺寸大于360*270的图片，支持jpg或png格式。</i>
              <div class="shangchuan clearfix">
                <img :src="this.frontcover_photo[0] || this.nullImage"  v-show="isOne" >
                <img :src="this.frontcover_photo[1] || this.nullImage"  v-show="isThree" >
                <img :src="this.frontcover_photo[2] || this.nullImage"  v-show="isThree" >
              </div><br/>
              <span class="hint" v-show=" this.frontcover_photo != '' ? false : true ">请设置封面图</span>
            </li>
            <li class="tags">
                <span class="l">分类</span>
                <el-select v-model="category" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select><br/>
              <span class="hint" v-show=" this.content != '' ? false : true ">请选择文章分类</span>
            </li>
            <li>
              <span class="l">标签</span>
                <input type="" name="" class="tags-ipt" v-model="bj_tag">
                <span class="reminding">您可添加5个标签，以分号隔开。描述越准确,越利于触达兴趣人群</span><br/>
              <span class="hint" v-show=" this.bj_tag != '' ? false : true ">标签不符合要求</span>
            </li>
            <li class="settime">
              <el-checkbox v-model="regularly"  :label="1" class="settime-ipt font-check">定时发送</el-checkbox>
              <span class="settime-date" v-text="regularly_time"></span>
              <span class="settime-change" @click="openDialog">修改</span>
            </li>
            <li class="btn2"><a @click="pubArticles">发布</a></li>
          </ul>
        </div>
        <timepicker  ref="child" v-on:regularly_time="get_regularly_time" v-on:regularly="get_regularly"></timepicker>
        <el-button
        type="primary"
        v-loading.fullscreen.lock="fullscreenLoading">
        指令方式
        </el-button>
      </div>
</template>
<script>
import editor from "../plugin/quilleditor.vue";
import { mapActions, mapGetters } from "vuex";
import coverImage from "../plugin/coverImage.vue";
import timepicker from "../plugin/timepicker.vue";
export default {
  data() {
    return {
      u_id: 13261095537,
      p_id: 3,
      content: "",
      title: "",
      editorOption: {},
      original: "",
      regularly: 0,
      regularly_time: "",
      frontcover: "",
      frontcover_photo: [],
      isOne: true,
      category: "", // 时间选择默认值
      bj_tag: "",
      timer: "",
      options: [
        { value: 1, label: "互联网" },
        { value: 2, label: "科技" },
        { value: 5, label: "数码" }
      ],
      qeh_cover: "",
      fullscreenLoading: false,
      nullImage:
        "data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=="
    };
  },
  components: {
    editor,
    coverImage,
    timepicker
  },
  computed: {
    saveBaseUrl: {
      get() {
        return this.$store.state.saveBaseUrl;
      }
    },
    pushBaseUrl: {
      get() {
        return this.$store.state.pushBaseUrl;
      }
    },
    isThree() {
      return this.frontcover == 1 ? true : false;
    },
    uploadUrl: {
      get() {
        return this.$store.state.saveBaseUrl + "/upload";
      },
      set(newValue) {
        this.$store.state.serverUrl = newValue;
      }
    }
  },
  mounted() {
    var _this = this;
    var url = this.$store.state.serverUrl;
    var article_id = localStorage.getItem("article_local_id");
    if (article_id) {
      this.$axios
        .get(_this.saveBaseUrl + "/changeurl", {
          params: {
            article_id: article_id,
            u_id: _this.u_id,
            p_id: _this.p_id
          }
        })
        .then(function(data) {
          if (data.status == "200") {
            var resData = data.data.editor;
            _this.title = resData.title;
            _this.content = resData.article_content;
            _this.frontcover = resData.frontcover + "";
            _this.frontcover_photo = resData.frontcover_photo.split(",");
            _this.regularly = resData.regularly == 1 ? true : false;
            _this.regularly_time = resData.regularly_time;
            _this.qeh_cover = resData.qeh_cover;
            _this.original = resData.original;

            console.log(resData);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  methods: {
    ...mapActions(["showPreview", "openCover"]),
    pubArticles() {
      var _this = this;
      var bFlag = true;
      var frontcover_photo = [];
      var article_id = localStorage.getItem("article_local_id");
      for (var i = 0; i < _this.frontcover_photo.length; i++) {
        var obj = {};
        obj.src = _this.frontcover_photo[i];
        frontcover_photo.push(obj);
      }

      bFlag =
        _this.u_id &&
        _this.p_id &&
        _this.title &&
        _this.content &&
        _this.original + "" &&
        _this.frontcover &&
        _this.frontcover_photo &&
        _this.regularly + "" &&
        _this.category &&
        _this.bj_tag;
      frontcover_photo = JSON.stringify(frontcover_photo);
      var qeh_cover = JSON.stringify(_this.qeh_cover);
      if (bFlag) {
        this.fullscreenLoading = true;
        this.$axios
          .post(_this.saveBaseUrl + "/publish", {
            u_id: _this.u_id,
            p_id: _this.p_id,
            title: _this.title,
            article_id: article_id,
            bj_tag: _this.bj_tag,
            frontcover: _this.frontcover == "1" ? "three" : "one",
            frontcover_photo: frontcover_photo,
            category: _this.category,
            original: parseInt(_this.original),
            regularly: _this.regularly == false ? 0 : 1,
            regularly_time: Date.parse(new Date(_this.regularly_time)),
            article_content: _this.content,
            qeh_cover: qeh_cover,
            tag: "",
            video: "",
            music: "",
            activity: "",
            apply_olympic_flag: 0,
            apply_push_flag: 0,
            apply_reward_flag: 0,
            reward_flag: 0,
            survey_id: "",
            survey_name: "",
            type: 0,
            commodity: "",
            pushInfo: "",
            temp: "",
            video_source_data: ""
          })
          .then(function(data) {
            _this.saveMsg();
            _this.fullscreenLoading = false;
            console.log(data);
          })
          .catch(function(err) {
            _this.errMsg();
            console.log(err);
          });
      }
    },
    get_regularly_time(data) {
      this.regularly_time = data;
    },
    get_regularly(data) {
      this.regularly = data;
    },
    openDialog() {
      this.$refs.child.openDialog();
    },
    saveMsg() {
      var _this = this;
      _this.$message("文章发布成功");
    },
    errMsg() {
      var _this = this;
      _this.$message("文章发布失败");
    }
  }
};
</script>


<style scoped>
.edit-tools {
  height: 280px;
  margin-bottom: 50px;
}
i {
  font-style: normal;
}
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
  padding-bottom: 20px;
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
  background: url(../../assets/images/file.png) no-repeat;
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
  background: url("../../assets/images/doubt.png") no-repeat;
}
.settime-ipt {
  display: inline-block;
  margin-left: 18px;
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
  cursor: pointer;
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
.tags-ipt input {
  display: inline-block;
  margin-left: 46px;
  width: 700px;
  height: 36px;
}
.danxuan.original {
  display: inline-block;
  margin-left: 79px;
}
.tags-ipt {
  display: inline-block;
  width: 715px;
  height: 30px;
}
.reminding {
  opacity: 0.36;
  font-family: PingFangSC-Light;
  font-size: 10px;
  color: #000000;
  text-align: left;
  margin-left: 78px;
}
</style>