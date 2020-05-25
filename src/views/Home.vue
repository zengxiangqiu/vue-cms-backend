<template>
  <div>
    <el-header>
      <Header/>
    </el-header>
    <el-aside>
      <Menu />
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<style>
.el-aside{
  position: fixed;
  width: 200px !important;
}

.el-main{
  margin-left: 200px;
  overflow-x: auto;
}

.el-header{
  text-align: right;
  border-bottom: gray solid 1px;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1501;
  background-color: white;
  border-bottom: solid 1px #e6e6e6;
}
</style>
<script>
import Menu from "@/components/Menu";
import Header from "@/components/Header";

export default {
  components: {
    Menu,
    Header
  }
};
</script>