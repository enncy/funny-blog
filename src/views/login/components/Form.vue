<template>
  <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"

  >
    <a-form-item>
      <a-input
          @keydown="validate.handelSpacialChar"
          v-decorator="nameDecorator()"
          placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
          @keydown="validate.handelSpacialChar"
          v-decorator="passwordDecorator()"
          type="password"
          placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
          v-decorator="rememberDecorator()"
      >
        记住我
      </a-checkbox>
      <a class="login-form-forgot" href="">
        忘记密码
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
      或者
      <a @click="$router.push('/register')">
        注册
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import validate from '@/utils/validate'

const userApi = require("@/api/user")


export default {

  data() {
    return {

      validate,

    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },

  methods: {
    //账号组件包装
    nameDecorator() {
      return ['name', {rules: [{required: true, message: '请输入你的用户名'}],}]
    },
    //密码组件包装
    passwordDecorator() {
      return ['password', {rules: [{required: true, message: '请输入你的密码'}],}]
    },
    //密码组件包装
    rememberDecorator() {
      return ['remember',
        {
          valuePropName: 'checked',
          initialValue: true,
        }]
    },
    //登录提交
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, form) => {
        if (!err) {
          userApi.login(form.name, form.password).then((r) => {
            console.log("登录请求返回", r)
            if (r.data.status) {
              let userInfo =   r.data.data
              this.$message.success(r.data.msg)
              this.$store.dispatch('setUserInfo',userInfo)
              this.$emitter.emit('login',userInfo)
              setTimeout(()=>{
                if(window.history.length > 1){
                  //跳转去上一个路由
                  this.$router.back()
                }else this.$router.push('/user')
              },1000)
            } else {
              this.$message.error(r.data.msg)
            }
          }).catch((err) => {
            console.error(err)
          })
        }else{
          console.log(err)
        }
      });
    },

  },

};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>