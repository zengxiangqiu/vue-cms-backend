<template>
  <div class="login-container">
    <el-form
      :model="user"

      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="user.name" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码" show-password  @keypress.enter.native="OnSubmit"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="OnSubmit" >登录</el-button>
      </el-form-item>
      <span style="color:red" v-if='errorMessage.length>0'>{{ errorMessage }}</span>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: { name: "", password: "" },
      logining: false,
      errorMessage:''
    };
  },

  methods: {
    ...mapActions(["Login"]),
    async OnSubmit() {
      this.logining = true;
      this.Login(this.user).then(token=>{
        debugger;
        if(token){
          let redirectUrl = decodeURIComponent(this.$route.query.redirect || "/");
          this.$router.push({
            path: redirectUrl
          });
        }
      },err=>{
        this.errorMessage = err;
      });
      

    }
  }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
/* label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
} */
</style>