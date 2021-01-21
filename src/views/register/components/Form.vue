<template>
  <BaseForm :emailIsValidate="emailIsValidate" @validateFinish="validateFinish" @validateError="validateError"
            @clear="clear" @register="register">
    <template slot="email-btn">
      <a-button slot="email-btn-send" type="primary" v-show="canSend" :disabled="!isValidateFinish || sending"
                @click="sendEmail">
        {{
          sending
              ? '正在发送...'
              : sendCount > 0
              ? "重新发送"
              : "验证"
        }}
      </a-button>
      <a-button v-show="!canSend" type="primary" :disabled="count!==60">
        {{ count }} s
      </a-button>
    </template>
    <template v-if="sendFinish " slot="email-validate">
      <a-input-group style="display: flex;flex-wrap: nowrap;margin-top: 20px" compact>
        <a-input
            placeholder="输入4位数验证码"
            type="text"
            v-model="emailCode"
        >

          <template v-show="sendFinish ">
            <template slot="suffix">
              <a-icon v-show="emailIsValidate" type="check-circle" theme="filled" style="color:#52c41a;"/>
              <a-button type="link" @click="checkEmailCode">点击验证</a-button>
            </template>

          </template>


        </a-input>


      </a-input-group>

      <span style="color: #f5222d">{{ errorMsg }}</span>

    </template>
  </BaseForm>
</template>

<script>
import BaseForm from "@/views/register/components/BaseForm";

const emailApi = require('@/api/email')
const userApi = require('@/api/user')

const config = {
  count: 60,
  timeout: 100,
}


export default {
  name: "Form",
  components: {
    BaseForm
  },
  data() {
    return {
      //电子邮件是否验证成功
      emailIsValidate: false,
      //是否可以发送验证码
      canSend: true,
      //正在请求
      sending: false,
      //发送请求是否完成
      sendFinish: false,
      //时间计数
      count: config.count,
      //发送次数
      sendCount: 0,
      //是否信息验证完成
      isValidateFinish: false,
      //验证码
      emailCode: '',
      //错误信息
      errorMsg: ' ',
      //表单数据
      form: {
        email: ''
      },
    }
  },
  methods: {


    //是否验证成功，验证信息成功后才能发送验证码
    validateFinish(form) {
      this.isValidateFinish = true
      this.form = form
    },
    //信息验证失败
    validateError() {
      this.isValidateFinish = false
    },
    sendEmail() {
      if (!this.isValidateFinish) {
        this.$message.error("请把信息填写完整后再发送验证码")
      } else {
        //开始发送
        this.sendFinish = false
        this.sending = true

        this.sendCount++
        this.clearInput()

        emailApi.sendEmail(this.form.email).then((r) => {
          if (r.data.status) {

            this.$message.success(r.data.msg)
            //开始计时
            this.countDown()
          } else {
            this.$message.error(r.data.msg)
          }
          //发送完成
          this.sendFinish = true
          this.sending = false
        }).catch((err) => {
          console.error(err)
        })

        // setTimeout(()=>{
        //   //开始计时
        //   this.countDown()
        //   //发送完成
        //   this.sendFinish = true
        //   this.sending = false
        // },1000)


      }

    },
    //倒计时可以再次发送验证
    countDown() {
      this.canSend = false
      this.count = config.count
      //倒计时指定的秒数后，才能再次发起验证
      let s = setInterval(() => {
        this.count--
        if (this.count <= 0) {
          this.canSend = true
          clearInterval(s)
        }
      }, config.timeout)
    },
    //检验验证码
    checkEmailCode() {
      if (this.emailCode.length !== 4) {
        this.emailCodeError( '验证码为4位数的数字!')
      } else {
        //发送请求
        emailApi.checkEmailCode(this.form.email, this.emailCode).then((r) => {
          if (r.data.status) {
            this.$message.success(r.data.msg)
            this.emailCodeCorrect()
          } else {
            this.emailCodeError(r.data.msg)
          }
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    //验证码错误
    emailCodeError(msg){
      this.errorMsg = msg
      this.emailIsValidate = false
    },
    //验证码正确
    emailCodeCorrect(){
      this.errorMsg = ''
      this.emailIsValidate = true
    },
    //发送注册请求
    register(form) {
      userApi.register(form.name,form.password,form.email,this.emailCode).then((r) => {
        if(r.data.status){
          this.$message.success(r.data.msg)
          //保存数据
          this.$store.dispatch('setUserInfo',r.data.data)
          this.$emitter.emit('login',r.data.data)
          setTimeout(()=>{
            this.$router.push('/user')
          },1000)
        }else{
          this.$message.error(r.data.msg)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    clearInput(){
      this.errorMsg = ''
      this.emailCode = ''
    },
    //重置表单
    clear() {
      //验证码
      this.emailCode = ""
      //验证码失效
      this.emailIsValidate = false
      //未验证
      this.isValidateFinish = false
      //未发送
      this.sendFinish = false
      //错误信息清空
      this.errorMsg = ""

    }
  }
}
</script>

<style scoped>

</style>