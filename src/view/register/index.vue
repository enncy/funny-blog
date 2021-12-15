<template>
    <div class="register-card box-shadow-base border-radius-base">
        <div class="p-4 pb-0">
            <div class="font-v1" style="text-align: left">注册</div>
            <a-divider></a-divider>
            <div class="w-100 p-2">
                <a-form
                    class="text-left"
                    name="custom-validation"
                    ref="formRef"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
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
                    <a-form-item has-feedback name="email">
                        <a-input
                            size="large"
                            placeholder="邮箱"
                            type="email"
                            v-model:value.trim="formState.email"
                        />
                    </a-form-item>
                    <a-form-item>
                        <div class="mt-4 d-flex flex-wrap">
                            <a-button
                                type="primary"
                                size="large"
                                class="mb-3"
                                html-type="submit"
                                :disabled="disabled"
                                block
                            >
                                {{ msg }}
                            </a-button>
                            <a-button block size="large" @click="resetForm">
                                重置
                            </a-button>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </div>

        <div
            class="border-radius-base"
            style="height: 32px; background-color: rgb(242, 242, 242)"
        >
            <a-button type="link" class="fl">首页</a-button>

            <a-button type="link" class="fr">已有账号</a-button>
            <a-button type="link" class="fr">忘记密码</a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, UnwrapRef, watch } from "vue";

import { Rule, RuleObject, ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { createForm } from "../../utils/form";
import { UserApi, UserFormState } from "../../api/user";
import { User } from "../../api/models";
import { Message } from "../../utils";

const msg = ref("注册");
const disabled = ref(false);

const formRef = ref();
const formState: UnwrapRef<UserFormState> = createForm<UserFormState>(
    {
        account: "",
        nickName: "无昵称",
        password: "",
        confirmPassword: "",
        email: "",
    },
    ["email"]
);

async function commonValidator(rule: RuleObject, value: string) {
    if (!value) {
        return Promise.reject("不能留空");
    }
}

async function handleFinish(values: UserFormState) {
    console.log("注册", values);

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

    const res = await UserApi.register(formState);
    Message(res, res.data.data);
}
function handleFinishFailed(errors: ValidateErrorEntity<UserFormState>) {
    console.log(errors);
}
function resetForm() {
    formRef.value.resetFields();
}

const rules = {
    account: [
        {
            required: true,
            validator: async (rule: RuleObject, value: string) => {
                await commonValidator(rule, value);
                const { data } = await UserApi.checkAccount(value);
                if (!data.success) {
                    return Promise.reject(data.msg);
                }
            },
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            validator: async (rule: RuleObject, value: string) => {
                await commonValidator(rule, value);
                const { data } = await UserApi.checkPassword(value);
                if (!data.success) {
                    return Promise.reject(data.msg);
                }
            },
            trigger: "blur",
        },
    ],
    confirmPassword: [
        {
            required: true,
            validator: async (rule: RuleObject, value: string) => {
                await commonValidator(rule, value);
                if (value !== formState.password) {
                    return Promise.reject("2次密码不一致");
                }
            },
            trigger: "blur",
        },
    ],
    email: [
        {
            required: true,
            validator: async (rule: RuleObject, value: string) => {
                await commonValidator(rule, value);
                if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
                    return Promise.reject("邮箱格式不正确");
                }
                const { data } = await UserApi.checkEmail(value);
                if (!data.success) {
                    return Promise.reject(data.msg);
                }
            },
            trigger: "blur",
        },
    ],
};
const layout = {
    wrapperCol: { span: 24 },
};
</script>

<style scope lang="less">
.register-card {
    margin-top: 100px;
    width: 100%;
    background-color: white;

    input {
        border-right: none;
        border-top: none;
        border-left: none;
        box-shadow: none;
    }
}
.ant-input:focus,
.ant-input:hover {
    border-color: none !important;
    border-right-width: none !important;
    box-shadow: none !important;
    outline: 0 !important;
}

[role="alert"] {
    text-align: left;
}
</style>
