<template>
  <div class="menu">
    <a-row class="index-menu-row">
      <a-col>
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
      <!--      用户菜单栏-->
      <a-col class="index-user-menu">
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
.index-menu-item {

}

.index-user-menu {
  justify-content: flex-end;
  width: 100%;
  display: flex;
}

@media screen and (min-width: 801px) {
  .index-menu-item {
    display: block;
  }


  .index-menu-row {
    display: flex;
    flex-wrap: nowrap;
    padding: 0px 100px 0px 100px
  }


}

/*当屏幕小于 575 时，隐藏*/
@media screen and (max-width: 800px) {
  .index-menu-item {
    display: none;
  }

  .index-menu-row {
    display: flex;
    flex-wrap: nowrap;

  }

}
</style>
