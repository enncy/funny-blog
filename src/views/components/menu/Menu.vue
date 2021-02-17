<template>
  <div class="menu" >
    <a-row   >
      <a-col :span="18">
        <a-menu
            :inline-collapsed="collapsed"
            mode="horizontal"
            class="index-menu-item"

        >
          <template v-for="item in list">
            <a-menu-item v-if="!item.children" :key="item.key" @click="open(item.path)">
              <a-icon :type=" (item&&item.icon) || ''"/>
              <span>{{ item.title }}</span>
            </a-menu-item>
            <!--递归显示菜单-->
            <sub-menu v-else :key="item.key" :menu-info="item" @click="open(item.path)"/>
          </template>
          <!--搜索框-->
          <a-menu-item :key="'search-menu'">
            <a-input-search placeholder="搜索博客文章" style="width: 200px" @search="onSearch"/>
          </a-menu-item>

        </a-menu>


      </a-col>
      <a-col  :span="4" style="display: flex;justify-content: flex-end" class="user-menu">
        <user-menu style="display:flex;"></user-menu>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import UserMenu from "./UserMenu";
import config from "@/config";

export default {
  props: {
    list: Array
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
/*响应式*/

@media screen and (min-width: 801px) {
  .menu .index-menu-item{
    width: 100%;
  }

}

@media screen and (max-width: 800px) {
  .menu .index-menu-item{
    width: 60px;
  }

}
</style>
