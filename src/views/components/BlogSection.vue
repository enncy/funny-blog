<template>
  <div class="div-section" :style="{padding:padding?padding+'px':'10px'}">
    <!--如果自定义了 title 那么，则覆盖 slot 里面的内容-->
    <a-row  >
      <a-badge v-if="title" :color="color || '#d9d9d9'" />
      <a-icon v-if="icon" :type="icon" style="margin-right: 4px"/>
      <slot name="title">
        <span class="blog-font">{{title}}</span>
      </slot>
      <slot name="operation"> </slot>
    </a-row>

    <a-row>
      <slot></slot>
    </a-row>

  </div>
</template>

<script>
export default {
  props:{
    color:String,
    title:String,
    padding:Number,
    icon:String,
  }
}
</script>

<style scoped>
.div-section{
  padding: 10px;
  border-radius: 6px;
  background-color: white;
  margin-bottom: 10px;
}


</style>


<style scoped>
  >>> .ant-badge-status-dot{
  position: relative;
  top: -1px;
  display: inline-block;
  width: 6px;
  height: 14px;
  vertical-align: middle;
  border-radius: 2px;
}
</style>