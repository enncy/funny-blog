<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header class="index-header">
      <div class="logo">funy blog</div>
<!--      导航-->
      <navigation class="index-menu"></navigation>
    </a-layout-header>
    <a-layout-content class="index-content">
      <slot name="router">  </slot>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      funy blog ©2021 Created by klskeleton
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Navigation from "@/views/components/Navigation";
export default {
  name: "index",
  components: {
    Navigation
  }
}
</script>

<style>
#components-layout-demo-top .logo {
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  padding: 0  10px;
  float: left;
}
.layout {
  height: 100%;
}
.layout .index-header {
  background-color: white;
  height: auto;
  padding: 0px;
}
.layout .index-content {
  height: 100%;
  padding:  50px
}
/*覆盖 antdv 原生菜单栏样式的边框*/
.layout .index-header {
  border-bottom: 1px solid white;
}
.layout  .ant-menu-horizontal > .ant-menu-item-selected{
  border-bottom: 1px solid white;
}
.layout  .ant-menu-horizontal{
  border-bottom: 1px solid white;
}
</style>
