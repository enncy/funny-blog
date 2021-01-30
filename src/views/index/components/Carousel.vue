<template>

  <a-carousel arrows ref="carousel">

    <div
        slot="prevArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="left: 10px;z-index: 1"
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <template v-for="index in imgLength" >
      <img  :src="`https://cdn.jsdelivr.net/gh/klskeleton/cdn/src/img/bg${index}.png`" :key="index"/>
    </template>
  </a-carousel>
</template>
<script>

import api from  '@/api/index'

export default {
  data(){
    return {
      carousel:'100%',
      imgLength:4,
      //文案
      comments:'',
    }
  },
  methods:{

  },
  mounted() {

    this.$nextTick(()=>{
      this.carousel = this.$refs.carousel?.$el?.clientWidth+'px'
    })
  }
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
   height: 250px;

}

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