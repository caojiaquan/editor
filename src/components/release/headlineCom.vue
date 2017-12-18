<template>
<div class="right">
  <div class="bianjiqi_box">
    <ul class="b_list">
      <li><span class="l">文章标题</span>
        <input type="text" class="inp" placeholder="5-30个字符" v-model="title">
        <span class="hint" v-show=" this.title != '' ? false : true ">文章标题不符合要求，5-30个字符</span>
      </li>
      <li class="clearfix"><span class="l">正文</span>
        <editor ref="myTextEditor"
            :fileName="'myFile'"
            :uploadUrl="uploadUrl"
            v-model="content">
        </editor>
        <span class="hint" v-show="this.content != '' ? false : true ">文章内容不能为空</span>
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
          <i class="danxuan">
             <el-radio v-model="frontcover" :label="0" id="cover-one">单图</el-radio>
          </i>
        </label>
        <label for="cover-three">
          <i class="danxuan">
            <el-radio v-model="frontcover" :label="1" id="cover-three">三图</el-radio>
           </i>
        </label>
        <div class="shangchuan clearfix">
          <img :src="this.frontcover_photo[0] || this.nullImage"  v-show="isOne">
          <img :src="this.frontcover_photo[1] || this.nullImage"  v-show="isThree">
          <img :src="this.frontcover_photo[2] || this.nullImage"  v-show="isThree">
        </div><br/>
        <span class="hint" v-show=" this.frontcover_photo != '' ? false : true ">请设置封面图</span>
        <coverImage></coverImage>
      </li>
      <li class="extension">
        <div class="extension-box">
          <span class="extension-her"><a href="">扩展链接</a></span>
          <el-checkbox v-model="tt_isextend"  value="1" class="extension-check">使用</el-checkbox>
          <span class="extension-rule">链接使用规范</span>
        </div>
        <div>
          <input type="text" name="" v-model="tt_extendlink" placeholder="请输入链接地址" class="extension-path"  v-show="this.tt_isextend">
        </div>
      </li>
      <li>
      <span class="l">设置</span>
        <i class="danxuan">
          <el-radio v-model="tt_adtype" label="3" class="font-check">投放头条广告</el-radio>
        </i>
        <i class="danxuan">
          <el-radio v-model="tt_adtype" label="4" class="font-check">投放自营广告</el-radio>
        </i>
        <i class="danxuan">
          <el-radio v-model="tt_adtype" label="2" class="font-check">不投放广告</el-radio>
        </i>
      </li>
      <li class="fans">
        <el-checkbox v-model="tt_fans"  value="1" class="fans-check font-check">粉丝必见</el-checkbox>
        <!-- <span class="fans-doubt"></span> -->
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
  import editor from '../plugin/quilleditor.vue'
  import {mapActions, mapGetters} from 'vuex'
  import coverImage from '../plugin/coverImage.vue'
  import timepicker from '../plugin/timepicker.vue'

	export default {
  data() {
    return {
      u_id: 13261095537,
      p_id: 2,
      /*文章内容*/
      content: '',
      /*文章标题*/
      title: '',
      /*编辑器配置*/
      editorOption: {},
      /*是否为原创： 1原创， 0非原创*/
      original: '',
      /*是否定时： 1定时， 0不定时*/
      regularly: 0,
      /*定时时间*/
      regularly_time: '',
      /*图片封面： 1三张图片， 0一张图片*/
      frontcover: '',
      /*封面图片数组*/
      frontcover_photo: [],
      /*封面图片压缩图*/
      frontcover_photo_arr: [],
      /*标识选中封面数： 1*/
      isOne: true,
      /*粉丝必见： 1选中， 0未选中*/
      tt_fans: 0,
      /*定时弹窗： true打开， false关闭*/
      centerDialogVisible: false,
      /*是否选中扩展链接： 1命中 0不命中*/
      tt_isextend: 0,
      /* 4投放头条广告， 3投放自营广告， 2不投放 */
      tt_adtype: '',
      /*扩展链接*/
      tt_extendlink: '',
      fullscreenLoading: false,
      /*封面默认图片*/
      nullImage: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=='
    }
  },
  components: {
    editor,
    coverImage,
    timepicker
  },
  computed: {
    saveBaseUrl: {//axios实时保存接口
      get(){
        return this.$store.state.saveBaseUrl;
      }
    },
    pushBaseUrl: {//axios推送文章接口
      get(){
        return this.$store.state.pushBaseUrl;
      }
    },
    isThree(){ // 命中3张封面
      return this.frontcover == 1 ? true : false;
    },
    uploadUrl: { // 上传图片接口
      get(){
        return this.$store.state.serverUrl + '/upload';
      },
      set(newValue){
        this.$store.state.serverUrl = newValue;
      }
    },
  },
  mounted(){
    var _this = this;
    var url = this.$store.state.serverUrl;
    var article_id = localStorage.getItem("article_local_id");// 草稿articleID
    /* 获取草稿信息 */
    if(article_id){
      this.$axios.get(_this.saveBaseUrl + '/changeurl', {
        params: {
          article_id: article_id,
          u_id: _this.u_id,
          p_id: _this.p_id
        }
      })
      .then(function(data){
        if(data.status == '200'){
          var resData = data.data.editor;
            /*头条号封面地址替换为裁切后的图片*/
          _this.title = resData.title;
          _this.original = resData.original,
          _this.content = resData.article_content;
          _this.frontcover = resData.frontcover;
          _this.frontcover_photo = resData.frontcover_photo.split(',');
          _this.regularly = resData.regularly == 1;
          _this.regularly_time = resData.regularly_time;
        }
      }).catch(function(err){
        console.log(err);
      });
    }
  },
  methods: {
    ...mapActions(['openCover']),// openCover：打开封面窗
    cancelDialogVisible(){
      this.centerDialogVisible = false;
      this.regularly = 0;
    },
    openDialogVisible(){
      this.centerDialogVisible = false;
    },
    /*发布文章函数*/
    pubArticles(){
      var _this = this;
      var bFlag = true;
      var frontcover_photo = _this.frontcover_photo;
      var article_id = localStorage.getItem("article_local_id");
      for(var i=0; i<frontcover_photo.length; i++){
        var obj = {};
        obj.uri = frontcover_photo[i].substr(-20);
        obj.url = frontcover_photo[i];
        obj.thumb_width = 172;
        obj.thumb_height = 120;
        _this.frontcover_photo_arr.push(obj);
      }
      bFlag = _this.u_id && _this.p_id && _this.title && _this.content && _this.original+'' && _this.frontcover+'' && _this.frontcover_photo && _this.regularly+'';
      if(bFlag){
        this.fullscreenLoading = true;
        this.$axios.post(_this.saveBaseUrl + '/publish', {
          u_id: _this.u_id,
          p_id: _this.p_id,
          title: _this.title,
          article_id: article_id,
          article_content: _this.content,
          original: _this.original,
          tt_isextend: _this.tt_isextend == true ? 1 : 0,
          tt_extendlink: _this.tt_extendlink,
          tt_fans: _this.tt_fans == true ? 1 : 0,
          tt_adtype: _this.tt_adtype,
          regularly: _this.original,
          frontcover: _this.frontcover == '1' ? 'three' : 'one',
          frontcover_photo: JSON.stringify(_this.frontcover_photo_arr),
          regularly: _this.regularly == true ? 1 : 0,
          regularly_time: Date.parse(new Date(_this.regularly_time))
        })
        .then(function(data){
          _this.saveMsg();
          _this.fullscreenLoading = false;
          console.log(data);

        })
        .catch(function(err){
          _this.errMsg();
          console.log(err);
        });
      }
    },
    get_regularly_time(data){
      this.regularly_time = data;
    },
    get_regularly(data){
      this.regularly = data;
    },
    openDialog(){
      this.$refs.child.openDialog();
    },
    saveMsg() {
      var _this = this;
      _this.$message('文章发布成功');
    },
    errMsg() {
      var _this = this;
      _this.$message('文章发布失败');
    }
  },
 
  watch:{

  }

}
</script>

<style scoped>
  .right{
  }
  .ql-container.ql-snow{
    height:300px;
  }
  i{
    font-style: normal;
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
    line-height: 25px;
  }

  .b_list li .l {
    float: left;
    width: 60px;
    padding-right: 18px;
    text-align: right;
    font-size:14px;
    color:#666666;
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
    cursor:pointer;
    margin-right:20px;
  }

  .b_list li .shangchuan {
    width: 700px;
    padding: 6px 0 0 78px;
    float: left;
    height: 92px;
    position: relative;
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
  .b_list .edit-tools{
    width: 721px;
    float: right;
  }
  .quill-editor.edit-tools .ql-editor{
    height: 330px;
  }
  #mceu_24,#mceu_20{ width:722px; height:330px;}

  #mceu_25-body,#mceu_21{ display:none;}
  .extension-box{
    margin-bottom: 19px;
    margin-top:6px;
  }
  .extension span{
    display: inline-block;
  }
  .extension-her a{
    opacity:0.85;
    font-family:PingFangSC-Regular;
    font-size:14px;
    color:#666666;
    line-height:12px;
  }
  .extension-check{
    margin-left: 18px;
    color:#000;
  }
  .extension-use{
    opacity:0.85;
    font-family:PingFangSC-Regular;
    font-size:14px;
    color:#000000;
    line-height:12px;
    text-align:left;
  }
  .extension-rule{
    margin-left: 30px;
    font-family:PingFangSC-Light;
    font-size:14px;
    color:#65bcff;
    line-height:12px;
    text-align:left;
    cursor: pointer;
  }
  .extension .extension-path{
    display: inline-block;
    width: 722px;
    height: 38px;
    background:#fafbfc;
    border:1px solid #dedede;
    -webkit-border-radius:2px;
    -moz-border-radius:2px;
    -o-border-radius:2px;
    border-radius:2px;
    padding-left: 10px;
    margin-left:79px;
  }
  .fans span{
    display: inline-block;
  }
  .fans-check{
    margin-left: 79px;
  }
  .fans-doubt{
    width:16px;
    height:16px;
    background: url('../../assets/images/doubt.png') no-repeat;
  }
  .settime-ipt{
    display: inline-block;
    margin-left: 79px;

  }
  .settime-date{
    margin-left: 10px;
    opacity:0.85;
    font-family:PingFangSC-Regular;
    font-size:12px;
    color:#999999;
    line-height:12px;
    text-align:left;
    margin-right: 10px;
  }
  .settime-change{
    opacity:0.85;
    font-family:PingFangSC-Regular;
    font-size:12px;
    color:#0091ff;
    line-height:12px;
    text-align:left;
    cursor: pointer;
  }
  .hint{
    display:inline-block;
    margin-left: 78px;
    font-size:12px;
    color:#f19191;
    line-height:12px;
  }
  .font-check{
    color:#000;
  }
  .cover-image-box{
    position:relative;
  }
</style>