<template>
  <div class="container">
    <el-form :model="entry" label-width="80px" v-show='visible'>
      <el-form-item align='right'>
        <el-button @click.native="$emit('OnExitEdit')">退出</el-button>
        <el-button type="primary" @click="OnSave">保存</el-button>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="entry.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category" align='left'>
        <el-select v-model="entry.category" placeholder="支持模糊查询" remote filterable  :remote-method="filterCategories" :loading="isLoading" >
          <el-option v-for="option in categories" :key="option.key" :value='option.key' :label="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop='content'>
        <mavon-editor v-model="entry.content" ref=md @imgAdd="$imgAdd" @save='$save'/>
      </el-form-item>
      <el-form-item label="标签" prop="tag" align='left'>
        <el-select style="width:100%" v-model="entry.tags" placeholder="支持模糊查询" remote filterable   multiple  :remote-method="filterTags" :loading="isLoading" >
          <el-option v-for="option in tags" :key="option.key" :value='option.key' :label="option.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import axios from 'axios'

var picHost = process.env.VUE_APP_ROOT_PICTURE +'/';
var apiHost =  process.env.VUE_APP_ROOT_API+'/cms/entry/picture';

export default {
  data() {
    return {
      isLoading: false,
      visible: false,
      tagSearch: ''
    }
  },
  props:['isNew','entryId'],
  computed:mapState({
    entry:state=>state.Moudle.entry,
    categories:state=>state.categories.categories,
    tags: state=>state.tags.tags
    }),
  created() {
  },
  watch: {
    async entryId(val){
      debugger;
      this.visible = false;
      await this.FETCH_ENTRY(val);
      await this.query_tags({page:1,perPage: 10, entryid: val });
      await this.query_categories({s: this.entry.category, page:1,perPage: 10});
      this.visible = true;
    },
    categories(){
      this.$nextTick(()=>{
        this.isLoading = false;
      })
    },
    tags(){
      this.$nextTick(()=>{
        this.isLoading = false;
      })
    }
  },
  methods: {
    ...mapActions(['FETCH_CATEGORIES','FETCH_ENTRY','query_categories','query_tags','SAVE_ENTRY']),
    // 绑定@imgAdd event
    $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        axios({
            url: apiHost,
            method: 'post',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(url=>{
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
            // eslint-disable-next-line no-undef
            this.$refs.md.$img2Url(pos, picHost+url.data);
        })
    },
    // eslint-disable-next-line no-unused-vars
    async $save(value,render){
      const { entry } = this;
      const entry_live = Object.assign({},{id: entry.id, content: value, category: entry.category,title: entry.title,tags:entry.tags})
      if(entry.id==null){
        delete entry_live['id'];
      }
      const id =  await this.SAVE_ENTRY(entry_live);
      if(id!=-1)
        this.$message({message: '保存成功', type:'success'})
      else
        this.$message({message: '保存失败', type:'error'})
    },
    filterCategories(query){
      this.isLoading = true;
      this.query_categories({s: query,page:1,perPage: 10});
    },
    filterTags(query){
      this.isLoading = true;
      this.query_tags({s: query,page:1,perPage: 10});
    },
    OnSave(){
      this.$save(this.$refs.md.value, null);
    }

  },
}
</script>

