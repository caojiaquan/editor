<template>
    <ul class="login_list">
      <li><img src="../../assets/images/toutiao.jpg" width="140" height="140" alt="">
        <div class="login_list_r"><span>登录账号：</span><b><i>泡泡的日常分享分享</i></b>
              <p><a href="#" class="qie">切换账号</a><a href="#">退出</a></p>
        </div>
      </li>
          <li><img src="../../assets/images/uc.jpg" width="140" height="140" alt="">
        <div class="login_list_r"><span>登录账号：</span><b><i>泡泡的日常分享</i></b>
              <p><a href="#" class="qie">切换账号</a><a href="#">退出</a></p>
          </div>
      </li>
          <li><img src="../../assets/images/bai.jpg" width="140" height="140" alt="">
        <div class="login_list_r"><span>登录账号：</span><b><i>泡泡的日常分享</i></b>
              <p><a href="#" class="qie">切换账号</a><a href="#">退出</a></p>
            </div>
      </li>
    </ul>
</template>

<script>
  export default {

  }
</script>

<style scoped>

  .login_list {
    width: 990px;
    clear: both;
    overflow: hidden;
    margin-left: 284px;
  }

  .login_list li {
    float: left;
    width: 302px;
    height: 140px;
    border: 1px solid #dedede;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 60px;
    margin-right: 25px;
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
</style>