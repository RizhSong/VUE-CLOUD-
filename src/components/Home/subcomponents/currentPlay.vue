<template>
  <div class="currentplay">
    <div class="headWrap">
      <div class="head">
        <span class="back icon-fanhui1" @click="goback"></span>
        <div class="txt">最近播放</div>
        <span class="clear">清空</span>
      </div>
      <div class="searchTab">
        <van-tabs
          animated
          background="#fff"
          color="#000"
          line-height="2px"
          line-width="32px"
          title-inactive-color="#333"
          title-active-color="#000"
          :swipeable="flag"
          :duration="num"
        >
          <van-tab :title="'歌曲'">
            <latelist :tracks=historyPlay></latelist>
          </van-tab>
          <van-tab :title="'歌单'">
            <current-list></current-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import latelist from '../../../base/Home/latelist.vue'
import currentList from '../../../base/Home/currentList.vue'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      num: 0.5,
      flag: true,
    }
  },
  computed: {
    ...mapGetters(['historyPlay'])
  },
  methods: {
    goback(){
      this.$router.go(-1)
    }
  },
  components: {
    latelist,
    currentList
  }  
}
</script>

<style lang="scss">
@import "../../../common/scss/common.scss";
.currentplay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 13;
  overflow-y: auto;
  padding: 0 1rem;
  box-sizing: border-box;
  background: #fff;
  .headWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .head {
      height: 36px;
      background: #fff;
      display: flex;
      .back,
      .singer {
        width: 13%;
        text-align: center;
        line-height: 36px;
        color: #333;
      }
      .back {
        font-size: 16px;
      }
      .clear {
        font-size: 14px;
        line-height: 36px;
      }
      .txt {
        width: 74%;
        color: #333;
        font-size: 15px;
        line-height: 36px;
      }
    }
    .searchTab {
      .van-tabs--line .van-tabs__wrap {
        height: 36px;
      }
    }
  }
} 
</style>