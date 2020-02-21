<template>
  <div class="radioList">
    <div class="head">
      <div class="back icon-fanhui1" @click="goback"></div>
      <div class="name">电台</div>
      <div class="share icon-fenxiang2"></div>
    </div>
    <div class="picUrl" :style="`background:url(${banners[4].pic})`">
      <div class="author">
        <div class="name">
          <h3 class="nickname">老汉本人</h3>
          <span class="num">33.7万人订阅</span>
        </div>
        <span class="sign">订阅</span>
      </div>
    </div>
    <div class="wrap">
      <div class="top">
        <van-tabs>
          <van-tab title="标签 1">内容 1</van-tab>
          <van-tab title="标签 2">
            <radiolist></radiolist>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import radiolist from '../../../base/Found/radiolist.vue'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["banners"])
  },
  created() {
  },
  methods: {
    goback(){
      this.$router.go(-1)
    }
  },
  components: {
    radiolist,
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/scss/common.scss";
.radioList {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 13;
  width: 100%;
  height: 100%;
  .head {
    width: 100%;
    height: 4.2rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    color: #fff;
    .back {
      width: 12%;
      text-align: center;
      line-height: 4.2rem;
      font-size: 20px;
    }
    .name {
      width: 70%;
      text-align: left;
      line-height: 4.2rem;
      padding-left: 1rem;
      box-sizing: border-box;
    }
    .share {
      width: 18%;
      text-align: center;
      line-height: 4.2rem;
    }
  }
  .picUrl {
    width: 100%;
    height: 310px;
    position: relative;
    .author {
      width: 100%;
      height: 46px;
      padding-right: 24px;
      box-sizing: border-box;
      position: absolute;
      bottom: 12%;
      left: 0;
      display: flex;
      justify-content: space-between;
      .name {
        padding-left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .nickname {
          line-height: 26px;
          color: #fff;
        }
        .num {
          line-height: 20px;
          font-size: 12px;
          color: #fff;
        }
      }
      .sign {
        width: 22%;
        height: 32px;
        border-radius: 12px;
        background: #333;
        margin-top: 10px;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .wrap {
    width: 100%;
    height: 382px;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    background: #fff;
    .top {
      width: 100%;
      height: 36px;
      background: #fff;
    }
  }
}
</style>