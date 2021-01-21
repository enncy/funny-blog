<template>
  <div>
    <a-row style="display: flex;flex-wrap: wrap;justify-content: start; align-items:center">
      <a-col style="cursor: pointer;  " @click="$router.push('/'+userInfo.name)">

        <span class="adapt-item-big-show">
          <user-avatar :user-info="userInfo"></user-avatar>
          <a-divider/>
          <user-profile :show-data="true" :show-profile="true" :user-info="userInfo"></user-profile>
        </span>

      </a-col>

    </a-row>
  </div>
</template>

<script>
import UserData from "@/views/user/components/UserData";
import UserAvatar from "@/views/user/components/UserAvatar";
import UserProfile from "@/views/user/components/UserProfile";

export default {
  name: "BlogUser",
  components: {
    UserData, UserProfile, UserAvatar
  },
  props: {
    blogInfo: Object
  },
  data() {
    return {
      userInfo: this.blogInfo.author_info,

    }
  }
}
</script>

<style scoped>

</style>