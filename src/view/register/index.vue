<template>
    <div
        class="register-card box-shadow-base border-radius-base col-lg-4 col-xl-3 col-md-8 col-12"
    >
        <div class="p-4 pb-0">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="账号密码注册" class="p-2">
                    <a-form
                        class="text-left"
                        name="custom-validation"
                        ref="formRef"
                        :model="formState"
                        :rules="rules"
                        v-bind="layout"
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
                        <a-form-item class="mb-3">
                            <a-button
                                type="primary"
                                size="large"
                                html-type="submit"
                                :disabled="disabled"
                                block
                                @click.prevent="onSubmit"
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
            <a-button type="link" class="fl" @click="$router.push('/')">首页</a-button>

            <a-button type="link" class="fr" @click="$router.push('/login')"
                >已有账号</a-button
            >
            <a-button type="link" class="fr" @click="$router.push('/forget')"
                >忘记密码</a-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, UnwrapRef, watch } from "vue";

import { Rule, RuleObject, ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { AccountValidators, createForm, Validator } from "../../utils/form";
import { UserApi } from "../../api/user";
import { Message } from "../../utils";
import { RegExpFilter } from "../../utils/filter/regexp";
import { handleApi } from "../../api";
import { User } from "../../api/models/user";

const msg = ref("注册");
const disabled = ref(false);

type UserFormState = User & { confirmPassword: string };

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

async function onSubmit(values: UserFormState) {
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

    handleApi(UserApi.register(formState), (res) => {});
}

function resetForm() {
    formRef.value.resetFields();
}

const rules = {
    account: [
        {
            required: true,
            validator: Validator.all(
                ...AccountValidators.concat(Validator.api(UserApi.checkPassword))
            ),
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            validator: Validator.all(...AccountValidators),
            trigger: "blur",
        },
    ],
    confirmPassword: [
        {
            required: true,
            validator: Validator.all(
                Validator.regexpFilter((filter) => filter.blank().specialChar()),
                Validator.compare(
                    (v: string) => v !== formState.password,
                    "两次密码不一样"
                )
            ),
            trigger: "blur",
        },
    ],
    email: [
        {
            required: true,
            validator: Validator.all(
                Validator.regexpFilter((filter) => filter.blank().email()),
                Validator.api(UserApi.checkEmail)
            ),

            trigger: "blur",
        },
    ],
};
const layout = {
    wrapperCol: { span: 24 },
};
</script>

<style scope lang="less">
@media (min-width: 1200px) {
    .register-card {
        flex: 0 0 auto;
        width: 20%;
    }
}
.register-card {
    margin: 100px auto;

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

.ant-tabs-nav-scroll {
    text-align: left !important;
    font-size: 1rem;
}

[role="alert"] {
    text-align: left;
}
</style>
