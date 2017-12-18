
<template>
<div class="right clearfix">
    <div class="bianjiqi_box">
      <ul class="b_list">
        <li><span class="l">文章标题</span>
          <input type="text" class="inp" placeholder="请输入文章标题，8-15个汉字" v-model="title">
          <span class="hint" v-show="this.title.length >= 8 && this.title.length <= 15 ? false : true ">文章标题不符合要求，8-15个汉字</span>
        </li>
        <li class="clearfix"><span class="l">正文</span>
          <editor ref="myTextEditor"
            :fileName="'myFile'"
            :article_id="article_id"
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
        <li class="cover-image-box clearfix"><span class="l">封面</span>
          <label for="cover-one">
            <i class="danxuan"  @click="clearImage">
              <el-radio v-model="frontcover" :label="0" id="cover-one">单图</el-radio>
            </i>
          </label>
          <label for="cover-three">
            <i class="danxuan">
              <el-radio v-model="frontcover" :label="1" id="cover-three">三图</el-radio>
             </i>
          </label>
          <i class="tishi">请使用尺寸大于360*270的图片，支持jpg或png格式。</i>
          <div class="shangchuan clearfix">
            <img :src="this.frontcover_photo[0] || this.nullImage"  v-show="isOne" @click="openCover">
            <img :src="this.frontcover_photo[1] || this.nullImage"  v-show="isThree" @click="openCover">
            <img :src="this.frontcover_photo[2] || this.nullImage"  v-show="isThree" @click="openCover">
          </div><br/>
          <span class="hint" v-show=" this.frontcover_photo != '' ? false : true ">请设置封面图</span>
          <coverImage ref="coverChild" :coverNum="frontcover" v-on:saveImageArr = saveImageArr v-on:selectOneCover="selectOneCover"></coverImage>
        </li>
        <li>
        <span class="l">定时发表</span>
        <label for="istime"   @click="openDialog">
          <i class="danxuan">
            <el-radio v-model="regularly" :label="1" @click="openDialog">是</el-radio>
          </i>
        </label>
        <span class="settime-date" v-text="regularly_time" v-show="this.regularly"></span>
        <span class="settime-change" @click="openDialog" v-show="this.regularly">修改</span>
        <label for="nottime">
          <i class="danxuan">
            <el-radio v-model="regularly" :label="0" id="nottime">否</el-radio>
          </i>
        </label>
        </li>
          <li>
            <span class="l">同步平台</span>
              <el-checkbox v-model="platname_all" v-if="ttStatus && bjStatus && qeStatus">全选</el-checkbox>
              <el-checkbox v-model="platname_headline" value="2" v-if="ttStatus">今日头条</el-checkbox>
              <el-checkbox v-model="platname_hundred" value="1" v-if="bjStatus">百家号</el-checkbox>
              <el-checkbox v-model="platname_penguin" value="3" v-if="qeStatus">企鹅号</el-checkbox>
              <span v-if="!(ttStatus || bjStatus || qeStatus)" class="plat_hint">请先登录平台账号</span>
              <br/>
              <span class="hint" v-show="platname_headline || platname_hundred || platname_penguin ? false : true">请选择同步平台</span>
          </li>
          <li class="btn2">
            <div class="clearfix">
              <a @click="showPreview">预览</a>
              <a @click="synchronous">一键同步</a>
              <a class="quxiao" @click="exit">取消</a>
            </div>
          </li>
      </ul>
    </div>
    <preview :viewContet="content" :title="title"></preview>
    <timepicker  ref="child" v-on:regularly_time="get_regularly_time" v-on:regularly="get_regularly"></timepicker>
  </div>
</template>
<script>
import editor from "../plugin/quilleditor.vue";
import preview from "../plugin/preview.vue";
import { mapActions, mapGetters } from "vuex";
import coverImage from "../plugin/coverImage.vue";
import timepicker from "../plugin/timepicker.vue";
export default {
  data() {
    return {
      u_id: 13261095537,
      platname_all: "",
      platname_headline: "",
      platname_hundred: "",
      platname_penguin: "",
      content: "",
      title: "",
      editorOption: {},
      /*是否原创： 1原创， 2非原创*/
      original: "",
      /*是否定时： 1命中， 0不命中*/
      regularly: "",
      /*定时时间*/
      regularly_time: "",
      /*封面选择： 0选中一张， 1选中三张*/
      frontcover: "",
      frontcover_photo: [],
      isOne: true,
      timer: "",
      /* store方法返回的articleid*/
      article_id: "",
      /* 本地存储的articleid */
      article_local_id: "",
      bjStatus: false,
      ttStatus: false,
      qeStatus: false,
      nullImage:
        "data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=="
    };
  },
  components: {
    preview,
    editor,
    coverImage,
    timepicker
  },
  computed: {
    saveBaseUrl: {
      // 实时保存、同步接口
      get() {
        return this.$store.state.saveBaseUrl;
      }
    },
    pushBaseUrl: {
      // 发布接口
      get() {
        return this.$store.state.pushBaseUrl;
      }
    },
    uploadUrl: {
      // 上传图片接口
      get() {
        return this.$store.state.saveBaseUrl + "/upload";
      },
      set(newValue) {
        this.$store.state.serverUrl = newValue;
      }
    },
    isThree() {
      return this.frontcover == 1 ? true : false;
    },
    /* 平台选中 */
    platname() {
      var platname = [];
      if (this.platname_headline) {
        platname.push(2);
      }
      if (this.platname_hundred) {
        platname.push(1);
      }
      if (this.platname_penguin) {
        platname.push(3);
      }
      return platname;
    }
  },
  mounted() {
    var _this = this;
    this.minSaveMsg();
    this.timingSave();
    this.getStatus();
    /* 10秒保存文章 */
    this.timer = setInterval(function() {
      _this.timingSave();
    }, 60000);
  },
  methods: {
    ...mapActions(["showPreview", "openCover"]),
    /*1分钟保存一次文章*/
    getStatus() {
      var _this = this;
      this.$axios.get(this.$store.state.saveBaseUrl + '/getstatus', {
        params: {
          u_id: _this.u_id,
          p_id: [1, 2, 3]
        }
      })
      .then(function(data){
        if(data){
          _this.bjStatus = data.data[0].status != 0;
          _this.ttStatus = data.data[1].status != 0;
          _this.qeStatus = data.data[2].status != 0;
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    timingSave() {
      var _this = this;
      this.$axios
        .post(_this.saveBaseUrl + "/store", {
          u_id: 13261095537,
          title: _this.title,
          article_content: _this.content,
          original: parseInt(_this.original),
          frontcover: _this.frontcover,
          frontcover_photo: _this.frontcover_photo,
          regularly: _this.regularly,
          regularly_time: Date.parse(new Date(_this.regularly_time)),
          platname: _this.platname
        })
        .then(function(data) {
          if (data.data.status !== "200") return;
          _this.article_id = data.data.article_id;
        })
        .catch(function(err) {
          _this.errMsg();
        });
    },
    /*一键同步*/
    synchronous() {
      var _this = this;
      var bFlag =
        _this.title.length >= 8 &&
        _this.title.length <= 15 &&
        _this.content &&
        _this.original + "" &&
        _this.frontcover !== "" &&
        _this.frontcover_photo !== "" &&
        _this.platname;
      if (bFlag) {
        this.$axios
          .post(_this.saveBaseUrl + "/editor", {
            u_id: 13261095537,
            title: _this.title,
            article_id: _this.article_id,
            article_content: _this.content,
            original: parseInt(_this.original),
            frontcover: _this.frontcover,
            frontcover_photo: _this.frontcover_photo,
            regularly: _this.regularly,
            regularly_time: Date.parse(new Date(_this.regularly_time)),
            platname: _this.platname
          })
          .then(function(data) {
            if (data.status == "200") {
              _this.saveMsg();
              _this.$store.state.coverImage = [];
              localStorage.setItem("article_local_id", data.data.article_id);
              clearInterval(_this.timer);
              _this.$router.push("/editor/headline");
            }
          })
          .catch(function(err) {
            console.log(err);
            _this.errMsg();
          });
      } else {
        console.log("填写完整信息");
      }
    },
    /* 接收封面图片 */
    saveImageArr(data) {
      return (this.frontcover_photo = data);
    },
    get_regularly_time(data) {
      this.regularly_time = data;
    },
    get_regularly(data) {
      this.regularly = data;
    },
    /* 取消保存文章*/
    exit() {
      this.dangerMsg();
    },
    openDialog() {
      this.$refs.child.openDialog();
    },
    dangerMsg() {
      var _this = this;
      this.$confirm("系统不会保存您做的修改，是否退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$axios
            .post("/logouteditor", {
              u_id: 13261095537
            })
            .then(function(data) {});
          setTimeout(function() {
            _this.$router.push("/admin");
          }, 200);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    saveMsg() {
      var _this = this;
      _this.$message("保存草稿成功");
    },
    errMsg() {
      this.$message("保存失败！请检查网络情况");
    },
    clearImage() {
      this.$refs.coverChild.emptyimage();
    },
    selectOneCover() {
      this.frontcover = 0;
    },
    minSaveMsg() {
      this.$message("草稿将会1分钟保存一次");
    }
  },
  watch: {
    platname_all: function(val, oldval) {
      if (val) {
        this.platname_headline = true;
        this.platname_hundred = true;
        this.platname_penguin = true;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
    this.$store.state.coverImage = [];
    clearInterval(this.timer);
  }
};
</script scoped>
<style>
p {
  margin: 0;
}
.ql-container.ql-snow {
  height: 300px;
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
  margin-left: 284px;
  padding-top: 60px;
}

.b_list {
  width: 800px;
  padding-bottom: 100px;
}

.b_list li {
  width: 800px;
  line-height: 25px;
  font-size: 14px;
  padding-bottom: 20px;
}

.b_list li .l {
  float: left;
  width: 60px;
  height: 25px;
  line-height: 25px;
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
  margin-right: 25px;
}

.b_list li .shangchuan {
  width: 700px;
  padding: 6px 0 0 78px;
  float: left;
  height: 92px;
  object-fit: contain;
}

.b_list li .shangchuan img {
  float: left;
  width: 122px;
  height: 92px;
  background: url(../../assets/images/file.png) no-repeat;
  margin-right: 30px;
  object-fit: scale-down;
}
.b_list li .duoxuan {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.b_list li.btn2 {
  padding: 10px 0 0 78px;
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
  cursor: pointer;
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
  height: 280px;
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

.hint, .plat_hint{
  display: inline-block;
  margin-left: 78px;
  font-size: 12px;
  color: #f19191;
  line-height: 12px;
}
.plat_hint{
  margin-left: 0;
}
.cover-image-box {
  position: relative;
}
.el-dialog--center .el-dialog__body {
  text-align: center;
}
.el-select {
  width: 100px;
}
.settime-change {
  opacity: 0.85;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #0091ff;
  line-height: 12px;
  text-align: left;
  cursor: pointer;
  margin-right: 25px;
}
.settime-date {
  opacity: 0.85;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #999999;
  line-height: 12px;
  text-align: left;
  margin-right: 5px;
}
</style>