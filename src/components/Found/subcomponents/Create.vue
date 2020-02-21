<template>
  <div class="create">
    <div class="Top">
      <div class="head">
        <div class="back icon-fanhui1" @click="goback"></div>
        <div class="name">创作|翻唱</div>
      </div>
      <van-tabs>
        <van-tab title="主播榜">
        </van-tab>
        <van-tab title="节目榜">
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  created() {
  },
  methods: {
    goback(){
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="scss" scoped>
.create {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  background: #fff;
  .top {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .head {
    width: 100%;
    height: 4.2rem;
    display: flex;
    background: #fff;
    .back {
      width: 12%;
      line-height: 4.2rem;
      text-align: center;
      font-size: 20px;
    }
    .name {
      width: 88%;
      line-height: 4.2rem;
      padding-left: 1rem;
      box-sizing: border-box;
    }
  }
}
</style>