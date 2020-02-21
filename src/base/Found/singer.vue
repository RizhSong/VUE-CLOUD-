<template>
  <div class="singer">
    <div class="title">
      <h3 class="new">热门歌手</h3>
      <span class="more" @click="changeSinger">换一批</span>
    </div>
    <div class="content">
      <div class="cover" v-for="item in singer" :key="item.id" @click="toSinger(item.id)">
        <div class="cover-in">
          <img v-lazy="item.picUrl" />
        </div>
        <span v-text="item.name"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singerType: [
        "1001",
        "1002",
        "1003",
        "5001",
        "2001",
        "2002",
        "2003",
        "6001",
        "6002",
        "6003",
        "7001",
        "7002",
        "7003",
        "4001",
        "4002",
        "4003"
      ]
    };
  },
  props: {
    singer: Array
  },
  methods: {
    toSinger(id) {
      this.$router.push({ name: "singer", params: { id: id } });
    },
    changeSinger() {
      let type = this.dealSinger(this.singerType);
      this.$emit("singertype", type);
    },
    // 歌手处理
    dealSinger(singerType) {
      let index = Math.floor(Math.random() * singerType.length);
      return singerType[index];
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";
.singer {
  width: 100%;
  margin-bottom: 2rem;
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
    height: 430px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    .cover {
      width: 31%;
      height: 139px;
      margin-right: 3%;
      margin-bottom: 10px;
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