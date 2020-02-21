<template>
  <div class="player">
    <!-- 播放界面 -->
    <transition name="full">
      <div class="normal" v-show="fullScreen">
        <div
          class="b-color"
          :style="{backgroundImage:`url(${songs&&songs.al.picUrl})`, backgroundSize:`100% 100%`}"
        ></div>
        <div class="b-mask"></div>
        <!-- 头部 -->
        <div class="head">
          <span class="back icon-fanhui" @click="layoutFull"></span>
          <div class="title">
            <h3 v-text="songs&&songs.name"></h3>
            <p v-text="songs&&songs.ar[0].name"></p>
          </div>
          <span class="share icon-fenxiang"></span>
        </div>
        <!-- 歌词封面部分 -->
        <div class="songBox" @click="showLyric">
          <!-- 封面 -->
          <div class="coverbox" v-show="isShowLyric">
            <div class="box">
              <div
                :class="['picUrl',isplay?'active': '']"
                :style="{backgroundImage:`url(${songs&&songs.al.picUrl})`,backgroundSize:`105% 105%`,backgroundPosition:`center center`}"
              >
                <div :class="['play1',isplay?'active': 'noactive']">
                  <span class="c1"></span>
                </div>
                <div :class="['play2',isplay?'active': 'noactive']">
                  <span class="c2"></span>
                </div>
                <div :class="['play3',isplay?'active': 'noactive']">
                  <span class="c3"></span>
                </div>
                <div :class="['play4',isplay?'active': 'noactive']">
                  <span class="c4"></span>
                </div>
              </div>
            </div>
            <div class="select">
              <span :class="['fav','icon-aixin']" :style="{color:isFav}" @click.stop="_addFavSong"></span>
              <span class="down icon-xiazai3" @click.stop="showDownBox">
                <transition name="down">
                  <span class="source" v-if="showSource">歌曲暂时无法下载</span>
                </transition>
              </span>
              <span class="comment icon-pinglun2" @click="toComment">
                <span class="cnum">{{cnum>9999?'1w+':cnum>999?'999+':cnum}}</span>
              </span>
            </div>
          </div>
          <!-- 歌词 -->
          <div class="lyricbox" v-show="!isShowLyric">
            <div class="volbox">
              <div class="icon icon-yinliang1"></div>
              <div class="barbox">
                <div class="bar-in" @click.stop="changeVolum" ref="volumWrap">
                  <div class="bar" ref="vbar" :style="{width: `${volume * 100}%`}"></div>
                  <span
                    class="dot"
                    ref="vdot"
                    :style="{left: `${volume * 100}%`}"
                    @touchstart.prevent="volTouchStart"
                    @touchmove.prevent="volTouchMove"
                    @touchend.prevent="volTouchEnd"
                  ></span>
                </div>
              </div>
            </div>
            <div class="lyric" ref="lyricBox">
              <p
                v-for="(item,index) in lyric"
                :key="index"
                :class="{active: lyricIndex === index}"
                v-text="item.lyric"
              ></p>
            </div>
            <div class="mask"></div>
          </div>
        </div>
        <!-- 尾部 -->
        <div class="foot">
          <div class="progress">
            <span class="cur">{{format(currentTime)}}</span>
            <div class="barbox">
              <div class="bar-in" @click.stop="playScale" ref="barWrap">
                <div class="bar" :style="{width: `${percent * 100}%`}"></div>
                <div
                  class="dot"
                  ref="proDot"
                  :style="{left: `${percent * 100}%`}"
                  @touchstart.prevent="progressTouchStart"
                  @touchmove.prevent="progressTouchMove"
                  @touchend.prevent="progressTouchEnd"
                ></div>
              </div>
            </div>
            <span class="total">{{format(duration)}}</span>
          </div>
          <div class="control">
            <span :class="['mode',iconMode]" @click.stop="changeMode"></span>
            <div class="playbox">
              <span class="pre icon-shangyiqu" @click.stop="pre"></span>
              <span
                :class="['play', isplay ? 'icon-zanting2' : 'icon-bofang1']"
                @click="togglePlaying"
              ></span>
              <span class="next icon-xiayiqu1" @click.stop="next"></span>
            </div>
            <span class="list icon-bofangliebiao1" @click.stop="showPlayList"></span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 播放小控件 -->
    <transition name="mini">
      <div class="mini" v-show="!fullScreen" @click="showfullScreen">
        <div class="picUrl">
          <div :class="['pic-in',isplay?'active':'']">
            <img v-lazy="songs && songs.al.picUrl" />
          </div>
        </div>
        <div class="title">
          <div class="name">
            <h3>{{songs&&songs.name}}</h3>
            <p>{{isplay? minilyric : songs&&songs.ar[0].name}}</p>
          </div>
          <span
            :class="['icon', isplay ? 'icon-zanting2' : 'icon-bofang1']"
            @click.stop="togglePlaying"
          ></span>
        </div>
        <div class="list icon-bofangliebiao" @click.stop="openList"></div>
      </div>
    </transition>
    <!-- 播放列表 -->
    <play-list ref="playlist" :duration="duration" :currentTime="currentTime" @stopSong="stopSong"></play-list>
    <!-- 播放器 -->
    <audio
      ref="audio"
      @canplay="ready"
      @timeupdate="updateTime"
      @ended="end"
      @error="error"
      autoplay
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import playList from "../base/playList.vue";
export default {
  data() {
    return {
      url: "",
      songReady: false,
      currentTime: 0,
      duration: 0,
      percent: 0,
      volume: 1,
      lyric: [], // 歌词
      isShowLyric: true,
      isLike: true,
      hlist: [],
      cnum: 0, //评论
      showSource: false
    };
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "isplay",
      "mode",
      "songId",
      "songs",
      "songIndex",
      "songList",
      "playList",
      "favSong",
      "accountId",
      "historyPlay"
    ]),
    // 歌词滚动
    lyricIndex() {
      if (this.currentTime) {
        for (let i = 0; i < this.lyric.length; i++) {
          if (i == this.lyric.length - 1) {
            return i;
          }
          if (
            this.lyric[i].time <= this.currentTime &&
            this.currentTime <= this.lyric[i + 1].time
          ) {
            if (i > 3 && i < this.lyric.length - 3) {
              this.$refs.lyricBox.scrollTop = (i - 3) * 36;
            }
            return i;
          }
        }
      }
      return 0;
    },
    minilyric() {
      if (this.currentTime) {
        for (let i = 0; i < this.lyric.length; i++) {
          if (i == this.lyric.length - 1) {
            return this.lyric[i].lyric;
          }
          if (
            this.lyric[i].time <= this.currentTime &&
            this.currentTime <= this.lyric[i + 1].time
          ) {
            return this.lyric[i].lyric;
          }
        }
      }
    },
    // 模式图标的切换
    iconMode() {
      if (this.mode == this.playMode.sequence) {
        return "icon-bofangye-caozuolan-xunhuan";
      } else if (this.mode == this.playMode.loop) {
        return "icon-iconfontdanquxunhuan2eps";
      } else {
        return "icon-suiji";
      }
    },
    isFav() {
      if (this.favSong.findIndex(item => item === this.songs.id) != -1) {
        return "#E8023E";
      } else {
        return "#EEE";
      }
    }
  },
  watch: {
    songId(newVal, oldVal) {
      // this.$refs.audio.pause();
      // this.$refs.audio.currentTime = 0;
      this._getSongUrl(newVal);
      this._getComment(newVal);
      this.findCurrentIndex(this.songList);
      this.firstplay(this.songList);
      return newVal;
    },
    songs(newVal, oldVal) {
      this._getSongUrl(newVal.id);
      this._getLyric(newVal.id);
      this._getComment(newVal.id);
      this.hlist.unshift(newVal);
      // console.log(this.hlist)
      this.hlist = this.hlist.reduce((all, item) => {
        if (!all.includes(item)) {
          all.push(item);
        }
        return all;
      }, []);
      this.updateHistory(this.hlist);
      this.updateLateLength(this.hlist.length);
      return newVal;
    },
    url(newVal) {
      // this._getLyric(this.songId);
      this.$refs.audio.src = newVal;
      // 如果定时器不设置这么长时间就获取不到总时间
      let stop = setInterval(() => {
        this.duration = this.$refs.audio.duration;
        if (this.duration) {
          clearInterval(stop);
        }
      }, 150);
      this.updatePlaying(true);
    },
    // 当前时间的变化
    currentTime(newVal) {
      this.percent = newVal / this.duration;
      this.updateCurrentTime(newVal);
    }
  },
  created() {
    this.move = false;
    this.touch = {};
    this.playMode = {
      sequence: 0,
      loop: 1,
      random: 2
    };
  },
  methods: {
    // 获取歌曲的url
    _getSongUrl(id) {
      this.$axios.get("/song/url?id=" + id).then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          this.url = res.data.data[0].url;
        }
      });
    },
    // 获取歌词
    _getLyric(id) {
      this.$axios.get("/lyric?id=" + id).then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          // 歌词解析
          this.lyric = res.data.lrc.lyric.split("\n").reduce((all, item) => {
            const arr = item.split(/\[|\]/g);
            if (arr) {
              // 截取数组的后两个元素
              const [time, lyric] = arr.slice(1, 3);
              if (lyric) {
                all.push({
                  time:
                    parseFloat(time.split(":")[0] * 60) +
                    parseFloat(time.split(":")[1]),
                  lyric
                });
              }
            }
            return all;
          }, []);
          // console.log(this.lyric)
        }
      });
    },
    // 是否喜欢音乐的请求
    _getLikeSong(flag, id) {
      console.log(flag);
      this.$axios
        .get("/like", {
          params: {
            id: id,
            like: flag
          }
        })
        .then(res => {
          if (res.status == 200) {
            this._getFavSong(this.accountId);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 获取我最喜爱的音乐列表数组
    _getFavSong(uid) {
      this.$axios.get("/likelist?uid=" + uid).then(res => {
        if (res.status == 200) {
          this.updateFavSong(res.data.ids);
          // this.$nextTick(() => {
          //   console.log(res.data.ids.length)
          // })
        }
      });
    },
    // 获取歌曲评论的请求
    _getComment(id) {
      this.$axios
        .get("/comment/music", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.cnum = res.data.total;
          }
        });
    },
    showDownBox() {
      this.showSource = true;
      setTimeout(() => {
        this.showSource = false;
      }, 2000);
    },
    // 方法
    _addFavSong() {
      let flag;
      if (this.favSong.findIndex(item => item === this.songs.id) != -1) {
        flag = false;
      } else {
        flag = true;
      }
      this._getLikeSong(flag, this.songs.id);
    },
    // 切换播放暂停
    togglePlaying() {
      const audio = this.$refs.audio;
      this.updatePlaying(!this.isplay);
      this.isplay ? audio.play() : audio.pause();
    },
    // 下一首
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.songIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.updateSongIndex(index);
        if (!this.isplay) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    // 上一首
    pre() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.songIndex - 1;
        if (index == -1) {
          index = this.playList.length - 1;
        }
        this.updateSongIndex(index);
        if (!this.isplay) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    end() {
      if (this.mode == this.playMode.loop) {
        return this.loop();
      }
      this.next();
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    //开始播放的时候把歌曲列表当作播放列表
    firstplay(songList) {
      let list = [];
      list = songList;
      // 更新歌曲列表
      this.updatePlayList(list);
      // console.log(list)
    },
    // 3种模式
    changeMode() {
      let mode = (this.mode + 1) % 3;
      this.updateMode(mode);
      // 设置一个播放列表存放歌曲
      let list = [];
      // 随机播放的列表
      if (mode === this.playMode.random) {
        list = this.shuffle(this.songList);
      } else {
        // 顺序或者单曲循环
        list = this.songList;
      }
      // 调用方法  找到该首歌的索引
      this.findCurrentIndex(list);
      // 更新歌曲列表
      this.updatePlayList(list);
    },
    // 找到歌曲在当前列表中的索引
    findCurrentIndex(list) {
      let index = list.findIndex(item => item.id == this.songId);
      // 更新歌曲的索引到vuex中
      this.updateSongIndex(index);
      // console.log(index)
    },
    // 删除最后一首歌的时候停止音乐
    stopSong() {
      this.$refs.audio.pause();
    },
    // 打开全屏
    showfullScreen() {
      this.updateFullScreen(true);
      this.isShowLyric = true;
    },
    // 退出全屏
    layoutFull() {
      this.updateFullScreen(false);
    },
    // 全屏打开播放列表
    showPlayList() {
      this.$refs.playlist.show();
    },
    // mini控件打开播放列表
    openList() {
      this.$refs.playlist.show();
    },
    // 切换歌词封面
    showLyric() {
      this.isShowLyric = !this.isShowLyric;
    },
    // 点击改变播放的进度
    playScale(e) {
      if (!this.move) {
        // let clickTime
        let currentX = e.offsetX;
        const barWidth = this.$refs.barWrap.offsetWidth;
        this.percent = currentX / barWidth;
        const currentTime = this.duration * this.percent;
        this.currentTime = currentTime;
        this.$refs.audio.currentTime = currentTime;
      }
    },
    progressTouchStart(e) {
      this.move = true;
    },
    progressTouchMove(e) {
      this.touch.clientX = e.touches[0].clientX;
      const barLeft = this.$refs.barWrap.offsetLeft;
      const barWidth = this.$refs.barWrap.offsetWidth;
      this.touch.clientX =
        this.touch.clientX < barLeft ? barLeft : this.touch.clientX;
      this.touch.clientX =
        this.touch.clientX > barLeft + barWidth
          ? barLeft + barWidth
          : this.touch.clientX;
      let dotWidth = this.touch.clientX - barLeft;
      this.percent = dotWidth / barWidth;
      const currentTime = this.duration * this.percent;
      this.currentTime = currentTime;
      this.$refs.audio.currentTime = currentTime;
    },
    progressTouchEnd(e) {
      this.move = false;
    },
    // 改变音量
    changeVolum(e) {
      let currentX = e.offsetX;
      const volumnWidth = this.$refs.volumWrap.offsetWidth;
      let volper = currentX / volumnWidth;
      this.$refs.audio.volume = volper;
      this.volume = volper;
      localStorage.setItem("volume", volper);
    },
    volTouchStart(e) {},
    volTouchMove(e) {
      let clientX = e.touches[0].clientX;
      const barLeft = this.$refs.volumWrap.offsetLeft;
      const barWidth = this.$refs.volumWrap.offsetWidth;
      clientX = clientX < barLeft ? barLeft : clientX;
      clientX = clientX > barLeft + barWidth ? barLeft + barWidth : clientX;
      let dotWidth = clientX - barLeft;
      let volper = dotWidth / barWidth;
      this.volume = volper;
      localStorage.setItem("volume", volper);
    },
    volTouchEnd(e) {},
    // 当以获得歌曲资源时
    ready(e) {
      this.songReady = true;
      e.target.volume = localStorage.getItem("volume");
      this.$refs.vbar.style.width = `${e.target.volume * 100}%`;
      this.$refs.vdot.style.left = `${e.target.volume * 100}%`;
    },
    error() {},
    // 当歌曲正在播放时
    updateTime(e) {
      if (this.move) {
        return;
      }
      this.currentTime = e.target.currentTime;
    },
    // 歌曲格式化时间
    format(interval) {
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = interval % 60;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return minute + ":" + second;
    },
    getRandomInt(min, max) {
      // [min,max]
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 随机播放的算法
    shuffle(arr) {
      let _arr = arr.slice(0);
      for (let i = 0; i < arr.length; i++) {
        let j = this.getRandomInt(0, i);
        let t = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = t;
      }
      // 得到一个新的播放列表
      return _arr;
    },
    toComment() {
      this.$router.push({ name: "comment", params: { id: this.songs.id } });
      this.updateFullScreen(false);
    },
    ...mapMutations([
      "updateFullScreen",
      "updatePlaying",
      "updateMode",
      "updateSongIndex",
      "updatePlayList",
      "updateCurrentTime",
      "updateFavSong",
      "updateHistory",
      "updateLateLength"
    ])
  },
  mounted() {},
  components: {
    playList
  }
};
</script>

<style lang="scss" scoped>
@import "../common/scss/common.scss";
.player {
  .normal {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 101;
    &.full-enter,
    &.full-leave-to {
      transform: translateY(50%) scale(0.1);
      opacity: 0;
    }
    &.full-enter-active,
    &.full-leave-active {
      transition: all 0.4s;
    }
    .b-color {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
      left: 0;
      top: 0;
      transform: scale(1.05);
      background: #343434;
      filter: blur(6px) brightness(1.6);
    }
    .b-mask {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: rgba(0, 0, 0, 0.4);
    }
    .head {
      height: 8%;
      display: flex;
      .back {
        width: 13%;
        text-align: center;
        line-height: 3.2rem;
        font-size: 20px;
        color: #fff;
      }
      .title {
        width: 86%;
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          height: 26px;
          line-height: 26px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          font-size: 12px;
          line-height: 18px;
          color: #eee;
        }
      }
      .share {
        width: 12%;
        text-align: center;
        line-height: 3rem;
        font-size: 22px;
        color: #fff;
      }
    }
    .songBox {
      width: 100%;
      height: 82%;
      .coverbox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .box {
          height: 90%;
          display: flex;
          justify-content: center;
          align-items: center;
          .picUrl {
            position: relative;
            width: 260px;
            height: 260px;
            border: 7px solid rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            background-size: 100% 100%;
            background-position: center center;
            background-clip: content-box;
            box-sizing: border-box;
            animation: circleplay 24s linear infinite running;
            animation-play-state: paused;
            &.active {
              animation-play-state: running;
            }
            .play1,
            .play2,
            .play3,
            .play4 {
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 1px solid rgba(255, 255, 255, 0.8);
              opacity: 0;
              // animation: name duration timing-function delay iteration-count direction fill-mode;
              animation: playmusic 6s ease infinite running;
              animation-play-state: paused;
              &.active {
                animation-play-state: running;
              }
              &.noactive {
                opacity: 0;
              }
              .c1,
              .c2,
              .c3,
              .c4 {
                position: absolute;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: #fff;
              }
              .c1 {
                left: 50%;
                top: -2.5px;
                transform: translateX(-50%);
              }
              .c2 {
                top: 50%;
                left: -2.5px;
                transform: translateY(-50%);
              }
              .c3 {
                left: 50%;
                bottom: -2.5px;
                transform: translateX(-50%);
              }
              .c4 {
                top: 50%;
                right: -2.5px;
                transform: translateY(-50%);
              }
            }
            .play2 {
              animation-delay: 1s;
            }
            .play3 {
              animation-delay: 2s;
            }
            .play4 {
              animation-delay: 3s;
            }
          }
        }
        .select {
          height: 10%;
          display: flex;
          .down,
          .comment {
            flex: 1;
            text-align: center;
            color: #eee;
          }
          .down {
            position: relative;
            .source {
              position: absolute;
              left: 56%;
              top: -39px;
              width: 100%;
              height: 32px;
              line-height: 32px;
              font-size: 13px;
              border-radius: 12px 12px 12px 0;
              background-image: linear-gradient(#00a4ff, #2ddae8);
              &.down-enter,
              &.down-leave-to {
                transform: scale(0);
                transform-origin: 0px 32px;
              }
              &.down-enter-active,
              &.down-leave-active {
                transition: all 0.4s;
              }
            }
          }
          .comment {
            position: relative;
            .cnum {
              position: absolute;
              left: 56%;
              top: -5px;
              height: 18px;
              font-size: 12px;
            }
          }
          .fav {
            flex: 1;
            text-align: center;
          }
        }
      }
      .lyricbox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .volbox {
          width: 100%;
          height: 24px;
          display: flex;
          .icon {
            width: 10%;
            font-size: 16px;
            text-align: center;
            line-height: 26px;
            color: #eee;
          }
          .barbox {
            width: 90%;
            height: 24px;
            padding-right: 2rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .bar-in {
              width: 100%;
              height: 3px;
              background: #e1e1f1;
              border-radius: 20px;
              position: relative;
              .bar {
                width: 0%;
                height: 100%;
                border-radius: 20px;
                background: #fff;
              }
              .dot {
                position: absolute;
                left: 0%;
                top: -2px;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background: #fff;
              }
            }
          }
        }
        .lyric {
          width: 100%;
          flex: 1;
          overflow-y: auto;
          p {
            width: 100%;
            padding: 0 16px;
            box-sizing: border-box;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 13px;
            color: #e1e1e1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:nth-child(1) {
              margin-top: 108px;
            }
            &.active {
              font-weight: bold;
              color: rgb(17, 89, 117);
            }
          }
        }
        .mask {
          width: 100%;
          height: 2rem;
        }
      }
    }
    .foot {
      width: 100%;
      height: 10%;
      padding: 0.4rem 0.8rem 0;
      box-sizing: border-box;
      .progress {
        width: 100%;
        height: 12px;
        display: flex;
        .cur {
          width: 10%;
          font-size: 11px;
          line-height: 12px;
          color: #e1e1e1;
        }
        .barbox {
          width: 80%;
          height: 12px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .bar-in {
            width: 100%;
            height: 4px;
            position: relative;
            background: #e1e1f1;
            border-radius: 16px;
            .bar {
              width: 0;
              height: 100%;
              background: #fff;
            }
            .dot {
              position: absolute;
              left: 0;
              top: -2px;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #fff;
            }
          }
        }
        .total {
          width: 10%;
          font-size: 11px;
          padding-left: 6px;
          box-sizing: border-box;
          text-align: right;
          line-height: 12px;
          color: #eee;
        }
      }
      .control {
        margin-top: 6px;
        width: 100%;
        height: 39px;
        display: flex;
        .mode,
        .list {
          width: 15%;
          text-align: center;
          line-height: 39px;
          color: #fff;
        }
        .playbox {
          width: 70%;
          padding: 0 10%;
          box-sizing: border-box;
          display: flex;
          .pre,
          .next {
            width: 30%;
            text-align: center;
            line-height: 39px;
            font-size: 18px;
            color: #fff;
            font-weight: bold;
          }
          .play {
            width: 40%;
            text-align: center;
            line-height: 39px;
            font-size: 30px;
            color: #fff;
          }
        }
      }
    }
  }
  .mini {
    width: 100%;
    height: 3.2rem;
    background: $color-background;
    border-top: 0.5px solid #eee;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    .picUrl {
      padding: 8px;
      box-sizing: border-box;
      width: 14%;
      border-radius: 50%;
      overflow: hidden;
      .pic-in {
        height: 100%;
        filter: blur(0.11px);
        animation: circleplay 24s linear infinite running;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .title {
      width: 75%;
      padding: 0 6px;
      box-sizing: border-box;
      display: flex;
      .name {
        width: 85%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          height: 26px;
          line-height: 26px;
          font-size: 14px;
          color: #00a4ff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          color: #00a4ff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .icon {
        width: 15%;
        text-align: center;
        line-height: 3.2rem;
        font-size: 22px;
        color: #000;
      }
    }
    .list {
      width: 11%;
      font-size: 18px;
      color: #000;
      text-align: center;
      line-height: 3.1rem;
    }
  }
}
@keyframes circleplay {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes playmusic {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.6) rotate(-120deg);
    opacity: 0;
  }
}
</style>