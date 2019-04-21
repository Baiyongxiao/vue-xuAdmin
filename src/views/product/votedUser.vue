<template>
  <section>
    <el-table :data="user" style="width: 100%">
      <el-table-column label="序号" type="index" min-width></el-table-column>
      <el-table-column prop="name" label="昵称" min-width></el-table-column>
      <el-table-column prop="account" label="账号" min-width></el-table-column>
      <el-table-column prop="phone" label="手机号码" min-width></el-table-column>
      <el-table-column prop="sex" label="性别" min-width></el-table-column>
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
        programId: '',
        listQuery: {
          page: 1,
          limit: 10,
          userName: ''
        },
        total: null,
        user: [],
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
        this.programId = this.$route.query.programId
      },
      load(){
        this.$axios.post("/api/history/selectVotedUser", {
          programId: this.programId,
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit
        }).then(res =>{
          this.user = res.data.list
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

    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
