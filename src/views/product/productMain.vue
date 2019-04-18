<template>
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item label="保险类别:">
            <el-select v-model="selectValue" placeholder="请选择" @focus="remoteMethod"
              clearable>
              <el-option
                v-for="item in this.classify"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保险状态:">
            <el-select v-model="status" placeholder="请选择状态" clearable>
              <el-option label="上线" value="1"></el-option>
              <el-option label="下线" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="load">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogFormVisible=true">新增产品投票</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="product" style="width: 100%">
        <el-table-column label="序号" type="index" min-width></el-table-column>
        <el-table-column prop="id" label="产品id" min-width></el-table-column>
        <el-table-column prop="classificationVo" label="产品类别" min-width></el-table-column>
        <el-table-column prop="name" label="保险名称" min-width></el-table-column>
        <el-table-column prop="content" label="内容" min-width></el-table-column>
        <el-table-column prop="statusVo" label="当前状态" min-width></el-table-column>
        <el-table-column prop="createdUser" label="创建者" min-width></el-table-column>
        <el-table-column prop="updatedUser" label="更新者" min-width></el-table-column>
        <el-table-column prop="createdDate" label="创建时间" min-width></el-table-column>
        <el-table-column prop="updatedDate" label="更新时间" min-width></el-table-column>

        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="showPro(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="updatedInfo(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="updatedStatus(scope.row)" type="text" size="small" v-if="scope.row.status === 2">上线</el-button>
            <el-button @click="updatedStatus(scope.row)" type="text" size="small" v-if="scope.row.status === 1">下线</el-button>
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

      <el-dialog title="产品信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="保险类别:">
            <el-select v-model="form.formSelectValue" placeholder="请选择" @focus="remoteMethod">
              <el-option
                v-for="item in this.classify"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保险名称:">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="保险内容:">
            <el-input v-model="form.content" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="保险状态:">
            <el-radio v-model="form.status" label="1">上线</el-radio>
            <el-radio v-model="form.status" label="2">下线</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改产品信息" :visible.sync="dialogVisible">
        <el-form :model="productVo">
          <el-form-item label="保险类别:">
            <el-select v-model="productVo.classificationVo" placeholder="请选择" @focus="remoteMethod"
              @change="jiaozheng"
            >
              <el-option
                v-for="item in this.classify"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保险名称:">
            <el-input v-model="productVo.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="保险内容:">
            <el-input v-model="productVo.content" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="保险状态:">
            <el-radio v-model="productVo.status" label="1">上线</el-radio>
            <el-radio v-model="productVo.status" label="2">下线</el-radio>
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
      return {
        classify: [],
        selectValue: '',
        remote: true,
        listQuery: {
          page: 1,
          limit: 10,
          userName: ''
        },
        total: null,
        product: [],
        productVo: {},
        classificationTwo: '',
        dialogFormVisible: false,
        dialogVisible: false,
        form: {
          name: '',
          content: '',
          formSelectValue: '',
          status: '',
        },
        status: '',
      }
    },
    mounted(){
      this.load()
    },
    methods:{
      remoteMethod(){
        this.$axios.get("/api/enum/getClassify"
        ).then(res => this.classify = res.data)
      },
      load(){
        this.$axios.post("/api/product/findAllProduct", {
          classification: this.selectValue,
          status: this.status,
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
      handleAdd(){
        this.dialogFormVisible = false;
        if(this.form.name === '' || this.form.name === null){
          this.$message.error("产品名称不可以为空！");
          return;
        }
        if(this.form.content === '' || this.form.content === null){
          this.$message.error("内容不可以为空！");
          return;
        }
        if(this.form.formSelectValue === '' || this.form.formSelectValue === null){
          this.$message.error("请选择状态！");
          return;
        }
        if(this.form.status === '' || this.form.status === null){
          this.$message.error("请选择状态！");
          return;
        }
        this.$axios.post('/api/product/addProduct', {
          name: this.form.name,
          content: this.form.content,
          classification: this.form.formSelectValue,
          status: this.form.status,
        }).then(res => {
          if(res.data === 1){
            this.$message.success("添加成功！")
            this.load()
          }else{
            this.$message.error('添加未成功！')
          }
        })

      },
      updatedStatus(row){
        let status;
        if(row.status === 1){
          status = 2
        }else{
          status = 1
        }
        this.$axios.post("/api/product/updatedStatus", {
          id: row.id,
          status:status,
        }).then(res =>{
          if(res.data === 1){
            this.$message.success("更新成功！")
          }else{
            this.$message.error("更新失败！")
          }
        })
        this.load()
      },
      updatedInfo(row){
        this.dialogVisible = true
        this.productVo = row
        this.classificationTwo = row.classification
      },
      updatedInfoTwo(){
        this.$axios.post("/api/product/updatedInfo",{
          id:this.productVo.id,
          classification: this.classificationTwo,
          name:this.productVo.name,
          content:this.productVo.content,
          status:this.productVo.status,
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
      jiaozheng(){
        this.classificationTwo = this.productVo.classificationVo
      },
      showPro(row){
        this.$router.push({
          path: '/program',
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
