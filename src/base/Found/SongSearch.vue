<template>
  <transition name="search">
    <div class="searchSong" v-show="showSearch">
      <div class="head">
        <span class="back icon-fanhui1" @click="goback"></span>
        <input class="txt" type="text" placeholder="搜索歌单内歌曲" v-model="songKeys" />
      </div>
      <div class="wrap">
        <ul class="list" v-for="item in searchwords" :key="item.id">
          <li @click="playSong(item.id)">
            <div class="list-in">
              <div class="name">
                <span class="word">{{item.name}}</span>
                <span class="arname">{{item.ar[0].name}}-{{item.al.name}}</span>
              </div>
              <span class="hide">00:00</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      songKeys: "",
      showSearch: false,
      sendList: true
    };
  },
  props: {
    tracks: Array
  },
  computed: {
    searchwords() {
      if (this.songKeys) {
        return this.tracks.filter(item => {
          if (
            item.name.includes(this.songKeys) ||
            item.ar[0].name.includes(this.songKeys) ||
            item.al.name.includes(this.songKeys)
          ) {
            return true;
          }
          return false;
        });
      }
    }
  },
  methods: {
    goback() {
      this.showSearch = false;
    },
    showResult() {
      this.showSearch = true;
    },
    playSong(id) {
      this.updateSongId(id);
      if (this.sendList) {
        this.updateSongList(this.tracks);
        this.sendList = false;
      }
      this.updateFullScreen(true);
    },
    ...mapMutations(["updateSongId", "updateSongList", "updateFullScreen"])
  }
};
</script>

<style lang="scss" scoped>
.searchSong {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 16;
  &.search-enter,
  &.search-leave-to {
    transform: translateY(100%);
  }
  &.search-enter-active,
  &.search-leave-active {
    transition: all 0.4s;
  }
  .head {
    height: 4.2rem;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-image: linear-gradient(#00a4ff, #2ddae8);
    display: flex;
    .back {
      width: 15%;
      line-height: 4.4rem;
      text-align: center;
      color: rgb(223, 111, 167);
      font-size: 18px;
    }
    .txt {
      padding-left: 10px;
      box-sizing: border-box;
      width: 85%;
      font-size: 20px;
      color: #fff;
      outline: none;
      background: transparent;
      &::-webkit-input-placeholder {
        color: rgb(223, 111, 167);
        font-size: 16px;
      }
      &:-moz-placeholder {
        color: rgb(223, 111, 167);
        font-size: 16px;
      }
      &:-ms-input-placeholder {
        color: rgb(223, 111, 167);
        font-size: 16px;
      }
    }
  }
  .wrap {
    width: 100%;
    height: 100%;
    padding: 4.4rem 1rem 3.2rem;
    box-sizing: border-box;
    overflow-y: auto;
    background: #fff;
    .list {
      width: 100%;
      li {
        width: 100%;
        height: 56px;
        .list-in {
          width: 100%;
          height: 100%;
          display: flex;
          .name {
            width: 88%;
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
}
</style>