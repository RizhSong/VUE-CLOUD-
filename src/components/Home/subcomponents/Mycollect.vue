<template>
  <div class="mycollection"> 
    <div class="head">
      <div class="top">
        <span class="back icon-fanhui1" ref="back" @click="goback"></span>
        <h3 class="title">我的收藏</h3>
        <span class="search icon-sousuo"></span>
      </div>
      <!-- vant的tab栏插件 -->
      <van-tabs animated swipeable :duration="tabs.duration" @click="getCat">
        <van-tab v-for="item in tags" :title="item" :key="item">
          <my-collection :albumList="albumList"></my-collection> 
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import myCollection from '../../../base/Home/myCollect.vue'
export default {
  data(){
    return {
      tags: ['专辑', '歌手','视频'],
      tabs: {
        duration: 0.5
      },
      // 我的专辑列表
      albumList: []
    }
  },
  created() {
    this._getCollectionAlbums()
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
    // 获取我收藏专辑的请求
    _getCollectionAlbums(){
      this.$axios.get('/album/sublist')
      .then(res => {
        if(res.status == 200) {
          this.albumList = res.data.data
        }
      })
    },
    getCat(){}
  },
  components: {
    myCollection
  } 
}
</script>

<style lang="scss" scoped>
@import "../../../common/scss/common.scss";
.mycollection {
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
        font-size: $font-size-large-s;
      }
      .title {
        width: 80%;
        line-height: 64px;
        height: 64px;
        padding-left: 1rem;
        box-sizing: border-box;
        color: $color-text;
      }
      .search {
        width: 10%;
        line-height: 56px;
        font-size: 28px;
      }
    }
  }
} 
</style>