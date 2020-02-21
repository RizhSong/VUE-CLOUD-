<template>
  <div class="albumDetail">
    <span class="back icon-fanhui1" @click="goback"></span>
    <div class="head">
      <span class="name">专辑</span>
      <span class="icon-aliweimingmingwenjianjia_sousuo icon"></span>
    </div>
    <div class="cover" ref="cover">
      <div class="cover-in">
        <div class="picUrl">
          <img v-lazy="blurPicUrl" />
        </div>
        <div class="title">
          <div class="creator">
            <h3>{{name}}</h3>
            <a href>
              <span class="singer">歌手:</span>
              <span class="name">{{ artist.name }}</span>
            </a>
          </div>
          <p class="scrible">{{ description }}</p>
        </div>
      </div>
      <div class="operate">
        <span class="comment">
          <span class="icon-pinglun icon"></span>
          <span class="count">{{info.commentCount}}</span>
        </span>
        <span class="share">
          <span class="icon-fenxiang2 icon"></span>
          <span class="count">{{info.shareCount}}</span>
        </span>
        <span class="collect">
          <span class="icon-shoucang icon"></span>
          <span class="count">207</span>
        </span>
      </div>
    </div>
    <!-- 列表 -->
    <list :tracks="songs"></list>
  </div>
</template>

<script>
import List from '../../../base/List.vue'
export default {
  data(){
    return {
      name: '',
      artist: {},
      blurPicUrl: '',
      description: '',
      info: {},
      songs: []
    }
  },
  created() {
    this._getAlbumDetail(this.$route.params.id)  
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 请求获得专辑内容
    _getAlbumDetail(id){
      this.$axios.get('/album?id='+id).then(res => {
        if(res.status == 200) {
          const {album,songs} = res.data
          const {name,artist,blurPicUrl,description,info} = album
          this.songs = songs
          this.name = name
          this.artist = artist
          this.blurPicUrl = blurPicUrl
          this.description = description
          this.info = info
        }
      })
    }
  },
  components: {
    List
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/scss/common.scss";
.albumDetail {
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
            .singer {
              height: 30px;
              line-height: 30px;
              font-size: $font-size-small;
            }
            .name {
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
}
</style>