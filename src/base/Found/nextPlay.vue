<template>
  <div class="nextPlay" v-show="showNext">
    <div class="content">
      <div class="top">
        <div class="picUrl">
          <img src alt />
        </div>
        <div class="title">
          <h3 class="name">歌曲：去年夏天</h3>
          <span class="arname">王大毛</span>
        </div>
      </div>
      <div>下一首播放</div>
      <div>评论</div>
      <div>歌手</div>
      <div>专辑</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showNext: false
    }
  },
  methods: {
    show(){
      this.showNext = true
    },
    hide(){
      this.showNext = false
    }
  },
};
</script>

<style lang="scss" scoped>
.nextPlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  .content {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 300px;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    border-radius: 16px 16px 0 0;
    background: #fff;
    .top {
      width: 100%;
      height: 64px;
      padding: 10px 0;
      box-sizing: border-box;
      border-bottom: 0.5px solid #eee;
      display: flex;
      .picUrl {
        width: 13%;
        border-radius: 12px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        width: 85%;
        padding: 0 2%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          line-height: 24px;
          color: #333;
        }
        .arname {
          font-size: 12px;
          line-height: 20px;
        } 
      }
    }
  }
}
</style>