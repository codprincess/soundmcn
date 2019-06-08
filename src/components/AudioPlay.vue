<template>
    <div>
        <div class="di main-wrap" v-loading="audio.waiting">
                <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
                <audio ref="audio" class="dn" 
                    :src="url" :preload="audio.preload"
                    @play="onPlay" 
                    @error="onError"
                    @waiting="onWaiting"
                    @pause="onPause" 
                    @timeupdate="onTimeupdate" 
                    @loadedmetadata="onLoadedmetadata">
                </audio>
                <div class="my-style">
                    <el-button style="margin-top:-10px;" type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
                    <!-- <el-button v-show="!controlList.noSpeed" type="text" @click="changeSpeed">{{audio.speed | transSpeed}}</el-button> -->
                    <!-- <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag> -->
                    <div class="audiolist"><p style="margin-top:20px;color:#666666">iphone XS/XS Max首发测评，更强大，请看好...</p></div>
                    <el-slider v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="sliderpaly"></el-slider>
                    <el-tag class="audio-time" type="info">{{ audio.currentTime | formatSecond}}</el-tag>/<el-tag class="audio-time" type="info">{{ audio.maxTime | formatSecond }}</el-tag>
                    <el-button v-show="!controlList.noMuted" type="text" @click="startMutedOrNot">{{audio.muted | transMutedOrNot}}</el-button>
                    <el-slider v-show="!controlList.noVolume" v-model="volume" :format-tooltip="formatVolumeToolTip" @change="changeVolume" class="slider2"></el-slider>
                    <a :href="url" v-show="!controlList.noDownload" target="_blank" class="download" download>下载</a>
                </div>
        </div>
    </div>
</template>

<script>
  function realFormatSecond(second) {
    var secondType = typeof second

    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60

      return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }

  export default {
    props: {
      theUrl: {
        type: String,
        required: true,
      },
      theSpeeds: {
        type: Array,
        default () {
          return [1, 1.5, 2]
        }
      },
      theControlList: {
        type: String,
        default: ''
      }
    },
    name: 'AudioPlay',
    data() {
      return {
        url: this.theUrl || 'http://url.amp3a.com/kuwo.php/23665176.mp3',
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: true,
          preload: 'auto'
        },

        sliderTime: 0,
        volume: 100,
        speeds: this.theSpeeds,

        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false
        }
      }
    },
    methods: {
      setControlList () {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if(this.controlList[item] !== undefined){
            this.controlList[item] = true
          }
        })
      },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError () {
        this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting (res) {
        console.log(res)
      },
      // 当音频开始播放
      onPlay (res) {
        console.log(res)
        this.audio.playing = true
        this.audio.loading = false

        if(!this.controlList.onlyOnePlaying){
          return 
        }

        let target = res.target

        let audios = document.getElementsByTagName('audio');

        [...audios].forEach((item) => {
          if(item !== target){
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      }
    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      transMutedOrNot(value) {
        return value ? '放音' : '静音'
      },
      transSpeed(value) {
        return '快进: x' + value
      }
    },
    created() {
      this.setControlList()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .main-wrap{
    padding: 10px 15px;
  }
  .sliderpaly {
    display: inline-block;
    width: 350px;
    position: relative;
    top: 14px;
    margin-left: 15px;
  }
  .slider2 {
    display: inline-block;
    width: 100px;
    position: relative;
    top: 14px;
    margin-left: 15px;
  }
.audio-time{
    top: 14px;
}

  .di {
    display: inline-block;
  }

  .download {
    color: #18C26A;
    margin-left: 15px;
  }

  .dn{
    display: none;
  }
  .audiolist{
      float: left;
  }
 .my-style .el-tag--info {
    /*background-color: rgba(144,147,153,.1);*/
    background-color:#fff !important;
    border-color: none !important;
    border:none !important;
}
.my-style .sliderpaly .el-slider__runway .el-slider__bar {
    height: 2px !important;
    background-color: #18C26A;
    border-top-left-radius: 1px !important;
    border-bottom-left-radius: 1px !important;
    position: absolute;
}
.my-style .sliderpaly .el-slider__runway {
    width: 100%;
    height: 2px !important;
    margin: 16px 0 !important;
    background-color: #e4e7ed !important;
    border-radius: 1px !important;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
}

.my-style .sliderpaly .el-slider__button {
    width: 4px !important;
    height:4px !important;
    /* border: 2px solid #409EFF; */
    background-color: #18C26A !important;
    border-radius: 50% ;
    -webkit-transition: .2s;
    transition: .2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.my-style .slider2 .el-slider__runway .el-slider__bar {
    height: 2px !important;
    background-color: #18C26A;
    border-top-left-radius: 1px !important;
    border-bottom-left-radius: 1px !important;
    position: absolute;
}
.my-style .slider2 .el-slider__runway {
    width: 100%;
    height: 2px !important;
    margin: 16px 0 !important;
    background-color: #e4e7ed !important;
    border-radius: 1px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
}

.my-style .slider2 .el-slider__button {
    width: 4px !important;
    height:4px !important;
    /* border: 2px solid #409EFF; */
    background-color: #18C26A !important;
    border-radius: 50%;
    -webkit-transition: .2s;
    transition: .2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.my-style .el-slider__button-wrapper {
    height: 30px;
    width: 30px;
    position: absolute;
    z-index: 1001;
    top: -14px !important;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: transparent;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: normal;
}
.my-style{

}
</style>
