<template>
  <div class="albumSquare">
    <div class="head">
      <span class="back icon-fanhui1" ref="back" @click="goback"></span>
      <h3 class="title">新碟上架</h3>
    </div>
    <ul class="new">
      <li class="list" v-for="item in albumNew" :key="item.id" @click="toAlbumDetail(item.id)">
        <div class="pc-back">
          <div class="picUrl">
            <img v-lazy="item.picUrl" :alt="item.name" />
          </div>
        </div>
        <div class="scrible">
          <p>{{item.name}}</p>
          <span>{{item.artist.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import eventbus from "../../../common/js/eventbus.js";
export default {
  data() {
    return {
      albumNew: []
    };
  },
  created() {
    this._regetAlbum();
    // 接收数据
    // eventbus.$on("album", data => {
    //   this.albumNew = data;
    // });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 请求专辑
    _regetAlbum() {
      this.$axios.get("/album/newest").then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          this.albumNew = res.data.albums;
        }
      });
    },
    toAlbumDetail(id) {
      this.$router.push({ name: "albumdetail", params: { id: id } });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../common/scss/common.scss";
.albumSquare {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  overflow-y: auto;
  padding: 4rem 1rem 3.2rem;
  box-sizing: border-box;
  background: $color-background;
  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-image: linear-gradient(#2ddae8,#00a4ff);
    color: #333;
    display: flex;
    border-bottom: 1px solid #eee;
    .back {
      width: 10%;
      text-align: center;
      line-height: 64px;
      color: $color-text;
      font-size: 20px;
    }
    .title {
      width: 90%;
      line-height: 64px;
      padding-left: 1rem;
      box-sizing: border-box;
      color: $color-text;
    }
  }
  .new {
    width: 100%;
    display: flex;
    margin-top: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    .list {
      width: 46%;
      height: 186px;
      margin-bottom: 1rem;
      .pc-back {
        width: 100%;
        height: 130px;
        border-radius: 46%;
        background: rgba(0,0,0,0.8);
        .picUrl {
          width: 84%;
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .scrible {
        width: 100%;
        height: 51px;
        p {
          width: 100%;
          height: 31px;
          line-height: 31px;
          font-size: $font-size-medium;
          color: $color-text;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: $font-size-small;
          color: $color-text-x;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>