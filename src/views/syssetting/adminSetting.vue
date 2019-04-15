<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="account" placeholder="请输入账号" clearable @change="accountChange"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUser">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible=true">新增管理员</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="user" style="width: 100%">
      <el-table-column label="序号" type="index" min-width></el-table-column>
      <el-table-column prop="id" label="用户id" min-width></el-table-column>
      <el-table-column prop="name" label="昵称" min-width></el-table-column>
      <el-table-column prop="roleVo" label="角色" min-width></el-table-column>
      <el-table-column prop="account" label="账号" min-width></el-table-column>
      <el-table-column prop="phone" label="手机号码" min-width></el-table-column>
      <el-table-column prop="sex" label="性别" min-width></el-table-column>
      <el-table-column prop="createdUser" label="创建者" min-width></el-table-column>
      <el-table-column prop="updatedUser" label="更新者" min-width></el-table-column>
      <el-table-column prop="createdDate" label="创建时间" min-width></el-table-column>
      <el-table-column prop="updatedDate" label="更新时间" min-width></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editInfo(scope.row)" type="text" size="small">编辑</el-button>
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

    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.passwordVo" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="用户信息" :visible.sync="editRole">
      <el-form :model="role">
        <el-form-item label="昵称">
          <el-input v-model="role.name" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="role.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio v-model="role.role" label="admin">管理员</el-radio>
          <el-radio v-model="role.role" label="ordinary">普通用户</el-radio>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRole = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 10,
          userName: ""
        },
        total: null,
        dialogFormVisible: false,
        editRole: false,
        account:'',
        user:[],
        form: {
          name: '',
          account: '',
          password: '',
          passwordVo: '',
          phone: '',
          sex: '',
        },
        role:{
          name:'',
          account:'',
          role:'',
        },
      }
    },
    mounted(){
      this.load()
    },
    methods:{
      getUser(){
        this.$axios.get("/api/user/findByUserAccount?account="+this.account).then(
          res =>{
            this.user = [];
            this.user.push(res.data)
          }
        )
      },
      handleAdd(){
        this.dialogFormVisible = false;
        if(this.form.name === '' || this.form.name === null){
          this.$message.error("用户名不可以为空！");
          return;
        }
        if(this.form.account === '' || this.form.account === null){
          this.$message.error("账号不可以为空！");
          return;
        }
        if(this.form.password === '' || this.form.password === null){
          this.$message.error("密码不可以为空！");
          return;
        }else if (this.form.password !== this.form.passwordVo) {
          this.$message.error("两次输入的密码不同！");
          return;
        }
        if(this.form.phone === '' || this.form.phone === null){
          this.$message.error("手机号码不可以为空！");
          return;
        }
        if(this.form.sex === '' || this.form.sex === null){
          this.$message.error("性别不可以为空！");
          return;
        }
        this.$axios.post('/api/user/register', {
          name: this.form.name,
          account: this.form.account,
          password: this.form.password,
          role: 'admin',
          phone: this.form.phone,
          sex: this.form.sex,
        }).then(res => {
          this.$message.info(res.data)
          this.load()
        })

      },
      accountChange(){
        if(this.account === '' || this.account === null){
          this.load()
        }
      },
      load(){
        this.$axios.get("/api/user/findAllUser", {
          params:{
            pageNum: this.listQuery.page,
            pageSize: this.listQuery.limit
            }
          }
        ).then(res =>{
          this.user = res.data.list
          this.total = res.data.total
        })
      },
      editInfo(e){
        this.editRole = true
        this.role = e
      },
      handleUpdate(){
        this.editRole = false
        this.$axios.post('/api/user/updateUser', {
          account: this.role.account,
          role: this.role.role
        }).then(res => {
          if(res.data === 1){
            this.load()
          }else{
            this.$message.error("更新失败，请重试！")
          }
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
      /*dateFormat(row,column){
        let date = row[column.property];   
        if(date === undefined){
          return ''
        };
        var d = new Date(date);

        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      }*/
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: rgba(23, 30, 209, 0.01);
    color: #333;
    line-height: 100px;
  }

  .el-aside {
    color: #333;
  }
</style>
