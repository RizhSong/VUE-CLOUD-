<template>
  <div class="recommend">
    <div class="title">
      <h3 class="new">推荐歌单</h3>
      <router-link to="/recommend" class="more" tag="span">歌单广场</router-link>
    </div>
    <div class="content">
      <div class="cover" v-for="item in recommend" :key="item.id" @click="toSongList(item.id)">
        <div class="cover-in">
          <img v-lazy="item.picUrl">
        </div>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array
    }
  },
  methods: {
    toSongList(id) {
      this.$router.push({ name: "songlist", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";
.recommend {
  width: 100%;
  margin-bottom: 1rem;
  .title {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    .new {
      text-align: center;
      line-height: 56px;
      height: 56px;
      color: $color-text;
      font-size: $font-size-medium-x;
    }
    .more {
      text-align: center;
      line-height: 56px;
      height: 56px;
      font-size: $font-size-small-x;
    }
  }
  .content {
    width: 100%;
    height: 310px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    // border: 0.5px solid #2DDAE8;
    .cover {
      width: 31%;
      height: 139px;
      margin-right: 3%;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .cover-in {
        width: 100%;
        height: 107px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        color: $color-text-m;
        font-size: $font-size-small;
        display: inline-block;
        width: 100%;
        height: 2.2rem;
        line-height: 1.1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>