<template>

  <span class="blog-index-catalog">
    <template v-if="tags.length===0">

    </template>
    <blog-section class="section" v-else style="min-width: 260px" title="目录">
      <template slot="operation">
        <a-button v-if="visual" icon="caret-up"  size="small" :border="false" @click="visual=!visual"></a-button>
        <a-button v-else icon="caret-down" size="small" :border="false" @click="visual=!visual"></a-button>
      </template>

         <transition name="slide-fade">

           <a-anchor v-show="visual" :affix="false" :targetOffset="60">
            <template v-for="(item,index) in tags">
              <a-anchor-link :style="{marginLeft:(item.offset-1)*5+'px'}" v-if="item.a_id" :href="'#'+item.a_id"
                             :title="item.innerText"/>
            </template>
           </a-anchor>
         </transition>



    </blog-section>

  </span>
</template>

<script>

import BlogSection from "@/views/components/BlogSection";

export default {
  components: {
    BlogSection
  },
  data() {
    return {
      tags: [],
      //是否展示目录
      visual: true,
    };
  },
  methods: {},
  mounted() {

    // 根据标签进行等级排名，  然后全部列出来， 根据 offset  进行缩进 这样就形成了一个目录

    this.$nextTick(() => {
      setTimeout(() => {

        let tags = document.querySelector('.v-show-content').querySelectorAll('h1,h2,h3,h4,h5,h6')
        if (tags.length !== 0) {
          tags[0].offset = 1;
          tags[0].a_id = tags[0].querySelector('a')?.id;
          for (let i = 1; i < tags.length; i++) {
            let preOffset = tags[i - 1].localName.replace('h', '')
            let offset = tags[i].localName.replace('h', '')
            if (preOffset > offset) {
              tags[i].offset = 1;  //偏移量
            } else {
              tags[i].offset = 4;
            }
            tags[i].a_id = tags[i].querySelector('a').id;
          }
          this.tags = tags
        }

      }, 100)
    })

  },
};
</script>

<style scoped>

</style>