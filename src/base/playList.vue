<template>
  <div class="playlist" v-show="showFlag" @click="hide">
    <transition name="play-list" @after-leave="afterLeave">
      <div class="showwrap" @click.stop v-show="showWrap">
        <div class="head">
          <span :class="['mode-icon',iconMode]" @click="changeMode"></span>
          <div class="box">
            <span class="mode">{{textMode}} ({{songList.length}})</span>
            <div class="colbox">
              <span class="col-icon icon-shoucang"></span>
              <span class="col">收藏全部</span>
            </div>
          </div>
          <span class="del-icon icon-shanchu" @click="deleteAll"></span>
        </div>
        <div class="wrap-list">
          <ul class="list">
            <li
              v-for="(item,index) in songList"
              :key="item.id"
              @click="playItemList(item.id,index)"
            >
              <div class="title">
                <div class="title-in">
                  <span :class="[songs.id == item.id ? 'vol icon-yinliang1':'']" :style="[songs.id==item.id ? highLight : '']"></span>
                  <span class="name" :style="[songs.id==item.id ? highLight : '']">
                    {{item.name}}
                    <i :style="[songs.id==item.id ? highLight : '']">-{{item.ar[0].name}}</i>
                  </span>
                </div>
                <span class="time" :style="[songs.id==item.id ? highLight : '']">{{songs.id==item.id?format(currentTime):'00:00'}}</span>
              </div>
              <span class="del icon-chushaixuanxiang" @click.stop="deleteOne(item)" :style="[songs.id==item.id ? highLight : '']"></span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 是否删除整个音乐列表提示 -->
    <div class="message" v-show="messageBox" @click="closeBox">
      <div class="box" @click.stop>
        <p class="title">确定要清空全部历史记录?</p>
        <div class="select">
          <span class="cancel" @click="cancel">取消</span>
          <span class="sure" @click="empty">清空</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      showFlag: false,
      showWrap: false,
      messageBox: false,
      highLight: {
        color: "#00a4ff"
      }
    };
  },
  props: {
    currentTime: Number,
    duration: Number
  },
  computed: {
    ...mapGetters([
      "isplay",
      "fullScreen",
      "mode",
      "songId",
      "songList",
      "songIndex",
      "songs",
      "playList"
    ]),
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
    // 模式文字的切换
    textMode() {
      if (this.mode == this.playMode.sequence) {
        return "顺序播放";
      } else if (this.mode == this.playMode.loop) {
        return "单曲循环";
      } else {
        return "随机播放";
      }
    }
  },
  watch: {
    songList(newVal) {
      return newVal;
    },
    songId(newVal) {
      return newVal;
    }
  },
  created() {
    this.playMode = {
      sequence: 0,
      loop: 1,
      random: 2
    };
  },
  methods: {
    hide() {
      this.showWrap = false;
    },
    show() {
      this.showFlag = true;
      this.showWrap = true;
    },
    afterLeave() {
      if (this.showWrap == false) {
        this.showFlag = false;
      }
    },
    // 点击列表播放歌曲
    playItemList(id, index) {
      if (this.mode == this.playMode.random) {
        index = this.playList.findIndex(item => item.id == id);
        id = this.playList[index].id;
      }
      this.updateSongIndex(index);
      this.updateSongId(id);
    },
    deleteOne(song) {
      let playList = this.playList.slice();
      let songList = this.songList.slice();
      let songIndex = this.songIndex;
      let Pidx = playList.findIndex(item => item.id === song.id);
      playList.splice(Pidx, 1);
      let Sidx = songList.findIndex(item => item.id === song.id);
      songList.splice(Sidx, 1);
      if (songIndex > Pidx || songIndex === playList) {
        songIndex--;
      }
      this.updatePlayList(playList);
      this.updateSongList(songList);
      this.updateSongIndex(songIndex);

      let isplay = playList.length > 0;
      this.updatePlaying(isplay);
      if (!isplay) {
        this.hide();
        this.$emit("stopSong");
      }
    },
    deleteAll() {
      this.messageBox = true;
    },
    closeBox() {
      this.messageBox = false;
    },
    cancel() {
      this.messageBox = false;
    },
    empty() {
      this.updateSongIndex(-1);
      this.updatePlayList([]);
      this.updateSongList([]);
      this.updatePlaying(false);
      this.updateFullScreen(true);
      this.messageBox = false;
      this.showFlag = false;
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
      // 更新播放列表
      this.updatePlayList(list);
    },
    // 找到歌曲在当前列表中的索引
    findCurrentIndex(list) {
      let index = list.findIndex(item => item.id == this.songId);
      // 更新歌曲的索引到vuex中
      this.updateSongIndex(index);
      // console.log(index)
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
    ...mapMutations([
      "updateSongId",
      "updateMode",
      "updateSongList",
      "updateSongIndex",
      "updatePlayList",
      "updatePlaying",
      "updateFullScreen"
    ])
  }
};
</script>

<style lang="scss" scoped>
@import "../common/scss/common.scss";
.playlist {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 120;
  background: rgba(0, 0, 0, 0.4);
  .showwrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 366px;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    background: #fff;
    &.play-list-enter,
    &.play-list-leave-to {
      transform: translateY(100%);
      opacity: 0;
    }
    &.play-list-enter-active,
    &.play-list-leave-active {
      transition: all 0.4s ease;
    }
    .head {
      width: 100%;
      height: 42px;
      display: flex;
      .mode-icon,
      .del-icon {
        width: 10%;
        text-align: center;
        line-height: 42px;
        font-size: 20px;
      }
      .box {
        width: 80%;
        display: flex;
        justify-content: space-between;
        .mode {
          font-size: 14px;
          color: #333;
          line-height: 42px;
        }
        .colbox {
          display: flex;
          .col-icon {
            line-height: 42px;
            font-size: 20px;
          }
          .col {
            line-height: 42px;
            font-size: 14px;
            color: #333;
            padding-left: 6px;
            box-sizing: border-box;
          }
        }
      }
    }
    .wrap-list {
      width: 100%;
      height: 324px;
      padding: 0 6px;
      box-sizing: border-box;
      overflow-y: auto;
      .list {
        width: 100%;
        li {
          width: 100%;
          height: 36px;
          display: flex;
          .title {
            width: 90%;
            display: flex;
            justify-content: space-between;
            .title-in {
              display: flex;
              width: 100%;
              .vol {
                width: 10%;
                text-align: center;
                line-height: 38px;
                font-size: 18px;
                color: #333;
              }
              .name {
                width: 90%;
                font-size: 14px;
                color: #333;
                line-height: 36px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                i {
                  font-size: 11px;
                  font-style: normal;
                  color: #666;
                }
              }
            }
            .time {
              line-height: 36px;
              font-size: 13px;
              color: #333;
            }
          }
          .del {
            width: 10%;
            text-align: center;
            line-height: 36px;
            font-size: 13px;
          }
        }
      }
    }
  }
  .message {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      width: 80%;
      height: 20%;
      background: #fff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
        line-height: 400%;
        padding-left: 16px;
        font-size: 14px;
      }
      .select {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .cancel,
        .sure {
          width: 20%;
          line-height: 400%;
          font-size: 15px;
          color: #000;
        }
      }
    }
  }
}
</style>