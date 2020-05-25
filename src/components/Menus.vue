<template>
  <div class="container">
    <el-col >
      <el-row>
        <el-col :span="24" align='left'>
          <el-button type="primary" @click="OnCreated" size="small">新增菜单项</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="menus" size="small">
            <el-table-column v-for="(col,index) in columns" :key='index' :label="col.label" :prop="col.prop"></el-table-column>
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
    <menu-edit :visible.sync='visible' :menu='menu' @OnSave='OnSave' :isNew='isNew' v-if='menu'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MenuEdit from './MenuEdit'

export default {
  data() {
    return {
      columns:[
        {label: 'ID', prop:'id'},
        {label: '描述', prop:'description'},
        {label: '项', prop:'m_key'},
        {label: '类别', prop:'m_type'},
        {label: '父级项', prop:'parentKey'},
        {label: '父级类别', prop:'parentType'},
        {label: '排序', prop:'orderNum'},
      ],
      visible:false,
      menu:null,
      search:'',
      isNew: false,
    }
  },
  components:{
    MenuEdit
  },
  computed: {
    ...mapState(
      {
        menus:state=>state.menus.menus,
        pagination:state=>state.Moudle.pagination
      }
    )
  },
  created() {
    this.Reload();
  },
  methods: {
    Reload: function() {
      this.$store.dispatch("FETCH_MENUS", {
        perPage: this.pagination.perPage,
        page: this.pagination.page
      });
    },
    handleEdit: function(index, row){
      this.menu = JSON.parse(JSON.stringify(row));
      this.isNew = false;
      this.visible = true;
    },
    handleDelete(index, row){
      this.$store.dispatch('DELETE_MENUS', {tagKey:row.id,callback:(data)=>{
        if(data>0)
          this.tags.splice(index,1);
      }});
    },
    OnSave: function(){
      this.$store.dispatch('SET_MENUS',{tag:this.tag,callback:()=>{
        this.Reload();
      }});
    },
    OnCreated(){
      this.menu = {};
      this.isNew=true;
      this.visible =true;
    },
    OnSearch(){
      this.$store.dispatch("FETCH_MENUS", {
        perPage: this.pagination.perPage,
        page: this.pagination.page,
        s: this.search
      });
    }
  }
}
</script>