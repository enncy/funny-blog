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
                            <a-button type="primary" size="large" class="mb-3" html-type="submit" block
                                >注册</a-button
                            >
                            <a-button block size="large" @click="resetForm"> 登录 </a-button>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </div>

        <div style="height: 32px; background-color: rgb(242, 242, 242)">
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

interface FormState {
    password: string;
    confirmPassword: string;
    email: string;
}

const formRef = ref();
const formState: UnwrapRef<FormState> = createForm<FormState>({
    password: "",
    confirmPassword: "",
    email: "",
});

async function commonValidator(rule: RuleObject, value: string) {
    if (!value) {
        return Promise.reject("不能留空");
    }
}

function handleFinish(values: FormState) {
    console.log(values);
}
function handleFinishFailed(errors: ValidateErrorEntity<FormState>) {
    console.log(errors);
}
function resetForm() {
    formRef.value.resetFields();
}

const rules = {
    password: [
        {
            required: true,
            validator: commonValidator,
            trigger: "blur",
        },
    ],
    confirmPassword: [
        {
            required: true,
            validator: commonValidator,
            trigger: "blur",
        },
    ],
    email: [
        {
            required: true,
            validator: (rule: RuleObject, value: string) => {
                commonValidator(rule, value);
                if (!/.+@.+/.test(value)) {
                    return Promise.reject("邮箱格式不正确");
                }
            },
            trigger: "change",
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
