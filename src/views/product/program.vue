<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible=true">新增产品投票方案</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="program" style="width: 100%">
      <el-table-column label="序号" type="index" min-width>方案</el-table-column>
      <el-table-column prop="id" label="产品方案id" min-width></el-table-column>
      <el-table-column prop="pay" label="投保条件" min-width></el-table-column>
      <el-table-column prop="compensate" label="补偿责任" min-width></el-table-column>
      <el-table-column prop="ticketCount" label="方案票数" min-width></el-table-column>
      <el-table-column prop="createdUser" label="创建者" min-width></el-table-column>
      <el-table-column prop="updatedUser" label="更新者" min-width></el-table-column>
      <el-table-column prop="createdDate" label="创建时间" min-width></el-table-column>
      <el-table-column prop="updatedDate" label="更新时间" min-width></el-table-column>

      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="updatedInfo(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteProgram(scope.row)" type="text" size="small">删除</el-button>
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

    <el-dialog title="产品方案信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="投保条件:">
          <el-input v-model="form.pay" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="补偿责任:">
          <el-input v-model="form.compensate" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改产品信息" :visible.sync="dialogVisible">
      <el-form :model="programVo">
        <el-form-item label="保险名称:">
          <el-input v-model="programVo.pay" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="保险内容:">
          <el-input v-model="programVo.compensate" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatedInfoTwo">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data(){
      return{
        dialogFormVisible: false,
        dialogVisible: false,
        productId:'',
        listQuery: {
          page: 1,
          limit: 10,
          userName: ''
        },
        program: [],
        programVo: {},
        total: null,
        form: {
          pay: '',
          compensate: '',
        },
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
      updatedInfo(row){

      },
      deleteProgram(row){
        this.$axios.get("/api/program/deleteById?id="+row.id).then(
          res => {
            if(res.data === 1){
              this.$message.success("删除成功！")
              this.load()
            }else{
              this.$message.error('删除失败！')
            }
          }
        )
      },
      load(){
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
      handleAdd(){
        this.dialogFormVisible = false;
        if(this.form.pay === '' || this.form.pay === null){
          this.$message.error("投保条件不可以为空！");
          return;
        }
        if(this.form.compensate === '' || this.form.compensate === null){
          this.$message.error("补偿责任不可以为空！");
          return;
        }
        this.$axios.post('/api/program/insertProgram', {
          productId: this.productId,
          pay: this.form.pay,
          compensate: this.form.compensate,
        }).then(res => {
          if(res.data === 1){
            this.$message.success("添加成功！")
            this.load()
          }else{
            this.$message.error('添加未成功！')
          }
        })

      },
      updatedInfo(row){
        this.dialogVisible = true
        this.programVo = row
      },
      updatedInfoTwo(){
        this.$axios.post("/api/program/updateInfo",{
          id: this.programVo.id,
          pay:this.programVo.pay,
          compensate:this.programVo.compensate,
        }).then(res => {
          if(res.data === 1){
            this.$message.success("更新成功！")
          }else{
            this.$message.error("更新失败！")
          }
        })
        this.dialogVisible = false
        this.load()
      },
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
