<template>
  <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="base-form"

  >
    <a-form-model-item ref="account" label="用户名" prop="account">
      <a-input
          @keydown="validateUtils.handelSpacialChar"
          v-model="form.account"
          @blur="()=>{
               validate()
            }"
          placeholder="account"
      />
    </a-form-model-item>
    <a-form-model-item ref="password" label="密码" prop="password">
      <a-input
          @keydown="validateUtils.handelSpacialChar"
          v-model="form.password"
          @blur="()=>{
               validate()
            }"
          placeholder="password"
      />
    </a-form-model-item>
    <a-form-model-item ref="confirmPassword" label="重复密码" prop="confirmPassword">
      <a-input
          @keydown="validateUtils.handelSpacialChar"
          v-model="form.confirmPassword"
          @blur="()=>{
               validate()
            }"
          placeholder="confirm your password"
      />
    </a-form-model-item>

    <a-form-model-item ref="email" label="qq邮箱" prop="email">
      <a-input-group style="display: flex;flex-wrap: nowrap" compact>
        <a-input
            v-model="form.email"
            :title="'邮箱用于找回账号密码'"
            placeholder="email 邮箱用于找回密码"

            @change="()=>{
               validate()
            }"
        />
        <slot name="email-btn"></slot>
      </a-input-group>

      <slot name="email-validate"></slot>

    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 18 ,offset:2 }">
      <a-row style="display: flex;flex-wrap: nowrap;width: 100%;">
        <a-col  >
          <a-button @click="resetForm">
            重置
          </a-button>
        </a-col>
        <a-col   class="base-btn">
          <a-button style="width: 100%;margin-left: 10px;" type="primary" @click="submit"  :disabled="!emailIsValidate">
            注册
          </a-button>
        </a-col>
      </a-row>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import validateUtils from "@/utils/validate";


export default {
  props: {
    emailIsValidate: Boolean
  },
  data() {
    return {
      validateUtils,

      labelCol: {span: 8},
      wrapperCol: {span: 14},
      other: '',
      form: {
        account: '',
        password: '',
        email: '',
        confirmPassword: '',
      },
      rules: {
        account: [
          {required: true, message: '请输入你的用户名', trigger: 'blur'},
          {min: 1, max: 16, message: '长度应该从 1 到 16 ,中文占2个长度', trigger: 'blur' , transform: (v)=>{return v.replace(/[\u4e00-\u9fa5]/g,"  ")}},
        ],
        password: [
          {required: true, message: '请输入你的密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度应该从 6 到 20', trigger: 'blur'},
        ],
        confirmPassword: [
          {
            validator: this.confirmPasswordEvent
          }
        ],
        email: [
          { required: true, message: '请输入你的qq邮箱 包括@qq.com', trigger: 'blur', pattern:'@qq.com' },
        ],

      },
    };
  },
  methods: {
    //验证表单
    validate() {
      //检测非法数据
      this.checkValue()
      //自动检验
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //发送验证成功
          this.validateFinish()
        } else {
          this.validateError()
          console.log('error validate!!');
          return false;
        }
      });
    },
    //检查表单值
    checkValue(){
      this.form.account = validateUtils.removeSpacialChar(this.form.account)
      this.form.password = validateUtils.removeSpacialChar(this.form.password)
      this.form.confirmPassword = validateUtils.removeSpacialChar(this.form.confirmPassword)

    },
    //提交表单
    submit(){
      console.log('submit!',this.form);
    },
    //重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.$emit('clear')
    },
    //重复确认密码是否正确
    confirmPasswordEvent(rule, value, callback) {
      if (!this.form.confirmPassword || !this.form.password) callback('请重复输入你的密码以确认!');
      else{
        //传入空参数默认为正确
        if (this.form.password === this.form.confirmPassword) callback()
        else callback('密码不一样!')
      }
    },
    //完成验证
    validateFinish() {
      this.$emit('validateFinish')
      console.log('validateFinish')
    },
    validateError(){
      this.$emit('validateError')
      console.log('validateError')
    }


  },
};
</script>

<style>

/*响应式*/
@media screen and (min-width: 575px) {
  .base-form {
    min-width: 450px;
  }
  .base-btn{
    width: 100%;
  }
}

/*当屏幕小于 575 时，消除 css 样式*/
@media screen and (max-width: 575px) {
  .base-form { }
  .base-btn{
    width: 50%;
  }
}

</style>
