<template>
  <div class="div-section" :style="{padding:padding?padding+'px':'10px',backgroundColor:ghost?'rgba(0,0,0,0)':'white'}">
    <!--如果自定义了 title 那么，则覆盖 slot 里面的内容-->
    <a-row  class="d-flex-nowrap">
      <a-col :span="12">
        <a-badge v-if="title" :color="color || '#d9d9d9'" />
        <a-icon v-if="icon" :type="icon" style="margin-right: 4px"/>
        <slot name="title">
          <span class="blog-font">{{title}}</span>
        </slot>
      </a-col>
      <a-col :span="12" class="d-flex-nowrap" style="justify-content: flex-end">
        <slot name="operation"> </slot>
      </a-col>
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
    ghost:Boolean,
  }
}
</script>

<style scoped>
.div-section{
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
}


</style>


<style scoped>
  .ant-badge >>> .ant-badge-status-dot{
  position: relative;
  top: -1px;
  display: inline-block;
  width: 6px;
  height: 14px;
  vertical-align: middle;
  border-radius: 2px;
}
</style>