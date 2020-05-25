<template>
  <div class="container">
    <el-col :span="12">
      <el-row>
        <el-col :span="24" align='left'>
          <el-button type="primary" @click="OnCreated" size="small">新增标签</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="tags" size="small">
            <el-table-column label="值" prop="key"></el-table-column>
            <el-table-column label="描述" prop="value"></el-table-column>
            <el-table-column align="right">
              <template v-slot:header>
                <el-input v-model="search" size="mini" clearable placeholder="输入关键字搜索" @keypress.enter.native="OnSearch"/>
              </template>
              <template v-slot:default='body'>
                <el-button size="mini" @click="handleEdit(body.$index, body.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(body.$index, body.row)"
                >Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="pagination">
          <el-pagination
            :page-count.sync="pagination.pageCount"
            :current-page.sync="pagination.page"
            :page-size.sync="pagination.perPage"
            @current-change="Reload"
            layout="prev, pager, next"
            align='right'
          ></el-pagination>
        </el-col>
      </el-row>
    </el-col>
    <tag-edit :visible.sync='visible' :tag='tag' @OnSave='OnSave' :isNew='isNew'/>
  </div>
</template>

<style scoped>
/* .container{
  display:block;
} */
.el-row:last-child{
  margin-top: 20px;
}

.el-table-column{
  white-space: nowrap;
}

</style>


<script>
import { mapState } from "vuex";
import tagEdit from './TagEdit'
export default {
  data() {
    return {
      visible:false,
      tag:{},
      search:'',
      isNew: false,
    }
  },
  //mastser category
  props:['mc'],
  components:{
    tagEdit
  },
  computed: {...mapState({
    // eslint-disable-next-line no-unused-vars
    tags(state){return state[this.mc][this.mc]},
    pagination:state => state.Moudle.pagination
  })},
  created() {
    this.Reload();
  },
  watch: {
     // eslint-disable-next-line no-unused-vars
     $route(to, from) {
       this.Reload();
     }
  },
  methods: {
    Reload: function() {
      this.$store.dispatch("FETCH_"+this.mc.toUpperCase(), {
        perPage: this.pagination.perPage,
        page: this.pagination.page
      });
    },
    handleEdit: function(index, row){
      this.tag = JSON.parse(JSON.stringify(row));
      this.isNew = false;
      this.visible = true;
    },
    handleDelete(index, row){
      this.$store.dispatch('DELETE_'+this.mc.toUpperCase(), {tagKey:row.key,callback:(data)=>{
        if(data>0)
          this.tags.splice(index,1);
      }});
    },
    OnSave: function(){
      this.$store.dispatch('SET_'+this.mc.toUpperCase(),{tag:this.tag,callback:()=>{
        this.Reload();
      }});
    },
    OnCreated(){
      this.tag = {key:'',value:''};
      this.isNew=true;
      this.visible =true;
    },
    OnSearch(){
      this.$store.dispatch("FETCH_"+this.mc.toUpperCase(), {
        perPage: this.pagination.perPage,
        page: this.pagination.page,
        s: this.search
      });
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate (to, from, next){
    this.$store.commit('SET_PAGINATION',{});
    next();
  }
};
</script>