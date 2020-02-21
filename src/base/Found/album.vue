<template>
  <div class="album">
    <div class="title">
      <h3 class="new">新碟</h3>
      <span class="more" @click="moreAlbum">更多新碟</span>
    </div>
    <div class="content">
      <div class="cover" v-for="item in albums" :key="item.id" @click="toAlbumDetail(item.id)">
        <div class="cover-in">
          <img v-lazy="item.picUrl" :alt="item.name" />
        </div>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Array
    }
  },
  computed: {
    // 截取最前面三张专辑
    albums() {
      return this.album.filter((item, index) => {
        if (index > 2) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    moreAlbum() {
      this.$router.push('/album')
    },
    toAlbumDetail(id) {
      this.$router.push({name: 'albumdetail', params:{id: id}})
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";
.album {
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
    height: 148px;
    display: flex;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    .cover {
      width: 31%;
      height: 100%;
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
        height: 2rem;
        line-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>