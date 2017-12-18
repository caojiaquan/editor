<template>
  <ul class="login_list">
      <li>
        <img src="../../assets/images/toutiao.jpg" width="140" height="140" alt="">
        <a href="https://sso.toutiao.com/login/?service=https://mp.toutiao.com/sso_confirm/?redirect_url=/" target="_blank" class="btn" v-show="!ttStatus">登录</a>
        <div class="login-status" v-show="ttStatus">
          <span>已登录</span>
          <span class="login-out"  @click="ttLogin">退出</span>
        </div>
      </li>
      <li>
        <img src="../../assets/images/bai.jpg"  width="140" height="140" alt="">
        <a  href="http://baijiahao.baidu.com/builder/app/login" target="_blank" class="btn" v-show="!bjStatus">登录</a>
        <div class="login-status" v-show="bjStatus">
          <span>已登录</span>
          <span class="login-out" @click="bjLogin">退出</span>
        </div>
      </li>
      <li>
        <img src="../../assets/images/qqicon.jpg" width="140" height="140" alt="">
        <a href="https://om.qq.com/userAuth/index" target="_blank" @click="qeLogin" class="btn" v-show="!qeStatus">登录</a>
        <div class="login-status" v-show="qeStatus">
          <span>已登录</span>
          <span class="login-out" @click="qeLogin">退出</span>
        </div>
      </li>
    </ul>
</template>
<script>
  export default {
    data(){
      return {
        u_id: 13261095537,
        p_id: [1, 2, 3],
        qeStatus: false,
        bjStatus: false,
        ttStatus: false
      }
    },
    mounted(){
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
    methods: {
      ttLogin(){
        this.ttStatus = false;
      },
      bjLogin(){
        this.bjStatus = false;
      },
      qeLogin(){
        this.qeStatus = false;
      }
    }
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
  .login-status{
    margin-top:64px;
    margin-left: 175px;
  }
  .login-out{
    color:#419bf9;
    cursor: pointer;
  }

</style>