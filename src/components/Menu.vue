<template>
  <el-menu :default-active="this.$route.path" router>
    <el-menu-item index="/">首页</el-menu-item>
    <el-submenu index="1" >
      <el-menu-item index="/tags">
      <!-- <template v-slot:title>
        <router-link to='/tags'>标签</router-link>
      </template>  
         -->
         标签
      </el-menu-item>
      <el-menu-item index="/categories">分类</el-menu-item>
      <el-menu-item index="/menus">菜单</el-menu-item>
      <el-menu-item index="/entries">文章</el-menu-item>
      <template v-slot:title>
        <span>主档维护</span>
      </template>
    </el-submenu>
  </el-menu>
</template>

<style scoped>
.el-menu li a:-webkit-any-link{
  color: #303133;
}

li.is-active a{
  color: #409EFF;
  text-decoration: none;
}



.el-menu li a{
  text-decoration: none;
  display: block;
}


</style>