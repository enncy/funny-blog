<template>
  <div class="menu">
    <a-row style="display: flex;flex-wrap: nowrap;padding: 0px 100px 0px 100px">
      <a-col>
        <a-menu
            :inline-collapsed="collapsed"
            mode="horizontal"
        >
          <template v-for="item in list">
            <a-menu-item v-if="!item.children" :key="item.key" @click="open(item.path)">
              <a-icon :type=" (item&&item.icon) || ''"/>
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item" @click="open(item.path)"/>
          </template>
          <a-menu-item :key="'search-menu'">
            <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch"/>
          </a-menu-item>

        </a-menu>
      </a-col>
      <!--      用户菜单栏-->
      <a-col style="justify-content: flex-end;width: 100%;display: flex;">
        <user-menu></user-menu>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import UserMenu from "./UserMenu";
import config from "@/config";

export default {
  props:{
    list:Array
  },
  components: {
    'sub-menu': SubMenu,
    UserMenu
  },
  data() {
    return {
      config,
      collapsed: false
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    open(path) {
      this.$router.push(path)
    }
  },
};
</script>
<style scoped>
</style>
