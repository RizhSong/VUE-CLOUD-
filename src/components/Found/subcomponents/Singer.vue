<template>
  <div class="daily" ref="singerlist" @scroll="scrollFull">
    <div class="head">
      <div class="back icon-fanhui1" @click="goback"></div>
      <div class="commend">热门歌手</div>
    </div>
    <div
      :class="'backUrl'"
      :style="{backgroundImage: `url(${artist.img1v1Url})`,backgroundSize:`100% 100%`,backgroundPosition:`center center`}"
    >
      <div class="singerInfo">
        <span class="name" v-text="artist.name"></span>
      </div>
    </div>
    <div class="content">
      <div class="contentHead" ref="Head">
        <div class="left">
          <span class="icon icon-bofang1"></span>
          <span class="play">播放全部</span>
        </div>
        <div class="right">
          <span class="slelct icon-liebiao1"></span>
          <span class="word">多选</span>
        </div>
      </div>
      <ul class="list">
        <li class="list-in" v-for="item in hotSongs" :key="item.id" @click="playSong(item.id)">
          <div class="picUrl">
            <img v-lazy="item.al.picUrl" />
            <span class="icon"></span>
          </div>
          <div class="title">
            <h3 class="name" v-text="item.name"></h3>
            <span class="dis">{{item.ar[0].name}}-{{item.al.name}}</span>
          </div>
          <span class="operate icon-caozuo"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      artist: {},
      hotSongs: [],
      sendSinger: true,
      scrollTop: 0,
      bacc: ''
    };
  },
  created() {
    this.getSingerDetail(this.$route.params.id);
  },
  watch: {
    scrollTop(newVal) { 
    }  
  },
  computed: {
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getSingerDetail(id) {
      this.$axios.get("/artists?id=" + id).then(res => {
        if (res.status == 200) {
          const { artist, hotSongs } = res.data;
          this.artist = artist;
          this.hotSongs = hotSongs;
        }
      });
    },
    playSong(id) {
      this.updateSongId(id);
      if (this.sendSinger) {
        this.updateSongList(this.hotSongs);
        this.sendSinger = false;
      }
      this.updateFullScreen(true);
    },
    scrollFull(){
      this.scrollTop = this.$refs.singerlist.scrollTop
    },
    ...mapMutations(["updateSongId", "updateSongList", "updateFullScreen"])
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.daily {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19;
  overflow-y: auto;
  background: #fff;
  .head {
    width: 100%;
    height: 64px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background-image: linear-gradient(#2ddae8,#00a4ff);
    display: flex;
    .back {
      width: 15%;
      text-align: center;
      line-height: 64px;
      font-size: 20px;
      color: #333;
    }
    .commend {
      width: 85%;
      line-height: 64px;
      color: #333;
    }
  }
  .backUrl {
    width: 100%;
    height: 240px;
    position: relative;
    .singerInfo {
      position: absolute;
      top: 60%;
      left: 5%;
      width: 40%;
      height: 20%;
      line-height: 48px;
      display: flex;
      color: #fff;
      .name {
        font-size: 18px;
      }
    }
  }
  .content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 210px;
    padding: 0 0 52px 0;
    background: #fff;
    border-radius: 16px 16px 0 0;
    .contentHead {
      width: 100%;
      height: 36px;
      border-radius: 16px 16px 0 0;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;
      position: sticky;
      top: 64px;
      border-bottom: 0.5px solid #eee;
      background: #fff;
      .left {
        width: 30%;
        display: flex;
        .icon {
          width: 30%;
          font-size: 18px;
          line-height: 36px;
          color: #000;
        }
        .play {
          width: 70%;
          font-size: 15px;
          color: #000;
          line-height: 36px;
        }
      }
      .right {
        width: 20%;
        display: flex;
        .slelct {
          flex: 1;
          line-height: 36px;
          text-align: center;
          color: #000;
        }
        .word {
          flex: 1;
          line-height: 36px;
          text-align: center;
          color: #000;
          font-size: 15px;
        }
      }
    }
    .list {
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      margin-top: 10px;
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
          border-radius: 6px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          width: 76%;
          padding-left: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            line-height: 32px;
            font-size: 15px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .dis {
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .operate {
          width: 10%;
          font-size: 18px;
          line-height: 46px;
          text-align: right;
        }
      }
    }
  }
}
</style>