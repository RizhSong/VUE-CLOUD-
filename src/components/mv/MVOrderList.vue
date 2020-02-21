<template>
  <div class="mvOrderList-container">
    <div class="head">
      <div class="back icon-fanhui1" @click.stop="$router.go(-1)"></div>
      <div class="rank">MV排行榜</div>
    </div>
    <my-swiper></my-swiper>
  </div>
</template>

<script>
import mySwiper from "./MVSwiper.vue";
export default {
  components: {
    mySwiper
  }
};
</script>

<style lang="scss" scoped>
.mvOrderList-container {
  position: fixed;
  top: 0;
  left: 0;
  padding: 64px 0 52px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 15;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
  .head {
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 88;
    display: flex;
    background: #fff;
    border-bottom: 0.5px solid #eee;
    .back {
      width: 13%;
      font-size: 18px;
      color: #333;
      line-height: 64px;
      text-align: center;
    }
    .rank {
      width: 87%;
      padding-left: 16px;
      box-sizing: border-box;
      color: #333;
      line-height: 64px;
    }
  }
}
</style>