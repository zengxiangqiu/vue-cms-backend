<template>
  <div class="header" >
    <el-row >
      <el-col :span="24" >
        <i class="el-icon-user">
          <el-button type="text" >{{ username }}</el-button>
        </i>
        <i class="el-icon-close">
          <el-button type="text" @click.native="OnExit">退出</el-button>
        </i>
      </el-col>
    </el-row>
  </div>
</template>


<style scoped>
.el-col-24/deep/i{
  margin-left: 20px;
}

.el-col-24/deep/.el-button{
  margin-top: 10px;
}
</style>

<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions(['Logout']),
    OnExit(){
      this.Logout();
      this.$router.push('/login');
    }
  },
  computed:{
    username:()=>{
      return localStorage.getItem('nickname');
    }
  },


}
</script>


