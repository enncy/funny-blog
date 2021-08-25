<template>
  <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="base-form"

  >
    <a-form-model-item ref="name" label="用户名" prop="name">
      <a-input
          @keydown="validateUtils.handelSpacialChar"
          v-model="form.name"
          @blur="()=>{

               nameFieldBlur()
            }"
          placeholder="name"
      >
        <template>
          <template slot="suffix">
            <a-button type="link" @click="checkNameValidate">验证</a-button>
          </template>
        </template>

      </a-input>
    </a-form-model-item>
    <a-form-model-item ref="password" label="密码" prop="password">
      <a-input
          @keydown="validateUtils.handelSpacialChar"
          v-model="form.password"
          @blur="()=>{
               $refs.password.onFieldBlur();
            }"
          type="password"
          placeholder="password"
      />
    </a-form-model-item>
    <a-form-model-item ref="confirmPassword" label="重复密码" prop="confirmPassword">
      <a-input
          @keydown="validateUtils.handelSpacialChar"
          v-model="form.confirmPassword"
          @blur="()=>{
               $refs.confirmPassword.onFieldBlur();
            }"
          type="password"
          placeholder="confirm your password"
      />
    </a-form-model-item>

    <a-form-model-item ref="email" label="qq邮箱" prop="email">
      <a-input-group class="email-group" compact>
        <a-input
            v-model="form.email"
            :title="'邮箱用于找回账号密码'"
            placeholder="email 邮箱用于找回密码"

            @blur="()=>{
               validate()
            }"

            @change="()=>{
               validate()
            }"
        />
        <slot name="email-btn">
          <slot name="email-btn-send" ></slot>
        </slot>
      </a-input-group>

      <slot name="email-validate"></slot>

    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span:21  ,offset:1 }">
      <a-row  class="reset-row">
        <a-col  >
          <a-button @click="resetForm">
            重置
          </a-button>
        </a-col>
        <a-col  class="register-col">
          <a-button class="register-btn" type="primary" @click="submit"  :disabled="!emailIsValidate">
            注册
          </a-button>
        </a-col>
      </a-row>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import validateUtils from "@/utils/validate";

import userApi from '@/api/user'


export default {
  props: {
    emailIsValidate: Boolean
  },
  data() {
    return {
      validateUtils,

      labelCol: {span: 4},
      wrapperCol: {span: 19},
      other: '',
      form: {
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入你的用户名', trigger: 'blur'},
          {min: 1, max: 16, message: '长度应该从 1 到 16 ,中文占2个长度', trigger: 'blur' , transform: (v)=>{return v.replace(/[\u4e00-\u9fa5]/g,"  ")}}, // 变成2个空格主要是方便判断长度
        ],
        password: [
          {required: true, message: '请输入你的密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度应该从 6 到 20', trigger: 'blur'},
        ],
        confirmPassword: [
          {
            required: true,
            message: '请重复确认你的密码',
            trigger: 'blur'
          },
          {
            validator: this.confirmPasswordEvent
          }
        ],
        email: [
          { required: true, message: '请输入你的qq邮箱 包括@qq.com', trigger: 'blur', pattern:'^.+@qq.com$' },
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
        console.log(valid)
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
      this.form.name = validateUtils.removeSpacialChar(this.form.name)
      this.form.password = validateUtils.removeSpacialChar(this.form.password)
      this.form.confirmPassword = validateUtils.removeSpacialChar(this.form.confirmPassword)

    },
    //提交表单
    submit(){
      console.log('submit!',this.form);
      this.$emit('register',this.form)
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
    //检测名字是否可用
    checkNameValidate(){
      this.$refs.ruleForm.validateField('name',(valid)=>{
        if(valid===''){
          if(!this.form.name || this.form.name==='') this.$message.error('请输入你的用户名')
          else {
            userApi.check(this.form.name).then((r) => {
              console.log(r)
              if(r.data.status){
                this.$message.success(r.data.msg)
              }else{
                this.$message.error(r.data.msg)
              }
            }).catch((err) => {
              console.error(err)
            })
          }
        }else{
          this.$message.error(valid)
        }
      })


    },
    //名字焦点事件
    nameFieldBlur(){
      console.log(this.$refs.name)
      this.$refs.name.onFieldBlur()
    },

    //完成验证
    validateFinish() {
      this.$emit('validateFinish',this.form)
      console.log('validateFinish')
    },
    //验证失败
    validateError(){
      this.$emit('validateError')
      console.log('validateError')
    },


  },
};
</script>

<style scoped>
</style>
