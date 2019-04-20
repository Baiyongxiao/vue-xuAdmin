<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item label="产品名称:">
          <el-autocomplete
            clearable
            class="inline-input"
            v-model="title"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
          </el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="load()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="product" style="width: 100%">
      <el-table-column label="序号" type="index" min-width></el-table-column>
      <el-table-column prop="classificationVo" label="产品类别" min-width></el-table-column>
      <el-table-column prop="name" label="保险名称" min-width></el-table-column>
      <el-table-column prop="content" label="内容" min-width></el-table-column>
      <el-table-column prop="createdUser" label="创建者" min-width></el-table-column>
      <el-table-column prop="createdDateVo" label="创建时间" min-width></el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="showPro(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="remark(scope.row)" type="text" size="small">评论</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30,40]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<script>

export default {
  name: 'mainIndex',
  data () {
    return {
      title:'',
      product: [],
      listQuery: {
        page: 1,
        limit: 10,
        userName: ''
      },
      total: null,
    }
  },
  components: {},
  mounted () {
    this.load()
  },
  methods: {
    load(){
      this.$axios.post("/api/product/findAllProduct", {
        status: 1,
        name: this.title,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit
      }).then(res =>{
        this.product = res.data.list
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.load();
    },
    showPro(row){
      this.$router.push({
        path: '/vote',
        query: {
          productId: row.id
        }
      })
    },
    querySearch(queryString, cb) {
      let searchRecord = []
      this.$axios.get("/api/search/findAllSearch").then(res =>{
        for(let i=0;i<res.data.length;i++){
          searchRecord.push(res.data[i])
        }
      })
      let results = queryString ? searchRecord.filter(this.createFilter(queryString)) : searchRecord;
      cb(results);
    },
    createFilter(queryString) {
      return (searchRecord) => {
        return (searchRecord.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      /**
       * 选中值进行的操作
       */
    },
    remark(row){
      this.$router.push({
        path: '/comment',
        query: {
          productId: row.id
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
