<template>
  <div>
    <a-row style="display: flex;flex-wrap: wrap; align-items:center">
      <a-col>
        <user-profile :user-info="userInfo"></user-profile>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import UserData from "@/views/user/components/UserData";
import UserProfile from "@/views/user/components/UserProfile";

export default {
  name: "BlogUser",
  components: {
    UserData,UserProfile
  },
  props: {
    blogInfo: Object
  },
  data() {
    return {
      userInfo: this.blogInfo.author_info
    }
  }
}
</script>

<style scoped>

</style>