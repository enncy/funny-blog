<template>
    <div
        class="reset-card box-shadow-base border-radius-base col-lg-4 col-xl-3 col-md-6 col-12"
    >
        <div class="p-4 pb-0">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="重置密码" class="p-2">
                    <a-form
                        class="text-left funny-form"
                        name="custom-validation"
                        ref="formRef"
                        :model="resetForm"
                        :rules="rules"
                        v-bind="layout"
                        @finish="onSubmit"
                    >
                        <a-form-item name="email">
                            <a-input
                                placeholder="邮箱"
                                size="large"
                                v-model:value.trim="resetForm.email"
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
                                v-model:value.trim="resetForm.code"
                                type="number"
                            >
                            </a-input>
                        </a-form-item>
                        <a-form-item has-feedback name="password">
                            <a-input
                                placeholder="新的密码"
                                size="large"
                                v-model:value.trim="resetForm.password"
                                type="password"
                            />
                        </a-form-item>
                        <a-form-item has-feedback name="confirmPassword">
                            <a-input
                                placeholder="重复密码"
                                size="large"
                                v-model:value.trim="resetForm.confirmPassword"
                                type="password"
                            />
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
                </a-tab-pane>
            </a-tabs>
        </div>

        <div
            class="border-radius-base"
            style="height: 32px; background-color: rgb(242, 242, 242)"
        >
            <a-button type="link" class="fl"><a href="/">首页</a></a-button>
            <a-button type="link" class="fr"><a href="/login">登录</a></a-button>
            <a-button type="link" class="fr"><a href="/register">注册</a></a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, UnwrapRef, watch } from "vue";

import { AccountValidators, createForm, Validator } from "../../utils/form";
import { UserApi } from "../../api/user";
import { EmailApi } from "../../api/email";
import { message } from "ant-design-vue";
import { handleApi, handleApiSync } from "../../api";
import { ResetForm } from "../../api/models";
import { routerPush } from "../../route";
 
const disabled = ref(false);

const formRef = ref();
const resetForm: UnwrapRef<ResetForm> = createForm<ResetForm>(
    {
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
    handleApi(EmailApi.sendCode(resetForm.email), (res) => {
        if (res.data.success) {
            message.success(res.data.data);
        }
    });
}

async function onSubmit() {
    disabled.value = true;

    console.log(resetForm);

    const res = await handleApiSync(UserApi.resetPassword(resetForm));
    if (res?.data.success) {
        message.success(res.data.data);
        setTimeout(() => {
            routerPush("/user")
        }, 1000);
    }
    disabled.value = false;
}

const rules = {
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
    password: {
        required: true,
        validator: Validator.all(...AccountValidators),
        trigger: "blur",
    },
    confirmPassword: {
        required: true,
        validator: Validator.all(
            Validator.regexpFilter((filter) => filter.blank().specialChar()),
            Validator.compare((v: string) => v !== resetForm.password, "两次密码不一样")
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
    .reset-card {
        flex: 0 0 auto;
        width: 20%;
    }
}
.reset-card {
    margin: 100px auto;

    background-color: white;
}
</style>
