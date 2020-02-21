<template>
  <div class="found">
    <!-- 轮播图 -->
    <swiper :swiperSlides="banners"></swiper>
    <!-- 小列表 -->
    <div class="foundTab">
      <div class="bacc">
        <router-link to="/recommend" class="foundList" tag="div">
          <span class="icon icon-gedan"></span>
          <span class="songMenu">歌单</span>
        </router-link>
        <router-link to="/found/ranklist" class="foundRank">
          <span class="icon icon-paixingbang"></span>
          <span class="songRank">排行榜</span>
        </router-link>
        <router-link to="/mv" class="foundMv">
          <span class="icon icon-mv"></span>
          <span class="songVideo">MV</span>
        </router-link>
        <router-link to="/radio" class="foundRadio" tag="div">
          <span class="icon icon-diantai1"></span>
          <span class="songRadio">电台</span>
        </router-link>
      </div>
    </div>
    <!-- 最新专辑 -->
    <album :album="album"></album>
    <!-- 推荐歌单 -->
    <recommend :recommend="recommend"></recommend>
    <!-- 推荐电台 -->
    <radio :radio="radio"></radio>
    <!-- 推荐歌星 -->
    <singer :singer="singer" @singertype="getsingerType"></singer>
  </div>
</template>

<script>
import swiper from "../../base/swiper.vue";
import album from "../../base/Found/album.vue";
import recommend from "../../base/Found/recommend.vue";
import singer from "../../base/Found/singer.vue";
import radio from "../../base/Found/radio.vue";
import eventbus from "../../common/js/eventbus.js";
export default {
  data() {
    return {
      banners: [],
      album: [],
      recommend: [],
      radio: [],
      singer: [],
      singerType: "1001"
    };
  },
  created() {
    this._getSwiper();
    this._getAlbum();
    this._getRecommend();
    this._getRadio();
    this._getHotSinger(localStorage.getItem("singerType") || "1001");
  },
  mounted() {},
  methods: {
    // 轮播图
    _getSwiper() {
      this.$axios.get("/banner?type=2").then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          this.banners = res.data.banners;
          // 把banner的轮播图传递给歌单当背景
          this.$store.commit("updateBanners", this.banners);
        }
      });
    },
    // 获取最新专辑
    _getAlbum() {
      this.$axios.get("/album/newest").then(res => {
        if (res.status == 200) {
          this.album = res.data.albums;
        }
      });
    },
    // 获取推荐歌单
    _getRecommend() {
      this.$axios.get("/personalized?limit=6").then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          this.recommend = res.data.result;
        }
      });
    },
    // 获取推荐电台
    _getRadio() {
      this.$axios.get("/personalized/djprogram").then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          this.radio = res.data.result;
        }
      });
    },
    // 获取热门歌手
    _getHotSinger(type) {
      this.$axios.get(`/artist/list?cat=${type}&limit=9`).then(res => {
        if (res.status == 200) {
          this.singer = res.data.artists;
        }
      });
    },
    getsingerType(type) {
      this.singerType = type;
      localStorage.setItem("singerType", this.singerType);
      this._getHotSinger(type);
    }
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to,from)
    to.meta.keepAlive = false;
    next();
  },
  components: {
    swiper,
    album,
    recommend,
    radio,
    singer
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";
.found {
  .foundTab {
    width: 100%;
    height: 105px;
    padding: 18px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .bacc {
      display: flex;
      justify-content: center;
      border-radius: 12px;
      background-image: linear-gradient(#00a4ff, #2ddae8);
      .foundList,
      .foundRank,
      .foundMv,
      .foundRadio {
        flex: 1;
        display: flex;
        flex-direction: column;
        .icon {
          width: 3rem;
          height: 3rem;
          text-align: center;
          line-height: 3rem;
          margin-left: 1.2rem;
          color: #eee;
        }
        .songMenu,
        .songRank,
        .songVideo,
        .songRadio {
          text-align: center;
          width: 100%;
          height: 27px;
          line-height: 27px;
          color: #eee;
          font-size: $font-size-small;
        }
      }
    }
  }
}
</style>