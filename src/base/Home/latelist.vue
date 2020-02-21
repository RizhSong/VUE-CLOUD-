<template>
  <div class="List">
    <div class="head">
      <span class="icon-bofang1 icon"></span>
      <div class="playall">
        <span class="word">播放全部</span>
        <span class="count">(共{{tracks.length}}首)</span>
      </div>
    </div>
    <ul class="list">
      <li v-for="(item,index) in tracks" :key="item.dt" @click="updateLateList(item.id)">
        <div class="list-in">
          <span class="num">{{index + 1}}</span>
          <div class="name">
            <span class="word">{{item.name}}</span>
            <span class="arname">{{item.ar[0].name}} - {{item.al.name}}</span>
          </div>
          <span class="hide">00:00</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations,mapGetters } from "vuex";
export default {
  data() {
    return {
      sendSongList: true
    }
  },
  props: {
    tracks: {
      type: Array
    }
  },
  // watch: {
  //   tracks(newVal) {
  //     console.log(newVal)
  //     console.log(newVal.length)
  //     return this.updateLateLength(newVal.length)
  //   }  // vue只能监听数组的push，pop,shift,unshift等方法
  //         ，使用watch监听数组的话，可以设置一个计算属性，使用watch去监听该计算属性
  // },
  computed: {
    ...mapGetters(['isplay','songs','currentTime'])
  },
  methods: {
    ...mapMutations(["updateSongId", "updateSongList","updateFullScreen"]),
    updateLateList(id) {
      // 当点击歌单列表中歌曲的时候 把歌的Id传递给vuex
      this.updateSongId(id);
      // 并且把当前歌曲存到localStorage中 以便下次在小的播放控件中可以保存状态
      localStorage.setItem("songId", id);
      if (this.sendSongList) {
        // 把歌单列表详情传给vuex
        this.updateSongList(this.tracks);
        this.sendSongList = false
      }
      this.updateFullScreen(true)
    },
    // 格式化时间
    format(interval) {
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = interval % 60;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return minute + ":" + second;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";
.List {
  width: 100%;
  height: 587px;
  padding: 0 16px 52px;
  border-radius: 16px 16px 0 0;
  background: #fff;
  box-sizing: border-box;
  overflow-y: auto;
  .head {
    width: 100%;
    height: 51px;
    line-height: 51px;
    display: flex;
    // position: sticky;
    // top: 4.2rem;
    background: #fff;
    .icon {
      width: 12%;
      height: 51px;
      line-height: 51px;
      text-align: left;
      font-size: 18px;
    }
    .playall {
      width: 85%;
      display: flex;
      height: 51px;
      .word {
        color: $color-text;
      }
      .count {
        font-size: $font-size-small;
        padding-left: 4px;
        line-height: 53px;
      }
    }
  }
  .list {
    width: 100%;
    li {
      width: 100%;
      height: 56px;
      .list-in {
        width: 100%;
        height: 100%;
        display: flex;
        .num {
          width: 12%;
          font-size: 13px;
          line-height: 56px;
        }
        .name {
          width: 76%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .word {
            width: 100%;
            height: 28px;
            line-height: 28px;
            font-size: 15px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .arname {
            width: 100%;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .hide {
          width: 12%;
          font-size: 13px;
          line-height: 56px;
        }
      }
    }
  }
}
</style>