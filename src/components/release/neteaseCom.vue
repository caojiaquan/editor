<template>
	<div class="right">
        <div class="bianjiqi_box">
          <ul class="b_list">
            <li><span class="l">文章标题</span>
              <input type="text" class="inp" placeholder="请输入文章标题，8-15个汉字" v-model="title">
            </li>
            <li class="clearfix"><span class="l">正文</span>
              <quill-editor class="edit-tools" v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                >
              </quill-editor>
            </li>
            <li class="tags">
              <div>
                <span class="l">分类</span>
                <select>
                  <option>啦啦啦啦啦</option>
                  <option>哈哈哈哈或</option>
                  <option>呵呵呵呵好</option>
                </select>
              </div>
              <div>
                <input type="" name="" class="tags-ipt">
              </div>
            </li>
            <li><span class="l">封面</span>
              <label for="cover-one">
                <i class="danxuan">
                  <input type="radio" name="cover" id="cover-one" value="0" v-model="frontcover">
                单图</i>
              </label>
              <label for="cover-three">
                <i class="danxuan">
                  <input type="radio" name="cover" id="cover-three" value="1" v-model="frontcover">
                三图 </i>
              </label>
              <label for="cover-three">
                <i class="danxuan">
                  <input type="radio" name="cover" id="cover-three" value="1" v-model="frontcover">
                自动</i>
              </label>
              <i class="tishi">请使用尺寸大于360*270的图片，支持jpg或png格式。</i>
              <div class="shangchuan">
                <p v-show="isOne"  @click="outerVisible = true"></p>
                <p v-show="isThree"  @click="outerVisible = true"></p>
                <p v-show="isThree"  @click="outerVisible = true"></p>
              </div>
            </li>
            <li>
              <label for="isorigin">
                <i class="danxuan original">
                原创</i>
              </label>
              <label for="isorigin">
                <i class="danxuan">
                  <input type="radio"  value="1" name="createby" id="isorigin" v-model="original">
                是</i>
              </label>
              <label for="notorigin">
                <i class="danxuan">
              <input type="radio" value="0" name="createby" id="notorigin" v-model="original">
              否</i>
              </label>
            </li>
            <li class="settime">
              <span>定时发送</span>
              <label for="settime">
                <input type="checkbox" name="" class="settime-ipt" id="settime">
                <span class="settime-send">定时</span>
              </label>
              <span class="settime-date">只能选择2-24小时范围内的时间</span>
            </li>
            <li class="btn2"><a @click="previewStatus = true">发布</a></li>
          </ul>
        </div>
      </div>
</template>

<script>
	export default {
  data() {
    return {
      editmenuFlag: false,
      editComFlag: true,
      content: '',
      title: '',
      article_content: '',
      original: '',
      frontcover: 0,
      frontcover_photo: '',
      regularly: false,
      regularly_time: '',
      platname: [],
      arr: [],
      editorOption: {},
      isOne: true,
      isThree: false,
      outerVisible: false,
      innerVisible: false,
      previewStatus: false
    }
  }
}
</script>

<style scoped>
	 .edit-tools{
    height: 280px;
    margin-bottom:50px;
  }
  i{
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
    margin: 50px  0 0 30px;
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
    margin-left: 18px;

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
    margin-left: 79px;
    width: 732px;
    height: 38px;
    margin-top:29px;
  }
  .danxuan.original{
    display: inline-block;
    margin-left: 79px;
  }
</style>