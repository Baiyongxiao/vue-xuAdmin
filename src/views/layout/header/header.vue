<template>
  <div>
    <el-header id="header">
      <span class="hideAside" @click="collapse"><i class="fa fa-indent fa-lg"></i></span>
      <ul class="personal">
        <li class="fullScreen" @click="fullScreen">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom"><i
            class="fa fa-arrows-alt fa-lg"></i></el-tooltip>
        </li>
        <li>
          <langSelect></langSelect>
        </li>
        <li>{{ $t(`role.${this.$store.getters.info.role}`) }}</li>
        <li>
          <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{this.$store.getters.info.name }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">{{ $t('userDropdownMenu.basicInfor') }}</el-dropdown-item>
              <el-dropdown-item command="history">{{ $t('userDropdownMenu.history') }}</el-dropdown-item>
              <el-dropdown-item command="logout" divided>{{ $t('userDropdownMenu.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="icon"><img :src="avatar"/></li>
      </ul>
    </el-header>
    <tabNav></tabNav>

    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account" disabled></el-input>
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
        <el-button type="primary" @click="updateInfo">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import langSelect from '../../../components/lang/langSelect'
  import tabNav from './tabNav'

  export default {
    name: 'Header',
    components: {tabNav, langSelect},
    data () {
      return {
        isfullScreen: true,
        dialogFormVisible: false,
        form: {
          id:'',
          name: '',
          account:'',
          password:'',
          passwordVo:'',
          phone:'',
          sex:'',
        },
        avatar: './static/images/icon.jpg'
      }
    },
    mounted () {

    },
    methods: {
      collapse () {
        this.$store.dispatch('collapse')
      },
      fullScreen () {
        if (this.isfullScreen) {
          var docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
          }
          this.isfullScreen = false
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
          this.isfullScreen = true
        }
      },
      handleCommand (command) {
        if (command === 'logout') {
          Cookies.remove('token');
          location.reload()

        }else if (command === 'info') {
          this.$axios.get("/api/user/findUserById?id="+this.$store.getters.info.id)
            .then(res =>{
              this.form = res.data
              this.dialogFormVisible = true
            })
        }else if (command === 'history') {
          this.$router.push({
            path: '/history',
          })
        }
      },
      updateInfo(){
        this.dialogFormVisible = false;
        if(this.form.name === '' || this.form.name === null){
          this.$message.error("用户名不可以为空！");
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
        this.$axios.post('/api/user/updateUserInfo', {
          id: this.form.id,
          name: this.form.name,
          password: this.form.password,
          phone: this.form.phone,
          sex: this.form.sex,
        }).then(res =>{
          if(res.data === 1){
            Cookies.remove('token');
            location.reload()
            this.$message.success("更新成功，请重新登录！")
          }else{
            this.$message.error("更新失败！")
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  $top: top;
  $bottom: bottom;
  $left: left;
  $right: right;
  $leftright: ($left, $right);
  %w100 {
    width: 100%;
  }

  %h100 {
    height: 100%;
  }

  %cursor {
    cursor: pointer;
  }

  html, body, #app, .el-container, #asideNav, ul.el-menu {
    @extend %h100;
  }

  @mixin set-value($side, $value) {
    @each $prop in $leftright {
      #{$side}-#{$prop}: $value;
    }
  }

  #header {
    max-height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    display: flex;
    justify-content: space-between;
    .hideAside {
      @extend %cursor;
    }
    .personal {
      display: flex;
      flex-direction: row;
      li {
        @include set-value(margin, 13px);
        font-size: 12px;
      }
      .fullScreen {
        @extend %cursor;
      }
      .el-dropdown-link {
        @extend %cursor;
      }
      .icon img {
        margin-#{$top}: 7px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        width: 40px;
        height: 40px;
      }
    }
  }
</style>
