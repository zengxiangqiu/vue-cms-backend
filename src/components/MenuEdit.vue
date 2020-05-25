<template>
  <el-dialog :title="title" :visible.sync="visible" @close="handleClose" :close-on-click-modal='false'>
    <el-form :model="subMenu" label-width="80px" ref='editForm' :rules='rules'>
      <el-form-item label="分类" prop="id" align='left'>
        <el-select @change="OnChange" v-model="subMenu.id" placeholder="支持模糊查询" remote filterable  :remote-method="filterCategories" :loading="isLoading" >
          <el-option v-for="option in categories" :key="option.key" :value='option.key' :label="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item align='right'>
        <el-button @click="$emit('update:visible', false);">取 消</el-button>
        <el-button type="primary" @click.native.prevent="OnSave('editForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }


</style>

<script>
import {mapState,mapActions} from 'vuex'

export default {
  data() {
    return {
      subMenu:{
        id:'',
        label: '',
        children:[],
        m_type:'category'
      },
      isLoading: false,
      rules:{
        id:[
          { required: true, message: '请选择类别', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
  },
  props: ["visible"],
  computed:mapState({categories: state=>state.categories.categories}),
  watch: {
    categories(){
      this.$nextTick(()=>{
        this.isLoading = false;
      })
    }
  },
  methods: {
    ...mapActions([
      'query_categories'
    ]),
    OnSave(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("update:visible", false);
            this.$emit("OnSave",this.subMenu);
          } else {
            console.log('error submit!!');
          }
      });
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    filterCategories(query){
      this.isLoading = true;
      this.query_categories({s: query});
    },
    OnChange(item){
      let category = this.categories.find(x=>x.key == item);
      this.subMenu.label = category.value
    }
  }
};
</script>