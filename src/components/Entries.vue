<template>
  <div class="container" >
    <div v-show="!visible">
      <el-row>
        <el-col :span="24" align="left">
          <el-button type="primary" size="small" @click="OnCreate">新增文章</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table :data="entries" size="small" fit>
            <el-table-column
              v-for="col in columns"
              :label="col.label"
              :key="col.id"
              :prop="col.prop"
              :width="col.width"
            ></el-table-column>
            <el-table-column align="right" width="200px">
              <template v-slot:header>
                <el-input
                  v-model="search"
                  size="mini"
                  clearable
                  placeholder="输入关键字搜索"
                  @keypress.enter.native="OnSearch"
                />
              </template>
              <template v-slot:default="body">
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
        <el-col class="pagination">
          <el-pagination
            background
            :page-count.sync="pagination.pageCount"
            :current-page.sync="pagination.page"
            :page-size.sync="pagination.perPage"
            @current-change="Reload"
            layout="prev, pager, next"
            align="right"
            class="pagination"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
    <div class="edit" v-show='visible'>
      <entry-edit :entryId='entryId' @OnExitEdit='$router.push({name:"Entries"})'/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const EntryEdit =()=>import('@/components/EntryEdit');

export default {
  data() {
    return {
      columns: [
        { label: "ID", prop: "id", width: "80" },
        { label: "标题", prop: "title" },
        { label: "作者", prop: "author", width: "80" },
        { label: "最后修改日期", prop: "lastModDate", width: "150" }
      ],
      visible:false,
      entryId: -1,
      search: "",
      isNew: false
    };
  },
  components:{
    EntryEdit
  },
  computed: mapState({
    entries: state => state.Moudle.entries,
    pagination: state => state.Moudle.pagination,
  }),
  created() {
    if(this.$route.params.id)
      this.$router.push({name:'Entries'});
    this.Reload();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      if(to.name == 'Entries'){
        this.Reload();
        this.visible = false;
      }
      else
      {
        this.entryId = this.$route.params.id;
        this.visible = true;
      }
    }
  },
  methods: {
    ...mapActions(["FETCH_ENTRIES", "DELETE_ENTRIES", "SET_ENTRIES"]),
    Reload() {
      this.FETCH_ENTRIES({
        perPage: this.pagination.perPage,
        page: this.pagination.page,
        s: this.search
      });
    },
    handleEdit(index, row) {
      this.entryId = row.id;
      this.$router.push({ name: "EntryEdit", params: { id: this.entryId } });
    },
    async handleDelete(index, row) {
      this.entryId = row.id;
      await this.DELETE_ENTRIES({ id: this.entryId });
      // if(result)
      //   this.entries.splice(index,1);
      this.Reload();
    },
    async OnSave(entry) {
      await this.SET_ENTRIES(entry);
      this.Reload();
    },
    OnSearch() {
      this.Reload();
    },
    OnCreate(){
      this.entryId = null;
      this.$router.push({ name: "EntryEdit", params: { id: 'new'} });
    }
  }
};
</script>

<style scoped>
.pagination{
  margin-top: 1rem;
}
</style>