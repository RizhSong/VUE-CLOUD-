<template>
  <div class="mv_video-container">
    <div class="top_play" @click="palyFlag=!palyFlag">
      <transition name="top_box_show">
        <div class="top_box" v-show="palyFlag">
          <van-icon name="arrow-left" class="left_icon" @click.stop="$router.go(-1)" />
          <div class="top_title">{{ mvName }}</div>
          <div :class="['clearly_list',{'bgc':clearlyShowFlag}]">
            <span
              class="clearly_select"
              @click.stop="clearlyShowFlag=!clearlyShowFlag"
            >{{ selectP }}P</span>
            <div class="ul_box">
              <transition name="clearly_ul_show">
                <ul class="clearly_ul" v-show="clearlyShowFlag" ref="clearly_ul">
                  <li
                    class="clearly_item"
                    @click.stop="changeSelectP(key)"
                    v-for="(item,key,index) in mvScr"
                    :key="index"
                  >{{key}}P</li>
                  <!-- <li class="clearly_item">720P</li>
                  <li class="clearly_item">1080P</li>-->
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </transition>
      <video
        :src="mvScr&&mvScr[selectP]"
        class="mv_video"
        ref="video"
        @timeupdate="timeUpdate"
        @ended="videoEnd"
        @canplay="canPlay"
        autoplay
      ></video>
      <transition name="footer_box_show">
        <div class="footer_box" v-show="palyFlag">
          <div class="progress_box">
            <span class>{{currentTime | timeFormat }}</span>
            <div
              class="progress_outer"
              ref="progress"
              @touchstart.prevent="progressTouchStart"
              @touchmove.prevent="progressTouchMove"
              @touchend.prevent="progressTouchEnd"
            >
              <div class="progress">
                <div class="progress_bar" ref="progressBar" :style="{width:barWidth}">
                  <div class="circle" ref="progressBtn"></div>
                </div>
              </div>
            </div>
            <span>{{ duration | durationFormat}}</span>
          </div>
        </div>
      </transition>
      <div class="loading_box" v-show="canplayFlag">
        <van-loading color="#fff" />
      </div>
      <van-icon v-show="!playing&&palyFlag" name="pause" class="play" @click.stop="playClick" />
      <van-icon v-show="playing&&palyFlag" name="play" class="play" @click.stop="playClick" />
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      palyFlag: false,
      songFlag: false, //节流阀解决鼠标控制进度条时 进度条还会随歌曲进度改变的问题
      barWidth: 0, //进度条的进度长
      touch: {}, //用来控制拖动进度条时间的对象
      currentTime: 0,
      changeTime: 0, //切换清晰度使用的
      playing: false, //播发暂停
      //-------------
      clearlyShowFlag: false,
      selectP: "720",
      canplayFlag: true,
      changeFlag: true
    };
  },
  methods: {
    //控制进度条
    progressTouchStart(e) {
      this.songFlag = true; //手指按下时 进度条停止跳动
      // 点击进度条改变时间和进度
      let width =
        ((e.touches[0].pageX - this.$refs.progress.offsetLeft) /
          this.$refs.progress.offsetWidth) *
        100;
      width = width >= 100 ? 100 : width;
      width = width <= 0 ? 0 : width;
      this.barWidth = width + "%";
      this.currentTime = this.$refs.video.duration * (width / 100);
    },
    progressTouchMove(e) {
      // 移动进度条改变时间和进度
      let width =
        ((e.touches[0].pageX - this.$refs.progress.offsetLeft) /
          this.$refs.progress.offsetWidth) *
        100;
      width = width >= 100 ? 100 : width;
      width = width <= 0 ? 0 : width;
      this.barWidth = width + "%";
      this.currentTime = this.$refs.video.duration * (width / 100);
    },
    progressTouchEnd() {
      //手指松开时 开始播放
      this.$refs.video.currentTime = this.currentTime;
      this.songFlag = false;
      this.$refs.video.play(); // 音频播放
      this.playing = false;
      this.canplayFlag = true;
    },
    //音频播放时间和进度条跟新
    timeUpdate(e) {
      // 进度条岁歌曲进度显示
      // 利用节流阀解决鼠标控制进度条时 进度条还会随歌曲进度改变的问题
      if (this.songFlag == false) {
        this.currentTime = e.target.currentTime;
        let width = Math.floor(
          (e.target.currentTime / e.target.duration) * 100
        );
        this.barWidth = width + "%";
      }
    },
    videoEnd() {},
    //播放和暂停的控制
    playClick() {
      if (this.playing == true) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
      this.playing = !this.playing;
    },
    canPlay() {
      this.canplayFlag = false;
      this.playing = false;
      if (this.changeFlag === false) {
        this.$refs.video.currentTime = this.changeTime;
        this.changeFlag = true;
      }
    },
    //---------------------------------
    //切换清晰度
    changeSelectP(val) {
      this.clearlyShowFlag = false;
      if (this.selectP === val) {
        return;
      }
      this.changeFlag = false;
      this.canplayFlag = true;
      this.selectP = val;
      this.changeTime = this.$refs.video.currentTime;
      this.currentTime = this.$refs.video.currentTime;
    },
  },
  filters: {
    durationFormat: function(el) {
      return moment(el).format("mm:ss");
    },
    timeFormat: function(time) {
      let m = Math.floor(time / 60);
      let s = Math.floor(time % 60);
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    }
  },
  props: {
    mvName: String,
    mvScr: Object,
    duration: Number
  }
};
</script>

<style lang="scss" scoped>
.mv_video-container {
  height: 30%;
  .top_play {
    position: relative;
    overflow: hidden;
    height: 100%;
    background-color: rgb(0, 0, 0);
    .top_box_show-enter,
    .top_box_show-leave-to {
      transform: translateY(-100%);
      opacity: 0;
    }
    .footer_box_show-enter,
    .footer_box_show-leave-to {
      transform: translateY(100%);
      opacity: 0;
    }
    .top_box_show-enter-active,
    .top_box_show-leave-active,
    .footer_box_show-enter-active,
    .footer_box_show-leave-active {
      transition: all 0.3s ease;
    }
    .top_box {
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      height: 22%;
      width: 100%;
      display: flex;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
      .left_icon {
        height: 100%;
        width: 10%;
        display: flex;
        align-items: center;
        font-size: 24px;
      }
      .top_title {
        flex: 1;
        height: 100%;
        max-width: 70%;
        display: flex;
        align-items: center;
        font-size: 14px;
      }
      .bgc {
        background-color: rgba(0, 0, 0, 0.5);
      }
      .clearly_list {
        overflow: hidden;
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0 10px;
        text-align: center;
        border-radius: 0 0 5px 5px;
        .clearly_select {
          display: block;
          padding: 0 5px;
          border: 1px solid #fff;
          line-height: 18px;
          border-radius: 8px;
          font-size: 14px;
        }
        .ul_box {
          overflow: hidden;
        }
        .clearly_ul {
          // display: none;
          transition: height 0.5s;
          overflow: hidden;
          .clearly_item {
            margin-top: 12px;
            font-size: 14px;
            &:nth-last-child(1) {
              margin-bottom: 8px;
            }
          }
        }
        .clearly_ul_show-enter,
        .clearly_ul_show-leave-to {
          transform: translateY(-100%);
          opacity: 0;
        }
        .clearly_ul_show-enter-active,
        .clearly_ul_show-leave-active {
          transition: all 0.3s ease;
        }
      }
    }
    .footer_box {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 5;
      height: 22%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      .progress_box {
        box-sizing: border-box;
        position: absolute;
        bottom: 28%;
        width: 100%;
        // height: 100%;
        padding: 0.3125rem;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 0.5rem;
          color: #fff;
        }
        .progress_outer {
          width: 75%;
          height: 8px;
        }
        .progress {
          position: relative;
          margin-top: 3px;
          height: 3px;
          line-height: 0.1rem;
          width: 100%;
          background-color: rgba(100, 100, 100, 0.5);
          .progress_bar {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 0%;
            height: 125%;
            background-color: #fff;
            border-radius: 10px;
            .circle {
              position: absolute;
              top: 50%;
              transform: translate(50%, -50%);
              right: 0;
              height: 8px;
              width: 8px;
              background-color: #fff;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .mv_video {
      position: absolute;
      width: 100%;
    }
    .play {
      font-size: 50px;
      color: rgba(255, 255, 255, 0.7);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .loading_box {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20%;
      height: 30px;
      width: 50px;
      text-align: center;
    }
  }
}
</style>