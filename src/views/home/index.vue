<template>
  <div :style="{backgroundImage,minHeight}" class="background-image">
    <a-affix>
      <logo :color="'white'" class="text-shadow-dark home-logo"></logo>
    </a-affix>
    <template v-if="sending">
      <a-card>
        <a-skeleton></a-skeleton>
      </a-card>

    </template>

    <template v-else>
      <!--背景图，以及名字-->
      <!---->
      <a-row
          style="  align-content:center;align-items: center;display: flex;justify-content: center;flex-wrap: nowrap;padding:50px 0px 20px 0px;text-align: center">

        <a-col>
          <a-row>
            <a-col>
              <user-avatar style="color: white" size="large" :user-info="userInfo"
                           :text-style="{textShadow:'1px 1px 6px rgba(0,0,0,0.5)',color:'white'}"></user-avatar>
            </a-col>
          </a-row>
        </a-col>


      </a-row>

      <a-row>
        <a-col :span="14" :offset="5" class="adapt-item-width card-container ">
          <a-tabs type="card" default-active-key="0" @change="callback">
            <a-tab-pane key="0" tab="他的文章">
              <home-blogs :user-info="userInfo"></home-blogs>
            </a-tab-pane>

            <a-tab-pane key="1" tab="资料">
              <home-user-profile :user-info="userInfo"></home-user-profile>
            </a-tab-pane>

            <a-tab-pane key="2" tab="收藏">
              <blog-section>
                <a-empty description="暂无收藏"/>
              </blog-section>
            </a-tab-pane>

            <a-tab-pane key="3" tab="关注">
              <blog-section>
                <a-empty description="暂无关注"/>
              </blog-section>
            </a-tab-pane>


            <a-tab-pane key="4" tab="分栏">
              <blog-section>
                <a-empty description="暂无分栏"/>
              </blog-section>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </template>
  </div>

</template>

<script>

import HomeBlogs from "@/views/home/components/HomeBlogs";
import UserAvatar from "@/views/user/components/UserAvatar";
import UserData from "@/views/user/components/UserData";
import BlogSection from "@/views/components/BlogSection";
import UserProfile from "@/views/user/components/UserProfile";
import UserSimpleData from "@/views/user/components/UserSimpleData";
import HomeUserProfile from "@/views/home/components/HomeUserProfile";
import Logo from "@/views/components/Logo";
import userApi from '@/api/user'
import utils from '@/utils/index'


export default {
  name: "index",
  components: {
    UserData, UserAvatar, BlogSection, Logo, UserSimpleData, HomeBlogs, UserProfile, HomeUserProfile
  },
  data() {
    return {
      //基本信息
      userInfo: undefined,
      sending: false,
      name: this.$route.params.name,
      utils,
      //背景样式
      backgroundImage: `url('https://cdn.jsdelivr.net/gh/klskeleton/cdn/src/img/bg3.png')`,
      minHeight: '300px',
    }
  },
  methods: {
    //获取个人信息
    getInfo() {
      userApi.getUserByNmae(this.name).then((r) => {
        if (r.data.status) {
          this.userInfo = r.data.data
          console.log(this.userInfo)
          //设置标题
          this.setMetaInfo()
        } else {
          this.$message.error(r.data.msg)
          this.$router.push('/error')
        }
        this.sending = false
      }).catch((err) => {
        console.error(err)
      })
    },
    callback(key) {
      console.log(key);
    },
    setMetaInfo() {
      this.$route.meta.title = this.userInfo.name + '的博客-趣博客'
      this.$route.meta.keywords = this.userInfo.name + '的博客,趣博客'
      this.$route.meta.description = this.userInfo.name + '的博客,' + (this.userInfo?.profile === '' ? '此人很懒，什么都没有留下 ~' : this.userInfo?.profile)
      utils.setMeta(this.$route)
    }
  },
  mounted() {
    this.sending = true
    this.getInfo()

    //自适应图片

    utils.listenResize(window, platform => {
      console.log("platform", platform)
      if (platform === 'mobile') {
        this.minHeight = '100vh'
      }
    })


  }
}
</script>

<style scoped>

.background-image {
  width: 100%;

  position: relative;
  /*box-shadow: inset 0 -100px 100px -100px #f9f9f9;*/
  background-repeat: no-repeat;

  background-size: 100% 100%;
  background-attachment: fixed;
}

.home-logo {
  position: absolute;
  z-index: 999;
  color: white;
  font-size: 25px;
  top: 10px;
  left: 20px
}
</style>

<style>
.card-container {
  overflow: hidden;
  padding: 24px;

}


.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-bottom: 0px;
}

.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: 30px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-prev-icon {
  color: white;
  font-weight: bold;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-next-icon {
  color: white;
  font-weight: bold;
}


.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-radius: 4px;
  color: white;
  border-color: transparent;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-nav .ant-tabs-tab-active {
  color: #1890ff;
  text-shadow: 1px 1px 6px white;
  border-color: #fff;
  background: #fff;
}
</style>