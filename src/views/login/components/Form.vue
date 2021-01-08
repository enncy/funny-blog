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
          v-decorator="accountDecorator()"
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
      <a href="">
        注册
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import validate from '@/utils/validate'

export default {

  data() {
    return {

      validate
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  mounted() {

  },
  methods: {
    //账号组件包装
    accountDecorator() {
      return ['account', {rules: [{required: true, message: '请输入你的用户名'}],}]
    },
    //密码组件包装
    passwordDecorator() {
      return ['password', {rules: [{required: true, message: '请输入你的账号'}],}]
    },
    //密码组件包装
    rememberDecorator() {
      return ['remember',
        {
          valuePropName: 'checked',
          initialValue: true,
        }]
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
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