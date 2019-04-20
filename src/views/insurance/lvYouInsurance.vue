<template>
    <section>
      <!--工具条-->
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
    data(){
      return {
        listQuery: {
          page: 1,
          limit: 10,
          userName: ''
        },
        total: null,
        product: [],
      }
    },
    mounted(){
      this.load()
    },
    methods:{
      load(){
        this.$axios.post("/api/product/findAllProduct", {
          classification: 2,
          status: 1,
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


<style scoped>

</style>
