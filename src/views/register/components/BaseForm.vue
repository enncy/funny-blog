<template>
  <a-form :form="form" @submit="handleSubmit">


    <a-form-item v-bind="formItemLayout" label="用户名" >

      <a-input
          @keydown="validate.handelSpacialChar"
          v-decorator="[
          '用户名',
          {
            rules: [{ required: true, message: '请输入你的用户名', whitespace: true }],
          },
        ]"
      />
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
      <a-input
          @keydown="validate.handelSpacialChar"
          v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入你的密码',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
          type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="重复密码" has-feedback>
      <a-input
          @keydown="validate.handelSpacialChar"
          v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请重新输入你的密码',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
          type="password"
          @blur="handleConfirmBlur"
      />
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="qq邮箱">
      <slot name="email"></slot>
    </a-form-item>



    <a-form-item v-bind="tailFormItemLayout">
      <a-button   type="primary" html-type="submit" :disabled="!emailIsValidate">
        <span style="padding: 0px 20px 0px 20px">注册</span>
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import validate from '@/utils/validate'

export default {
  props:{
    emailIsValidate:Boolean
  },

  data() {
    return {
      validate,


      confirmDirty: false,

      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    keyup(e){
      e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/,"");
    }

  },
};
</script>