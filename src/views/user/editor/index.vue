<template>
  <a-card class="user-editor-container">

    <!--发布文章的标题-->
    <a-input-group compact class="title" >

      <a-input addon-before="文章标题" v-model="title">

        <a-tooltip slot="suffix" title="标题字数">
          <span style="background-color: white"  :class="title.length>title_max_len?'error-color':''" >{{ title.length }}/{{ title_max_len }}</span>
        </a-tooltip>

      </a-input>
      <a-button type="primary" @click="confirm">
        发布
      </a-button>
    </a-input-group>

    <!--编辑器-->
    <mavon-editor  class="markdown" :boxShadow="false" v-model="body"></mavon-editor>



    <!--发布的弹窗-->
    <a-modal  class="modal"  v-model="modalVisible" cancelText="取消" okText="发布"
             title="发布文章"  @ok="()=>{
               if(blogInfo)modify()
               else publishBlog()
             }">
      <a-descriptions :column="1">
        <a-descriptions-item label="标题">
          {{ title }}
        </a-descriptions-item>
        <a-descriptions-item label="标签">
          <edit-blog-tags @tagsChange="tagsChange" :blog-tags="tags"></edit-blog-tags>
        </a-descriptions-item>
        <a-descriptions-item label="公开">
          <a-switch checked-children="所有人可见" un-checked-children="仅自己可见" default-checked v-model="publish"/>
        </a-descriptions-item>

      </a-descriptions>


      <a-row class="d-flex-nowrap" style="width: 100%;">
        <a-col :span="2"  class="blog-type-text">
          类型 :
        </a-col>
        <a-col :span="4">
          <a-switch checked-children="原创" un-checked-children="搬运" default-checked v-model="original"/>
        </a-col>
        <a-col :span="18">
          <a-input placeholder="搬运文章的原地址" v-if="!original"></a-input>
        </a-col>
      </a-row>

      <a-row>
        <a-divider/>
         将此文章加入以下分类(最多3个)：
        <a-row>
          <edit-blog-select @categoryChange="categoryChange" :category="category"></edit-blog-select>
        </a-row>
      </a-row>

    </a-modal>
  </a-card>
</template>

<script>
import blogApi from "@/api/blog";
import EditBlogTags from "@/views/user/editor/components/EditBlogTags";
import EditBlogSelect from "@/views/user/editor/components/EditBlogSelect";


export default {
  name:"editor",
  components: {
    EditBlogTags,EditBlogSelect
  },

  beforeCreate() {
    if (!this.$store.state.userInfo) {
      this.$message.error("您还未登录！")
      // this.$router.push('/login')
    }
  },

  data() {
    return {
      title: '',
      body: '',

      userInfo: this.$store.state.userInfo,
      blogInfo: undefined,
      //确认弹窗的显示
      modalVisible: false,
      //文章标签
      tags: [],
      //文章分类
      category: [],
      //是否公开
      publish: true,
      //是否原创
      original: true,
      //搬运地址
      original_url: '',
      //标题字数
      title_max_len: 100,
    }
  },

  mounted() {
    console.log(this.$route.params)
    //获取路由数据，如果路由无数据，则为新建文章，否则为修改文章
    if (this.$route.params.blogInfo) {
      this.blogInfo = this.$route.params.blogInfo
      this.setData(this.blogInfo)
    }

  },

  methods: {

    //修改文章
    modify() {
      if (this.validate()) {
        let data = Object.assign({uid:this.blogInfo.uid },this.getData())
        blogApi.update(data).then((r) => {
          if (r.data.status) {
            this.$message.success(r.data.msg)
            setTimeout(() => {
              this.$router.push('/user')
            }, 1000)
          } else {
            this.$message.error(r.data.msg)
          }
        }).catch((err) => {
          console.error(err)
        })
      }

    },

    //验证信息
    validate() {
      if (this.$store.state.userInfo === undefined) {
        this.$message.error("请登录！再发布文章！")
        return false
      } else if (this.title === '') {
        this.$message.warn("请填写你的文章标题！")
        return false
      } else if (this.body === '') {
        this.$message.warn("请填写你的内容！")
        return false
      } else if (this.title.length > this.title_max_len) {
        this.$message.warn(`标题少于${this.title_max_len}字！`)

      } else return true
    },

    //弹出确认框，设置基础信息，后发布
    confirm() {
      if (this.validate()) {
        this.modalVisible = true
      }
    },

    //发布文章
    publishBlog() {
      if (this.validate()) {
        let data = Object.assign({author:this.userInfo.name },this.getData())
        blogApi.create(data).then((r) => {
          if (r.data.status) {
            this.$message.success(r.data.msg)
            this.modalVisible = false
            setTimeout(() => {
              this.$router.push('/user')
            }, 1000)
          } else {
            this.$message.error(r.data.msg)
          }
        }).catch((err) => {
          console.error(err)
        })
      }

    },
    //标签修改
    tagsChange(tags) {
      console.log("tagsChange", tags)
      this.tags = tags
    },
    categoryChange(category){
      console.log("categoryChange",category)
      this.category = category
    },

    //获取文章数据
    getData() {
      return {
        title: this.title,
        body: this.body,
        publish: this.publish,
        tags: this.tags,
        category: this.category,
        original: this.original,
        original_url: this.original_url
      }
    },
    //设置文章数据
    setData(blogInfo) {

      this.title = blogInfo.title
      this.body = blogInfo.body
      this.publish = blogInfo.publish
      this.tags = blogInfo.tags
      this.original = blogInfo.original
      this.original_url = blogInfo.original_url
      this.category = blogInfo.category

    }

  }
}
</script>

<style scoped>
@import "./assets/index.css";

</style>