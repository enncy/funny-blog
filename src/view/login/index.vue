<template>
    <div class="login-card box-shadow-base border-radius-base col-lg-4 col-md-8 col-12">
        <div class="p-4 pb-0">
  
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="账号密码登录" class="p-2 w-100">
                    <AccountLogin />
                </a-tab-pane>
                <a-tab-pane key="2" tab="邮箱登录" class="p-2 w-100">
                    <EmailLogin />
                </a-tab-pane>
            </a-tabs>
        </div>

        <div
            class="border-radius-base"
            style="height: 32px; background-color: rgb(242, 242, 242)"
        >
            <a-button type="link" class="fl"><a href="/">首页</a></a-button>
            <a-button type="link" class="fr"><a href="/forget">忘记密码</a></a-button>
            <a-button type="link" class="fr"><a href="/register">注册</a></a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import AccountLogin from "./AccountLogin.vue";
import EmailLogin from "./EmailLogin.vue";
 
</script>

<style scope lang="less">
@media (min-width: 1200px) {
    .login-card {
        flex: 0 0 auto;
        width: 20%;
    }
}
.login-card {
    margin: 100px auto;
    background-color: white;
    min-width: 320px;

}
//  display: flex;
//     align-items: center;

</style>
