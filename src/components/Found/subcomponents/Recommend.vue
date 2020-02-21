<template>
  <div class="recommendSquare">
    <div class="head">
      <div class="top">
        <span class="back icon-fanhui1" ref="back" @click="goback"></span>
        <h3 class="title">歌单广场</h3>
      </div>
      <!-- vant的tab栏插件 -->
      <van-tabs animated swipeable :duration="tabs.duration" color="#00a4ff" @change="getCat">
        <van-tab v-for="item in tags" :title="item.name" :key="item.name">
          <!-- 缓存保持状态 -->
          <keep-alive>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommend-square :playlists="playlists" ref="showLoading"></recommend-square>
            </van-pull-refresh>
          </keep-alive>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import recommendSquare from "../../../base/Found/recommendSquare.vue";
export default {
  data() {
    return {
      tags: [],
      playlists: [],
      title: "华语",
      index: 0,
      tabs: {
        duration: 0.5
      },
      isLoading: false
    };
  },
  created() {
    this._regetRcommend();
    this._getAllRecommend(this.index, this.title);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getCat(index, title) {
      this.index = index
      this.title = title
      this._getAllRecommend(index, title);
    },
    // 请求得到推荐歌单分类
    _regetRcommend() {
      this.$axios.get("/playlist/hot").then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          this.tags = res.data.tags;
        }
      });
    },
    // 请求得到歌单列表
    _getAllRecommend(index, title) {
      this.$axios
        .get("/top/playlist/highquality", {
          params: {
            cat: title
          }
        })
        .then(res => {
          if (res.status == 200) {
            // console.log(res.data)
            this.playlists = res.data.playlists;
          }
          this.$refs.showLoading[index].showLoading();
        });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
      this._getAllRecommend(this.index,this.title); 
    }
  },
  components: {
    recommendSquare
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/scss/common.scss";
.recommendSquare {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 6.4rem 0.9rem 3.2rem;
  box-sizing: border-box;
  z-index: 11;
  overflow-y: auto;
  background: $color-background;
  .head {
    width: 100%;
    height: 102px;
    position: fixed;
    top: 0;
    left: 0;
    background-image: linear-gradient(#2ddae8,#00a4ff);
    color: #333;
    .top {
      width: 100%;
      height: 64px;
      display: flex;
      .back {
        width: 10%;
        text-align: center;
        height: 64px;
        line-height: 64px;
        color: $color-text;
        font-size: 20px;
      }
      .title {
        width: 90%;
        line-height: 64px;
        height: 64px;
        padding-left: 1rem;
        box-sizing: border-box;
        color: $color-text;
      }
    }
  }
}
</style>