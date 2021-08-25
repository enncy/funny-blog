<template>
  <a-sub-menu   :key="menuInfo.key" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon :type=" (menuInfo&& menuInfo.icon )|| ''"/>
      <span>{{ menuInfo.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item  :selectable="false" v-if="!item.children" :key="item.key">
        <a-icon :type=" (item&& item.icon )|| ''"/>
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu   v-else :key="item.key" :menu-info="item"/>

    </template>
  </a-sub-menu>
</template>

<script>

//按需引入
const Menu = antd.Menu

export default {
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
<style scoped>

</style>