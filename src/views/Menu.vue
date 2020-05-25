<template>
  <div>
    <el-tree
      :data="menus"
      :node-key="id"
      default-expand-all
      draggable
    >
    <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => this.visible=true">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-button @click.native = 'visible =true'>新增顶级菜单</el-button>
    <el-button @click.native = 'OnSave'>保存</el-button>
    <menu-edit :visible.sync='visible' @OnSave='OnAdd'/>
  </div>
</template>


<script>
import {mapActions,mapState} from 'vuex'
import MenuEdit from '../components/MenuEdit'

export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    ...mapActions(['query_menu','save_menu']),
    async OnSave(){
       const result =  await this.save_menu(this.menus);
       if(result)
        this.$message({
          message: '保存成功',
          type: 'success'
        });
       else
        this.$message('保存失败');
    },
    OnAdd(subMenu){
      this.menus.push(subMenu);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
  },
  computed:{
    ...mapState({
      menus: state=>state.menus.menus
    })
  },
  created() {
    this.query_menu();
  },
  components:{
    MenuEdit
  }
}
</script>