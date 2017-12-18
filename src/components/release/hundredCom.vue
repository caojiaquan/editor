<template>
	<div class="right">
        <div class="bianjiqi_box">
          <ul class="b_list">
            <li><span class="l">文章标题</span>
              <input type="text" class="inp" placeholder="至少8个汉字" v-model="title">
              <span class="hint" v-show=" this.title != '' ? false : true ">文章标题不符合要求，8-15个汉字</span><br/>
              <el-checkbox v-model="showsubtitle" value="1" label="1" class="subtitle-check subtitle">双标题</el-checkbox>
              <input type="text" class="inp subtitle-ipt" placeholder="至少8个汉字" v-model="subtitle"  v-show=" this.showsubtitle != '' ? true : false ">
            </li>
            <li class="clearfix"><span class="l">正文</span>
              <editor ref="myTextEditor"
                  :fileName="'myFile'"
                  :uploadUrl="uploadUrl"
                  v-model="content">
              </editor>
              <span class="hint" v-show=" this.content != '' ? false : true ">文章内容不能为空</span>
            </li>
            <li>
              <span class="l">原创</span>
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
            <li class="cover-image-box clearfix"><span class="l">封面</span>
                   <el-radio v-model="frontcover" :label="0" id="cover-one">单图</el-radio>
                  <el-radio v-model="frontcover" :label="1" id="cover-three">三图</el-radio>
              <i class="tishi">请使用尺寸大于360*270的图片，支持jpg或png格式。</i>
              <div class="shangchuan clearfix">
                <img :src="this.frontcover_photo[0] || this.nullImage"  v-show="isOne" >
                <img :src="this.frontcover_photo[1] || this.nullImage"  v-show="isThree" >
                <img :src="this.frontcover_photo[2] || this.nullImage"  v-show="isThree" >
              </div><br/>
              <span class="hint" v-show=" this.frontcover_photo != '' ? false : true ">请设置封面图</span>
              <coverImage></coverImage>
            </li>
            <li>
              <div class="original-box">
                  <el-checkbox v-model="bj_recommend">文章自荐</el-checkbox>
                  <el-checkbox v-model="bj_optimizetitle">自动优化标题</el-checkbox>
              </div>
            </li>
            <li class="btn2"><a @click="pubArticles">发布</a></li>
          </ul>
        </div>
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
	export default {
  data() {
    return {
      u_id: 13261095537,
      p_id: 1,
      title: '',
      content: '',
      original: '',
      /* 原创二级分类 */
      frontcover: '',
      frontcover_photo: [],
      regularly: false,
      showsubtitle: false,
      subtitle: '',
      category: '', // 时间选择默认值
      bj_tag: '',
      bj_recommend: false, // 文章自荐
      bj_optimizetitle: false, // 自动优化标题
      app_id: '',
      cookie: '',
      plat_id: 1,
      editorOption: {},
      time: '',
      isOne: true,
      options: [{value: 1, label: '互联网'},{value: 2, label: '科技'}],
      fullscreenLoading: false,
      nullImage: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=='
    }
  },
  components: {
    editor,
    coverImage
  },
  computed: {
    saveBaseUrl: {
      get(){
        return this.$store.state.saveBaseUrl;
      }
    },
    pushBaseUrl: {
      get(){
        return this.$store.state.pushBaseUrl;
      }
    },
    isThree(){
      return this.frontcover == 1 ? true : false;
    },
    uploadUrl: {
      get(){
        return this.$store.state.serverUrl + '/upload';
      },
      set(newValue){
        this.$store.state.serverUrl = newValue;
      }
    },
    regularly_time: {
      get(){
        return this.time && Date.parse(Date(this.time)) || Date.now();
      },
      set(){
      }
    }
  },
  mounted(){
    var _this = this;
    var url = this.$store.state.serverUrl;
    var article_id = localStorage.getItem("article_local_id");
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
          _this.title = resData.title;
          _this.content = resData.article_content;
          _this.original = resData.original,
          _this.frontcover = resData.frontcover;
          _this.frontcover_photo = resData.frontcover_photo.split(',');
          _this.regularly = resData.regularly == 1;
          _this.regularly_time = resData.regularly_time
        }
      }).catch(function(err){
        console.log(err);
      });
      /*获取app_id*/
      this.$axios.get(_this.pushBaseUrl+ '/getappid', {
        params: {
          u_id: _this.u_id,
          p_id: _this.p_id
        }
      }).then(function(data){
        console.log(data);
        if(data.data.status == '200'){
          _this.app_id = data.data.msg;
        }
      }).catch(function(err){
        console.log(err);
      });
    }
  },
  methods: {
    ...mapActions(['showPreview', 'openCover']),
    pubArticles(){
      var _this = this;
      var bFlag = true;
      var frontcover_photo = [];
      var article_id = localStorage.getItem("article_local_id");
      for(var i=0; i<_this.frontcover_photo.length; i++){
        var obj = {};
        obj.src = _this.frontcover_photo[i];
        frontcover_photo.push(obj);
      }
      bFlag = _this.u_id && _this.p_id && _this.title && _this.content && _this.original+'' && _this.frontcover+''
      && _this.frontcover_photo && _this.regularly+''  &&  _this.category+'' && _this.bj_tag+'';
      frontcover_photo = JSON.stringify(frontcover_photo);
      if(bFlag){
        this.fullscreenLoading = true;
        this.$axios.post(_this.saveBaseUrl + '/publish', {
          u_id: _this.u_id,
          p_id: _this.p_id,
          app_id: _this.app_id,
          title: _this.title,
          article_id: article_id,
          article_content: _this.content,
          original: _this.original,
          frontcover: _this.frontcover == '1' ? 'three' : 'one',
          frontcover_photo: frontcover_photo,
          regularly: _this.original2,
          regularly_time: _this.regularly_time,
          bj_issub: _this.showsubtitle == true ? 1 : 0,
          bj_subtitle: _this.subtitle,
          category: _this.category,
          bj_tag: _this.bj_tag,
          bj_recommend: _this.bj_recommend == true ? 1 : 0,
          bj_optimizetitle: _this.bj_optimizetitle == true ? 1 : 0,
          cookie: _this.cookie
        })
        .then(function(data){
          if(data.data.status == '200'){
            _this.fullscreenLoading = false;
              _this.saveMsg();
          }
          console.log(data);
        })
        .catch(function(err){
          _this.errMsg();
          console.log(err);
        });
      }
    },
    saveMsg() {
      var _this = this;
      _this.$message('文章发布成功');
    },
    errMsg() {
      var _this = this;
      _this.$message('文章发布失败');
    }
  }
}
</script>
<style scoped>
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
    cursor: pointer;
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
  .subtitle-check{
    display: inline-block;
    margin-left: 79px;
  }
  .subtitle-ipt{
    margin-left: 79px;
    width: 700px;
  }
  .subtitle-label{
    display: inline-block;
    padding:10px 0;
  }
  .tags-ipt{
    display: inline-block;
    width: 715px;
    height: 30px;
  }
  .danxuan.original{
    display: inline-block;
    margin-left: 79px;
  }
  .hint{
    display:inline-block;
    margin-left: 78px;
    font-size:12px;
    color:#f19191;
    line-height:12px;
  }
  .original-box{
    margin-left: 78px;
  }
  .cover-image-box{
    position:relative;
  }
  .reminding{
    opacity:0.36;
    font-family:PingFangSC-Light;
    font-size:10px;
    color:#000000;
    text-align:left;
    margin-left: 78px;
  }
</style>