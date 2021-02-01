<template>

  <a-carousel  arrows ref="carousel"     >

    <div
        slot="prevArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="left: 10px;z-index: 1;"
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <template v-for="index in imgs" >
      <img   style="max-height: 350px"  :src="`https://cdn.jsdelivr.net/gh/klskeleton/cdn@1.0.1/src/img/bg${index}.png`" :key="index"/>
    </template>
  </a-carousel>
</template>
<script>

import api from  '@/api/index'

export default {
  data(){
    return {

      imgs:[8,7,6,5,4,3,2,1],
      //文案
      comments:'',
    }
  },
  methods:{

  },
  mounted() {

    this.$nextTick(()=>{
      setInterval(()=>{
        this.$refs?.carousel?.next()
      },5000)

    })
  }
};
</script>
<style scoped>


.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>