<template>
  <div class="myList">
    <div class="wrap1">
      <div class="mywrap1" @click="openMysong">
        <span :class="['arr',showMySong?'icon-dakai':'icon-shouqi']"></span>
        <div class="name">
          创建的歌单
          <i>({{createdPlaylistCount}})</i>
        </div>
        <span class="add icon-addTodo-nav"></span>
        <span class="operate icon-caozuo"></span>
      </div>
      <transition name="mysong">
        <div class="content1" v-show="showMySong">
          <ul class="list">
            <li v-for="item in myCreateSong" :key="item.id" @click="displaySongList(item.id)">
              <div class="picUrl">
                <img v-lazy="item.coverImgUrl" />
              </div>
              <div class="title">
                <h3 v-text="item.name"></h3>
                <span class="count">{{item.trackCount}}首</span>
              </div>
              <span class="operate icon-caozuo"></span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="wrap2" @click="openCreatesong">
      <div class="mywrap2">
        <span :class="['arr',showCreateSong?'icon-dakai':'icon-shouqi']"></span>
        <div class="name">
          收藏的歌单
          <i>({{subPlaylistCount}})</i>
        </div>
        <span class="operate icon-caozuo"></span>
      </div>
      <transition name="cresong">
        <div class="content2" v-show="showCreateSong">
          <ul class="list">
            <li v-for="item in myCollectSong" :key="item.id" @click="displayCollect(item.id)">
              <div class="picUrl">
                <img v-lazy="item.coverImgUrl" />
              </div>
              <div class="title">
                <h3 v-text="item.name"></h3>
                <span class="count">{{item.trackCount}}首</span>
              </div>
              <span class="operate icon-caozuo"></span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMySong: true,
      showCreateSong: true
    };
  },
  props: {
    createdPlaylistCount: Number,
    subPlaylistCount: Number,
    myCreateSong: Array,
    myCollectSong: Array
  },
  methods: {
    displaySongList(id){
      this.$router.push({name:'songlist',params:{id:id}})
    },
    displayCollect(id) {
      this.$router.push({name:'songlist',params:{id:id}})
    },
    openMysong() {
      this.showMySong = !this.showMySong;
    },
    openCreatesong() {
      this.showCreateSong = !this.showCreateSong;
    }
  }
};
</script>

<style lang="scss" scoped>
.myList {
  width: 100%;
  margin-top: 16px;
  .wrap1 {
    border-bottom: 0.5px solid #eee;
    .mywrap1 {
      width: 100%;
      height: 36px;
      display: flex;
      .arr,
      .add,
      .operate {
        width: 10%;
        text-align: center;
        line-height: 36px;
        font-size: 16px;
        color: #000;
      }
      .operate {
        height: 36px;
        font-size: 14px;
      }
      .name {
        width: 70%;
        line-height: 36px;
        color: #000;
        i {
          font-size: 14px;
          font-style: normal;
        }
      }
    }
    .content1 {
      width: 100%;
      &.mysong-enter,
      &.mysong-leave-to {
        transform: translate(-40%,-40%) scale(0.1);
        opacity: 0;
      }
      &.mysong-enter-active,
      &.mysong-leave-active {
        transition: all 0.4s;
      }
      .list {
        width: 100%;
        li {
          width: 100%;
          height: 46px;
          margin-bottom: 10px;
          display: flex;
          .picUrl {
            width: 14%;
            border-radius: 6px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .title {
            width: 76%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 10px;
            box-sizing: border-box;
            h3 {
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .count {
              font-size: 12px;
            }
          }
          .operate {
            width: 10%;
            font-size: 14px;
            color: #333;
            line-height: 46px;
            text-align: center;
          }
        }
      }
    }
  }
  .wrap2 {
    border-bottom: 0.5px solid #eee;
    .mywrap2 {
      width: 100%;
      height: 36px;
      display: flex;
      .arr,
      .operate {
        width: 10%;
        text-align: center;
        line-height: 36px;
        font-size: 16px;
        color: #333;
      }
      .operate {
        height: 36px;
        font-size: 14px;
      }
      .name {
        width: 80%;
        line-height: 36px;
        color: #000;
        i {
          font-size: 14px;
          font-style: normal;
        }
      }
    }
    .content2 {
      width: 100%;
      &.cresong-enter {
        transform: translate(-40%,-40%) scale(0.1);
        opacity: 0;
      }
      &.cresong-leave-to {
        transform: translate(-40%,-40%) scale(0.1);
        opacity: 0;
      }
      &.cresong-enter-active,
      &.cresong-leave-active {
        transition: all 0.4s
      }
      .list {
        width: 100%;
        li {
          width: 100%;
          height: 46px;
          margin-bottom: 10px;
          display: flex;
          &:last-child {
            margin-bottom: 0;
          }
          .picUrl {
            width: 14%;
            border-radius: 6px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .title {
            width: 76%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 10px;
            box-sizing: border-box;
            h3 {
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .count {
              font-size: 12px;
            }
          }
          .operate {
            width: 10%;
            font-size: 14px;
            color: #333;
            line-height: 46px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>