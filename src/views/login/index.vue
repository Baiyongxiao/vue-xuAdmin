<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header">
      </div>
      <div class="loginBox">
        <div class="loginCon">
          <p class="title">保险产品投票系统</p>
          <el-card shadow="always" class="login-module">
            <div slot="header" class="clearfix formTitlt">
              <span>密码登录</span>
              <span class="titIconbox">
            </span>
            </div>
            <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item>
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入登录账号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入登录密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
              </el-form-item>
              <p class="smalltxt">
                <a class="a" @click="forgetPassword = true">忘记密码</a>
                <a class="a" @click="dialogFormVisible = true">免费注册</a>
              </p>
            </el-form>
          </el-card>
        </div>
      </div>
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
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="个人信息" :visible.sync="forgetPassword">
      <el-form :model="forget">
        <el-form-item label="请输入手机号码验证">
          <el-input v-model="forget.phone"></el-input>
        </el-form-item>
        <el-button>发送验证码</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="forgetPassword = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      forgetPassword: false,
      loginForm: {
        username: '',
        password: ''
      },
      form: {
        name: '',
        account: '',
        password: '',
        passwordVo: '',
        phone: '',
        sex: '',
      },
      forget: {
        phone:'',
      }
    }
  },
  methods: {
    submitForm () {
      let that = this
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message({
          showClose: true,
          message: '账号或密码不能为空',
          type: 'error'
        })
        return false
      } else {
        this.$axios.post('/api/user/login', {
          account: this.loginForm.username,
          password: this.loginForm.password,
        }).then(res => {
          if(res.data.status){
            that.$store.dispatch('setToken', res.data.token).then(() => {
              that.$router.push({path: '/'})
            })
          }else{
            this.$message.error(res.data.message)
          }
        })
      }
    },
    register () {
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
        role: 'ordinary',
        phone: this.form.phone,
        sex: this.form.sex,
      }).then(res => this.$message.info(res.data))
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
  #login {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
    .loginConbox{
      background: #2d3a4b;
    }
    .header {
      height: 60px;
      position: relative;
      background: #2d3a4b;
      /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
      .logo{
        margin-left: 30px;
        width: 500px;
        float: left;
        height: 40px;
        padding-top: 10px;
        img{
          height: 100%;
        }
      }
    }

    .loginBox {
      .iconcolor {
        color: #409EFF;
      }

      padding: 74px 0 118px;

      .loginCon {
        width: 990px;
        margin: auto;
        position: relative;
        height: 388px;

        .el-card__header {
          border-bottom: 0px;
        }
        .title{
          font-size: 36px;
          font-weight: 600;
          color: #ffffff;
          width: 500px;
          float: left;
          margin-top: 0px;
          &:first-child{
            font-size: 34px;
            margin-top: 50px;
            margin-bottom: 30px;
          }
        }
        .login-module {
          width: 380px;
          height: 325px;
          margin-top: 60px;
          border: none;
          position: absolute;
          right: 0;

          .formTitlt {
            font-size: 18px;
            font-weight: 400;

            .titIconbox {
              float: right;

              .pointer {
                cursor: pointer;
              }
            }
          }

          .smalltxt {
            text-align: right;

            .a {
              text-decoration: none;
              color: #999999;
              font-size: 12px;
              margin-left: 8px;
            }
          }
        }

        .el-form-item__content {
          margin-left: 0px !important;

          .subBtn {
            width: 100%;
          }
        }
      }

      .el-input__inner, .el-button, .el-card, .el-message {
        border-radius: 0px !important;
      }

      .el-form-item__content .ico {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 999;
        width: 40px;
        height: 39px;
        text-align: center;
        border-right: 1px solid #ccc;
      }

      .ewmbox {
        width: 100%;
        height: 240px;
        margin-top: -25px;

        .ewm {
          width: 140px;
          height: 140px;
          margin: 20px auto;

          p {
            font-size: 12px;
            padding-left: 40px;
            margin: 0;
          }
        }

        .ewmicon {
          width: 140px;
          margin: 20px auto 0;

          .iconfont {
            float: left;
          }

          p {
            font-size: 12px;
            padding-left: 40px;
            margin: 0;
          }
        }
      }
    }
  }
</style>
