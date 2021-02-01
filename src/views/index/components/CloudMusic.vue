<template>
  <!--网易云音乐-->
  <div class="div-card" v-if="music.comments">
    <a-row>
      <!--热评用户头像-->
      <a-avatar icon="user" :src="music.avatarurl"/>
      {{ music.nickname }}:
      <!--热评-->
      <span   style="font-size: 12px;color: gray">
        <template v-if="show_all">{{ music.comments}}</template>
        <template v-else>{{ music.comments.length>100?music.comments.substring(0,100):music.comments }}</template>

        <a-button v-if="music.comments.length>100 && !show_all" size="small" type="link" @click="showAll">...</a-button>
      </span>
    </a-row>

    <a-row style="margin-top: 10px">
      <a-col style="font-size: 12px;color: gray">
        <a-row class="d-flex-nowrap-ali-center">
          <a-col :span="7">
            <!--音乐封面-->
            <a-avatar shape="square" :size="54" icon="cloud" :src="music.music_pic"/>
          </a-col>
          <!--音乐名-->
          <a-col :span="17">
            <a-col    style="font-weight: bold"><span>{{ music.name }}</span></a-col>
            <a-col ><span >——{{ music.artists_name }}</span></a-col>
          </a-col>
        </a-row>

      </a-col>
      <a-col style="margin-top: 10px">
        <!--音频资源-->
        <audio id="cloud-music"  ref="music" :src="music.music_url" @durationchange="durationchange" @timeupdate="timeupdate"></audio>
        <!--下面是自定义的控制按钮-->
        <div  style="box-shadow: 1px 1px 4px lightgray;border-radius: 4px; ">
          <a-row class="d-flex-wrap-ali-center">
            <a-col :span="4" style="margin-top: 4px">
              <!--播放暂停按钮-->
              <a-button v-if="!play" type="link" icon="play-circle" size="large" @click="play=!play"></a-button>
              <template v-else>
                <!--如果播放完毕-->
                <a-button v-if="parseInt(currentTime)===parseInt(duration)" type="link" icon="redo"
                          size="large" @click="redo"></a-button>
                <!--播放中-->
                <a-button v-else type="link" icon="pause-circle" size="large" @click="play=!play"></a-button>
              </template>

            </a-col>
            <a-col :span="15">
              <!--进度条-->
              <a-slider :default-value="0" @change="audioValueChange($event)" v-model="currentTime" :min="0"
                        :max="duration"/>
            </a-col>
            <a-col>
              <span>{{ minutes < 10 ? '0' + minutes : minutes }}:{{ second < 10 ? '0' + second : second }}</span>
            </a-col>
          </a-row>

        </div>
      </a-col>
    </a-row>
  </div>
  <div v-else>
    <a-skeleton/>
  </div>
</template>

<script>
import api from "@/api";

export default {
  props: {
    indexEmitter: Object,
  },
  data() {
    return {
      //是否播放
      play: false,
      //当前音频时间
      currentTime: 0,
      //音频总时长
      duration: 0,
      //秒
      second: 0,
      //分
      minutes: 0,
      //是否显示全部文案
      show_all:false,
      //网抑云
      music: {
        name: '',
        artists_name: '',
        music_url: '',
        music_pic: '',
        avatarurl: '',
        nickname: '',
        comments: '',
      },
    }
  },
  watch: {
    //监听播放
    play(value) {

      this.$nextTick(() => {
        let music = this.$refs.music
        if(music.networkState===3)this.$message.error("找不到音频文件:"+this.music.music_url)
        else{
          // console.log(music)
          if (value) {
            this.$refs.music.play();
          } else {
            this.$refs.music.pause();
          }
        }

      })
    }
  },
  created() {
    //加载网抑云热评和歌曲
    this.getComments()
    //加载网抑云热评和歌曲
    this.indexEmitter.on('changeMusic', () => {
      // console.log("changeMusic")
      this.play = false
      this.getComments()


    })

  },
  methods: {
    //重放
    redo(){
      this.currentTime = 0;
      this.play = true

    },
    //进度条发生改变
    audioValueChange(e) {
      // console.log("audioValueChange",e)
      this.$refs.music.currentTime = e
    },
    //总时长发生变化
    durationchange(e){
      // console.log("durationchange",e.target)
      this.duration = e.target.duration
    },
    //时间发生变化
    timeupdate(e){
      // console.log("timeupdate",e)
      let currentTime = e.target.currentTime
      this.currentTime = currentTime
      this.minutes = new Date(currentTime * 1000).getMinutes();
      this.second = new Date(currentTime * 1000).getSeconds();
    },
    //展示文案
    showAll(e){
      e.target.style.display = 'none';
      this.show_all=true
    },
    //获取热评
    getComments() {

      api.getCloudMusicHotComments().then((r) => {
        // console.log(r.data)
        if(r.data.data.comments===null)this.$message.warn("操作频繁，请稍后再试")
        else{
          this.music = r.data.data;
          this.$nextTick(()=>{
            this.$refs?.music?.load()
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>