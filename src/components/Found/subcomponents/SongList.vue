<template>
  <div class="songList">
    <span class="back icon-fanhui1" @click="goback"></span>
    <div class="head">
      <span class="name">歌单</span>
      <span class="icon-sousuo icon" @click="searchSong"></span>
    </div>
    <div class="cover" ref="cover" v-show="!loading">
      <div class="cover-in">
        <div class="picUrl">
          <img v-lazy="coverImgUrl" />
        </div>
        <div class="title">
          <div class="creator">
            <h3>{{name}}</h3>
            <a href>
              <img v-lazy="creator.avatarUrl" />
              <span>{{ creator.nickname }}</span>
            </a>
          </div>
          <p class="scrible">{{ description }}</p>
        </div>
      </div>
      <div class="operate">
        <span class="comment">
          <span class="icon-pinglun icon"></span>
          <span class="count">{{commentCount}}</span>
        </span>
        <span class="share">
          <span class="icon-fenxiang2 icon"></span>
          <span class="count">{{shareCount}}</span>
        </span>
        <span class="collect">
          <span class="icon-shoucang icon"></span>
          <span class="count">121199</span>
        </span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <list :tracks="tracks" v-show="!loading" ref="List"></list>
    <van-loading size="24px" vertical color="#00B7F8" v-show="loading">加载中...</van-loading>
    <!-- 操作歌曲 -->
    <next-play></next-play>
    <!-- 搜索歌单内的歌曲 -->
    <song-search :tracks="tracks" ref="searchList"></song-search>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import List from "../../../base/List.vue";
import nextPlay from "../../../base/Found/nextPlay.vue";
import SongSearch from "../../../base/Found/SongSearch.vue";
export default {
  data() {
    return {
      name: "",
      coverImgUrl: "",
      commentCount: "",
      shareCount: "",
      trackCount: "",
      description: "",
      creator: {},
      tracks: [],
      loading: true
    };
  },
  computed: {
    ...mapGetters(["banners"])
  },
  created() {
    this._getSongListDetail(this.$route.params.id);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    searchSong() {
      this.$refs.searchList.showResult();
    },
    _getSongListDetail(id) {
      this.$axios.get("/playlist/detail?id=" + id).then(res => {
        if (res.status == 200) {
          const {
            name,
            coverImgUrl,
            commentCount,
            shareCount,
            trackCount,
            description,
            creator,
            tracks
          } = res.data.playlist;
          this.name = name;
          this.coverImgUrl = coverImgUrl;
          this.commentCount = commentCount;
          this.shareCount = shareCount;
          this.trackCount = trackCount;
          this.description = description;
          this.creator = creator;
          // 歌单详情
          this.tracks = tracks;
          this.loading = false;
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to,from)
    to.meta.keepAlive = true;
    next();
  },
  mounted() {
    console.log(this.$refs.List)
  },
  components: {
    List,
    nextPlay,
    SongSearch
  }
};
</script>

<style lang="scss">
@import "../../../common/scss/common.scss";
.songList {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 11;
  overflow-y: auto;
  .back {
    position: fixed;
    top: 0;
    left: 0;
    width: 3rem;
    height: 4.2rem;
    text-align: center;
    line-height: 4.2rem;
    z-index: 12;
    color: #333;
    font-size: 20px;
  }
  .head {
    width: 100%;
    height: 4.2rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    line-height: 4.2rem;
    display: flex;
    justify-content: space-between;
    padding-left: 3rem;
    box-sizing: border-box;
    background-image: linear-gradient(#2ddae8,#00a4ff);
    color: #333;
    .name {
      width: 20%;
      height: 100%;
      text-align: center;
    }
    .icon {
      width: 20%;
      height: 100%;
      text-align: center;
      line-height: 4.2rem;
    }
  }
  .cover {
    width: 100%;
    height: 214px;
    padding-top: 4.2rem;
    background-image: linear-gradient(#00a4ff,#00feff);
    filter: blur(0.11px);
    .cover-in {
      width: 100%;
      height: 139px;
      display: flex;
      padding: 1rem;
      box-sizing: border-box;
      .picUrl {
        width: 33%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        width: 67%;
        height: 100%;
        padding-left: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .creator {
          width: 100%;
          height: 56px;
          display: flex;
          flex-direction: column;
          h3 {
            color: #fff;
            font-size: 15px;
            height: 26px;
            line-height: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-bottom: 6px;
          }
          a {
            height: 30px;
            color: #e8ecef;
            display: flex;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
            span {
              font-size: $font-size-small;
              height: 30px;
              line-height: 30px;
              padding-left: 6px;
              box-sizing: border-box;
            }
          }
        }
        .scrible {
          width: 100%;
          height: 36px;
          line-height: 18px;
          color: #e8ecef;
          font-size: 11px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .operate {
      width: 100%;
      height: 75px;
      padding: 1rem;
      box-sizing: border-box;
      display: flex;
      .comment,
      .share,
      .collect {
        flex: 1;
        margin-right: 20%;
        display: flex;
        flex-direction: column;
        &:nth-child(3) {
          margin-right: 0;
        }
        .icon {
          text-align: center;
          color: #eee;
          font-size: 18px;
        }
        .count {
          text-align: center;
          color: #eee;
          height: 24px;
          line-height: 24px;
          margin-top: 4px;
          font-size: $font-size-small;
        }
      }
    }
  }
  .van-loading {
    position: absolute;
    left: 50%;
    top: 67px;
    transform: translateX(-50%);
    .van-loading__text {
      color: #00b7f8;
    }
  }
}
</style>