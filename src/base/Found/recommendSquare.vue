<template>
  <div class="content">
    <ul class="list" v-show="!loading">
      <li class="sub" v-for="item in playlists" :key="item.id" @click="toSongList(item.id)">
        <div class="picUrl">
          <img v-lazy="item.coverImgUrl" :alt="item.name" />
        </div>
        <span class="scrible">{{item.description}}</span>
      </li>
    </ul>
    <van-loading size="24px" vertical color="#00B7F8" v-show="loading">加载中...</van-loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  props: {
    playlists: {
      type: Array
    }
  },
  methods: {
    toSongList(id) {
      this.$router.push({ name: "songlist", params: { id: id } });
    },
    showLoading() {
      this.loading = false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";
.content {
  width: 100%;
  height: 514px;
  padding: 1rem 0.9rem 3.2rem;
  box-sizing: border-box;
  overflow-y: auto;
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .sub {
      width: 32%;
      height: 153px;
      margin-right: 2%;
      margin-bottom: 1rem;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .picUrl {
        width: 100%;
        height: 109px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .scrible {
        width: 100%;
        line-height: 22px;
        font-size: $font-size-small;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>