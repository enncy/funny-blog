<template>
  <container>
    <a-space style="height: 64px" :size="20">
      <!-- 图标 logo -->
      <qbklogo/>

      <div class="flex adapt-hide">
        <border-item
          v-for="item of navigations"
          position="bottom"
          style="height: 64px"
          class="flex ai-center font-v2 pointer"
          @click="clickItem(item.path, $event)"
        >
          <template #body>
            <span>{{ item.title }} </span>
          </template>
        </border-item>
      </div>

      <!-- 搜索框 -->

      <a-input-search
        v-model:value="searchValue"
        placeholder="输入文章标题或者用户名"
        class="background-color border-radius-circle lg-6 xs-10 height-24"
        @search="onSearch"
      />

      <div class="lg-3" />

      <a-dropdown placement="bottomCenter" :trigger="['hover', 'click']">
        <div class="pointer flex ai-center" style="height: 100%" @click.prevent>
          <a-avatar>U</a-avatar>
          <span class="adapt-hide font-nowrap">未登录</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item> <UserOutlined /> 个人中心 </a-menu-item>
            <a-menu-item> <SettingOutlined /> 个人设置 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-space>
  </container>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
// import { SettingOutlined, UserOutlined } from "@ant-design/icons-vue";

import { MenuData } from "../interface/MenuData";
import BorderItem from "./BorderItem.vue";
import { useRouter } from "vue-router";
import Login from "../login/login.vue";
import Container from "./Container.vue";
import Qbklogo from "./qbklogo.vue";

export default defineComponent({
  components: {
    // SettingOutlined,
    // UserOutlined,
    BorderItem,
    Login,
    Container,
    Qbklogo,
  },
  name: "menu",

  setup() {
    const navigations = ref<MenuData[]>([
      { title: "首页", path: "/" },
      { title: "推荐", path: "/" },
      { title: "分类", path: "/" },
      { title: "专栏", path: "/" },
    ]);

    const router = useRouter();
    const searchValue = ref("");
    return {
      // 菜单信息
      navigations,
      // 搜索字符串
      searchValue,
      // 搜索
      onSearch() {},
      // 点击链接
      clickItem(path: string, e: any) {
        // 排他
        document.querySelectorAll(".acive").forEach((el) => {
          el.className = el.className.replace(/ +/g, " ").replace("acive", "");
        });
        // 设置活动链接
        let target: any = e.path.find(
          (el: any) => el.className.indexOf("border-item") != -1
        );
        target.className += " acive";
        // 跳转
        path && router.push(path);
      },
    };
  },
});
</script>

<style scope lang='less'>
#navigation {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>