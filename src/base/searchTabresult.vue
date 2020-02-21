<template>
  <!-- <transition> -->
    <!-- 控制搜索内容的显示和隐藏 -->
    <div class="wrap">
      <!-- 单曲 -->
      <div class="resultList" v-if="tabType===1">
        <div class="playHead">
          <div class="left">
            <span class="icon icon-bofang1"></span>
            <span class="play">播放全部</span>
          </div>
          <div class="right">
            <span class="icon icon-bofangliebiao1"></span>
            <span class="select">多选</span>
          </div>
        </div>
        <div class="content">
          <ul class="list">
            <li class="list-in" v-for="item in songs" :key="item.id" @click="_playSong(item.id)">
              <div class="title">
                <h3 class="name" v-text="item.name"></h3>
                <span class="dis">{{item.artists[0].name}}-{{item.album.name}}</span>
              </div>
              <span class="operate icon-caozuo"></span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 专辑 -->
      <div class="albums" v-else-if="tabType===10">
        <ul class="list">
          <li class="list-in" v-for="item in albums" :key="item.id">
            <div class="picUrl">
              <div class="pic-in">
                <img v-lazy="item.picUrl" :alt="item.name" />
              </div>
            </div>
            <div class="title">
              <h3 class="name" v-text="item.name"></h3>
              <span class="dis">{{item.artist.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 歌手 -->
      <div class="singer" v-else-if="tabType===100">
        <ul class="list">
          <li class="list-in" v-for="item in arts" :key="item.id">
            <div class="picUrl">
              <img v-lazy="item.picUrl?item.picUrl:'../common/images/lazy2.jpg'">
            </div>
            <span class="name" v-text="item.name"></span>
          </li>
        </ul>
      </div>
      <!-- 歌单 -->
      <div class="playlist" v-else-if="tabType===1000">
        <ul class="list">
          <li class="list-in" v-for="item in playlists" :key="item.id">
            <div class="picUrl">
              <img v-lazy="item.coverImgUrl" :alt="item.name" />
            </div>
            <div class="title">
              <h3 class="name" v-text="item.name"></h3>
              <span class="dis">{{item.creator.trackCount}}首 by {{item.creator.nickname}}</span>
            </div>  
          </li>
        </ul>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
export default {
  data() {
    return {
      showList: false,
      flagTab: true
    };
  },
  props: {
    songs: Array,
    albums: Array,
    arts: Array,
    playlists: Array,
    tabType: Number
  },
  methods: {
    display() {
      this.showList = true;
    },
    _playSong(id){
      this.updateSongId(id)
      this.updateFullScreen(true)
    },
    ...mapMutations(['updateSongId','updateFullScreen'])
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 587px;
  padding: 10px 16px 52px;
  box-sizing: border-box;
  background: #fff;
  overflow-y: auto;
  // 单曲
  .resultList {
    width: 100%;
    .playHead {
      width: 100%;
      height: 32px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 36%;
        display: flex;
        .icon {
          width: 30%;
          line-height: 32px;
          font-size: 20px;
          color: #000;
        }
        .play {
          width: 70%;
          line-height: 32px;
          font-size: 15px;
          color: #000;
        }
      }
      .right {
        width: 20%;
        display: flex;
        .icon {
          width: 30%;
          font-size: 18px;
          color: #000;
          line-height: 32px;
        }
        .select {
          width: 70%;
          line-height: 32px;
          text-align: center;
          color: #000;
          font-size: 14px;
        }
      }
    }
    .content {
      width: 100%;
      margin-top: 10px;
      .list {
        width: 100%;
        .list-in {
          width: 100%;
          height: 42px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          .title {
            width: 90%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name {
              height: 28px;
              font-size: 15px;
              line-height: 28px;
              color: #00b7f8;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .dis {
              height: 14px;
              line-height: 14px;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .operate {
            width: 10%;
            line-height: 42px;
            font-size: 18px;
            text-align: center;
          }
        }
      }
    }
  }
  //专辑
  .albums {
    width: 100%;
    .list {
      width: 100%;
      .list-in {
        width: 100%;
        height: 46px;
        margin-bottom: 10px;
        display: flex;
        .picUrl {
          width: 18%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          border-radius: 0 47% 47% 0;
          .pic-in {
            width: 80%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .title {
          width: 82%;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            width: 100%;
            font-size: 15px;
            line-height: 28px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .dis {
            width: 100%;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  // 歌手
  .singer {
    width: 100%;
    .list {
      width: 100%;
      .list-in {
        width: 100%;
        height: 46px;
        display: flex;
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        .picUrl {
          width: 14%;
          overflow: hidden;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          width: 86%;
          line-height: 46px;
          padding: 0 16px;
          box-sizing: border-box;
          font-size: 15px;
          color: #333;
        }
      }
    }
  }
  // 歌单
  .playlist {
    width: 100%;
    .list {
      width: 100%;
      .list-in {
        width: 100%;
        height: 46px;
        display: flex;
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0;
        }
        .picUrl {
          width: 14%;
          overflow: hidden;
          border-radius: 6px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          width: 86%;
          line-height: 46px;
          padding: 0 16px;
          box-sizing: border-box;
          font-size: 15px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            width: 100%;
            height: 28px;
            line-height: 28px;
            font-size: 15px;
            color: #333;
          }
          .dis {
            line-height: 14px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>