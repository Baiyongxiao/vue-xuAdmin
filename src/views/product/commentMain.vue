<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="content" placeholder="请输入评论内容" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="addInfo()">新增评论</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="comment" style="width: 100%">
      <el-table-column label="序号" type="index" min-width></el-table-column>
      <el-table-column prop="account" label="用户账号" min-width></el-table-column>
      <el-table-column prop="content" label="评论内容" min-width></el-table-column>
      <el-table-column prop="createdDateVo" label="创建时间" min-width></el-table-column>

      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="deleteInfo(scope.row)" type="danger" round>删除</el-button>
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
        productId: '',
        content: '',
        listQuery: {
          page: 1,
          limit: 10,
          userName: ''
        },
        comment: [],
        total: null,
      }
    },
    created(){
      this.getParams()
    },
    mounted(){
      this.load()
    },
    methods :{
      getParams(){
        // 取到路由带过来的参数
        this.productId = this.$route.query.productId
      },
      load(){
        this.$axios.post("/api/comment/findByProductId", {
          productId: this.productId,
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit
        }).then(res =>{
          this.comment = res.data.list
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
      deleteInfo(row){
        this.$axios.get("/api/comment/deleteInfo?id="+row.id)
          .then(res =>{
            if(res.data === 1){
              this.load()
              this.$message.success("删除成功！")
            }else{
              this.$message.error("删除失败！")
            }
          })
      },
      addInfo(){
        this.$axios.post("/api/comment/addInfo",{
          productId: this.productId,
          content: this.content
        }).then(res => {
          if(res.data === 1){
            this.load()
            this.$message.success("添加成功！")
          }else{
            this.$message.error("添加失败！")
          }
        })
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
