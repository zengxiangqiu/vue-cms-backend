<template>
  <el-dialog :title="title" :visible.sync="visible" @close="handleClose" :close-on-click-modal='false'>
    <el-form :model="tag" label-width="80px" ref='editForm' :rules='rules'>
      <el-form-item label="值" v-if="isNew" prop="key">
        <el-input v-model.trim="tag.key" placeholder="值"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="value">
        <el-input v-model="tag.value" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item align='right'>
        <el-button @click="$emit('update:visible', false);">取 消</el-button>
        <el-button type="primary" @click.native.prevent="OnSave('editForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<style scoped>



</style>

<script>
export default {
  data() {
    return {
      title:'',
      rules:{
        key:[
          {required: true, message: '请输入键值', trigger: 'blur'},
        ],
        value:[
          {required: true, message:'请输入描述', trigger:'blur'}
        ]
      }
    }
  },
  props: ["tag", "visible",'isNew'],
  watch: {
    // eslint-disable-next-line no-unused-vars
    tag: function(val, oldVal){
      if(this.isNew){
        this.title = '新增'
      }
      else{
        this.title = val.key;
      }
      if(this.$refs['editForm'])
        this.$refs['editForm'].resetFields();
    }
  },
  methods: {
    OnSave(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("update:visible", false);
            this.$emit("OnSave");
          } else {
            console.log('error submit!!');
          }
      });
    },
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>