<template>
    <div
        class="register-card box-shadow-base border-radius-base col-lg-4 col-xl-3 col-md-6 col-12"
    >
        <div class="p-4 pb-0">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="注册" class="p-2">
                    <a-form
                        class="text-left funny-form"
                        name="custom-validation"
                        ref="formRef"
                        :model="formState"
                        :rules="rules"
                        v-bind="layout"
                        @finish="onSubmit"
                    >
                        <a-form-item has-feedback name="account">
                            <a-input
                                placeholder="账号"
                                size="large"
                                v-model:value.trim="formState.account"
                                type="text"
                            />
                        </a-form-item>
                        <a-form-item has-feedback name="password">
                            <a-input
                                placeholder="密码"
                                size="large"
                                v-model:value.trim="formState.password"
                                type="password"
                            />
                        </a-form-item>
                        <a-form-item has-feedback name="confirmPassword">
                            <a-input
                                placeholder="重复密码"
                                size="large"
                                v-model:value.trim="formState.confirmPassword"
                                type="password"
                            />
                        </a-form-item>
                        <a-form-item name="email">
                            <a-input
                                placeholder="邮箱"
                                size="large"
                                v-model:value.trim="formState.email"
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
                                v-model:value.trim="formState.code"
                                type="number"
                            >
                            </a-input>
                        </a-form-item>
                        <a-form-item class="mb-3">
                            <a-button
                                type="primary"
                                size="large"
                                html-type="submit"
                                :disabled="disabled"
                                block
                            >
                                {{ msg }}
                            </a-button>
                        </a-form-item>
                        <a-form-item>
                            <a-button block size="large" @click="resetForm">
                                重置
                            </a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
            </a-tabs>
        </div>

        <div
            class="border-radius-base"
            style="height: 32px; background-color: rgb(242, 242, 242)"
        >
            <a-button type="link" class="fl"><a href="/">首页</a></a-button>
            <a-button type="link" class="fr"><a href="/forget">忘记密码</a></a-button>
            <a-button type="link" class="fr"><a href="/login">登录</a></a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, UnwrapRef, watch } from "vue";

import { AccountValidators, createForm, Validator } from "../../utils/form";
import { UserApi } from "../../api/user";
import { handleApi, handleApiSync } from "../../api";
import { RegisterForm, User } from "../../api/models/user";
import { EmailApi } from "../../api/email";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { routerPush } from "../../route";

const msg = ref("注册");
const disabled = ref(false);

const formRef = ref();
const formState: UnwrapRef<RegisterForm> = createForm<RegisterForm>(
    {
        account: "",
        email: "",
        code: "",
        password: "",
        confirmPassword: "",
    },
    ["email"]
);

// 发送验证码
async function sendCode() {
    // 先验证邮箱
    await formRef.value.validateFields("email");
    handleApi(EmailApi.sendCode(formState.email));
}

async function onSubmit() {
    let count = 0;
    msg.value = "60s 后重新注册";
    disabled.value = true;
    let i = setInterval(() => {
        count++;
        msg.value = 60 - count + "s 后重新注册";
        if (count === 60) {
            clearInterval(i);
            msg.value = "注册";
            disabled.value = false;
        }
    }, 1000);

    const res = await handleApiSync(UserApi.register(formState));

    if (res?.data.success) {
        message.success(res.data.msg);
        setTimeout(() => {
            routerPush("/user")
        }, 1000);
    }
}

function resetForm() {
    formRef.value.resetFields();
}

const rules = {
    account: {
        required: true,
        validator: Validator.all(
            ...AccountValidators.concat(Validator.api(UserApi.checkAccount))
        ),
        trigger: "blur",
    },
    password: {
        required: true,
        validator: Validator.all(...AccountValidators),
        trigger: "blur",
    },
    confirmPassword: {
        required: true,
        validator: Validator.all(
            Validator.regexpFilter((filter) => filter.blank().specialChar()),
            Validator.compare((v: string) => v !== formState.password, "两次密码不一样")
        ),
        trigger: "blur",
    },
    email: {
        required: true,
        validator: Validator.all(
            Validator.regexpFilter((filter) => filter.blank().email()),
            Validator.api(UserApi.checkEmail)
        ),

        trigger: "blur",
    },
};
const layout = {
    wrapperCol: { span: 24 },
};
</script>

<style scope lang="less">
@media (min-width: 1200px) {
    #app .register-card {
        flex: 0 0 auto;
        width: 20%;
    }
}
.register-card {
    margin: 100px auto;
    background-color: white;
}
</style>
