<template>
  <BaseForm :emailIsValidate="emailIsValidate">
    <template slot="email">
      <a-input-group style="display: flex;flex-wrap: nowrap" compact>
        <a-input
            v-decorator="emailDecorator"
        />
        <a-button type="primary" v-if="!sending" :disabled="emailIsValidate " @click="sendEmail">
          验证
        </a-button>

        <a-button v-else type="primary" :disabled="count!==60">
          {{ count }} s
        </a-button>


      </a-input-group>
      <a-input-group style="display: flex;flex-wrap: nowrap" compact>
        <a-input
            v-if="sending"
            placeholder="输入4位数验证码"
            v-decorator="emailCodeDecorator"
        />
        <a-button type="primary" v-if="sending" :disabled="emailIsValidate " @click="sendEmail">
          验证
        </a-button>
      </a-input-group>


    </template>
  </BaseForm>
</template>

<script>
import BaseForm from "./BaseForm";

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
      //是否正在发送验证码
      sending: false,
      //时间计数
      count: config.count,

    }
  },
  methods: {
    sendEmail() {
      this.$message.success("正在发送验证码，请查收")
      //开始计时
      this.countDown()
      //正在发送
      this.sending = true
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
    emailCodeDecorator() {
      return [
        'emailCode', {
          rules: [
            {
              type: 'number',
              message: '验证码填写不正确！',
            },
            {
              required: true,
              message: '请输入邮箱',
            },

          ],
        },

      ]
    },
    emailDecorator() {
      return [
        'email',
        {
          rules: [
            {
              type: 'email',
              message: '邮箱填写不正确！',
            },
            {
              required: true,
              message: '请输入邮箱',
            },

          ],
        },
      ]
    }


  }
}
</script>

<style scoped>

</style>