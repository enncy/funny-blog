<template>
  <BaseForm :emailIsValidate="emailIsValidate" @validateFinish="validateFinish" @validateError="validateError"
            @clear="clear">
    <template slot="email-btn">
      <a-button type="primary" v-show="canSend" :disabled="!isValidateFinish || sending" @click="sendEmail">
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
            @change="checkEmailCode"

        >

          <template v-show="sendFinish && emailCode.length!==0">
            <template slot="suffix">
              <a-icon v-show="emailIsValidate" type="check-circle" theme="filled" style="color:#52c41a;"/>
            </template>
            <template slot="suffix">
              <a-icon v-show="!emailIsValidate" type="close-circle" theme="filled" style="color:#f5222d;"/>
            </template>
          </template>


        </a-input>


      </a-input-group>

      <span style="color: #f5222d">{{ errorMsg }}</span>

    </template>
  </BaseForm>
</template>

<script>
import BaseForm from "./BaseForm";
import api from "@/api/index";


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
    }
  },
  methods: {
    //是否验证成功，验证信息成功后才能发送验证码
    validateFinish() {
      this.isValidateFinish = true
    },
    //信息验证失败
    validateError() {
      this.isValidateFinish = false
    },
    sendEmail() {
      if (!this.isValidateFinish) {
        this.$message.error("请把信息填写完整后再发送验证码")
      } else {
        this.$message.info("正在发送验证码...")
        this.sendFinish = false
        this.sending = true
        this.sendCount++
        setTimeout(() => {
          //开始计时
          this.countDown()
          //发送完成
          this.sendFinish = true
          this.sending = false
        }, 3000)

        // api.apiTest().then(() => {
        //   this.$message.success("验证码发送成功！请查收")
        //   //开始计时
        //   this.countDown()
        // }).catch((err) => {
        //   console.error(err)
        // })
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
      if (this.emailCode === '1111') {
        // this.$message.success("验证成功！")
        this.errorMsg = ' '
        this.emailIsValidate = true
      } else if (this.emailCode.length !== 4) {
        // this.$message.error("验证码为4位数的数字！")
        this.errorMsg = '验证码为4位数的数字!'
      } else {
        // this.$message.error("验证码错误！")
        this.errorMsg = '验证码错误!'
      }
    },
    //发送注册请求
    register() {

    },
    //重置表单
    clear() {
      this.emailCode = ""
      this.emailIsValidate = false
      this.isValidateFinish = false
      this.sendFinish = false
      this.errorMsg = ""
      this.emailCode = ""

    }
  }
}
</script>

<style scoped>

</style>