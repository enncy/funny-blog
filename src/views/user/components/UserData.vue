<template>
  <a-row class="statistic-group  adapt-item-justify  d-flex-wrap"   >

    <template v-for="(item,index) in statistics">
      <a-col >
        <a-statistic class="data-statistic"   :valueStyle="font" :title="item.title"
                     :value="item.data" >
          <template #suffix>
            <a-icon :type="item.icon" class="data-icon"  :theme="theme"  />
          </template>
        </a-statistic>
      </a-col>
    </template>

  </a-row>
</template>

<script>
export default {

  props:{
    data:Object,//总数据
    fav_num:Number,//收藏数
    blog_num:Number,//文章数
    fans_num:Number,//粉丝量
    like_num:Number, //点赞量
    read_num:Number,//阅读量
    comments_num:Number,  //评论数量
    size:String,
    theme:String ,

  },

  data(){


    return{

      statistics:[
        {title:"文章数",icon:'book',data:this.data?.fav_num ||this.fav_num},
        {title:"总访问",icon:'eye',data:this.data?.blog_num ||this.blog_num},
        {title:"收藏",icon:'star',data:this.data?.fans_num ||this.fans_num},
        {title:"获赞",icon:'like',data:this.data?.like_num ||this.like_num},
        {title:"评论",icon:'message',data:this.data?.read_num ||this.read_num},
        {title:"粉丝",icon:'heart',data:this.data?.comments_num ||this.comments_num},
      ],

      font:{'font-size':this.size==='small'?'13px':'16px'},
    }
  },

}
</script>

<style>
.statistic-group .ant-statistic-title{
  margin-bottom: 0px;
  color: rgba(0,0,0,.45);
  font-size: 14px;
}
</style>

<style scoped>
.data-statistic{
  margin-bottom: 4px;
  min-width: 50px;
  margin-right: 20px;
}

.data-icon{
  font-size: 12px;
}
</style>