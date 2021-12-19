<template>
    <a-form
        class="text-left funny-form"
        name="custom-validation"
        ref="formRef"
        :model="emailForm"
        :rules="emailRules"
        v-bind="layout"
        @finish="onSubmit"
    >
        <a-form-item name="email">
            <a-input
                placeholder="邮箱"
                size="large"
                v-model:value.trim="emailForm.email"
                type="email"
            >
                <template #suffix>
                    <a-button type="link" size="small" @click="sendCode"
                        >发送验证码</a-button
                    >
                </template>
            </a-input>
        </a-form-item>
        <a-form-item has-feedback name="code">
            <a-input
                placeholder="验证码"
                size="large"
                v-model:value.trim="emailForm.code"
                type="number"
            >
            </a-input>
        </a-form-item>
        <a-form-item>
            <div class="mt-4 d-flex flex-wrap">
                <a-button
                    type="primary"
                    size="large"
                    html-type="submit"
                    block
                    :disabled="disabled"
                >
                    登录
                </a-button>
            </div>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { ref } from "vue";
import { useRouter } from "vue-router";
 
import { handleApi, handleApiSync } from "../../api";
import { EmailApi } from "../../api/email";
import { UserApi } from "../../api/user";
import { routerPush } from "../../route";
import { createForm, Validator } from "../../utils/form";

interface EmailLoginForm {
    type: string;
    email: string;
    code: string;
}

const formRef = ref();
const emailForm = createForm<EmailLoginForm>(
    {
        type: "email",
        email: "",
        code: "",
    },
    ["email"]
);

const emailRules = {
    email: {
        required: true,
        validator: Validator.all(
            Validator.regexpFilter((filter) => filter.blank().email())
        ),
        trigger: "blur",
    },
    code: {
        required: true,
        validator: Validator.all(
            Validator.regexpFilter((filter) =>
                filter.blank().test(/[^0-9]/, "只能输入数字")
            ),
            Validator.range(6, 6, "验证码应为6个数字")
        ),
        trigger: "blur",
    },
};

const layout = {
    wrapperCol: { span: 24 },
};

const disabled = ref(false);
 
// 发送验证码
async function sendCode() {
    // 先验证邮箱
    await formRef.value.validateFields("email");

    handleApi(EmailApi.sendCode(emailForm.email), (res) => {
        if (res.data.success) {
            message.success(res.data.data);
        }
    });
}

async function onSubmit() {
    disabled.value = true;
    let { email, code } = emailForm;

    const res = await handleApiSync(UserApi.loginByEmail(email, code));

    if (res?.data.success) {
        message.success(res.data.msg);
        setTimeout(() => {
            routerPush("/user")
        }, 1000);
    }
    disabled.value = false;
}
</script>

<style scope lang="less"></style>
