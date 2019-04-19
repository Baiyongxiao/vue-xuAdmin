<template>
  <section>
    <el-table :data="program" style="width: 100%">
      <el-table-column label="序号" type="index" min-width></el-table-column>
      <el-table-column prop="pay" label="投保条件" min-width></el-table-column>
      <el-table-column prop="compensate" label="补偿责任" min-width></el-table-column>
      <el-table-column prop="ticketCount" label="方案票数" min-width v-if="showTicket"></el-table-column>
      <el-table-column prop="createdUser" label="创建者" min-width></el-table-column>
      <el-table-column prop="createdDate" label="创建时间" min-width></el-table-column>

      <el-table-column fixed="right" label="投票" width="130">
        <template slot-scope="scope">
          <el-button @click="voted(scope.row)" type="success" round v-if="!showTicket">投票</el-button>
          <el-button disabled type="info" round v-if="showTicket && programVoId === scope.row.id">已投票</el-button>
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
        programVoId: '',
        showTicket: false,
        listQuery: {
          page: 1,
          limit: 10,
          userName: ''
        },
        program: [],
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
        this.$axios.get("/api/program/judgeIfVoted?productId="+this.productId)
          .then( res =>{
            if(res.data.showTicket === 1){
              this.showTicket = true
              this.programVoId = res.data.programVoId
            }
          })
        this.$axios.post("/api/program/findByProductId", {
          productId: this.productId,
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit
        }).then(res =>{
          this.program = res.data.list
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
      voted(row){
        this.$axios.post("/api/history/voted",{
          productId: this.productId,
          programId: row.id
        }).then( res =>{
          if(res.data === 1){
            this.load()
            this.$message.success("投票成功！")
          }else{
            this.$message.error("投票失败，请重新投票！")
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
