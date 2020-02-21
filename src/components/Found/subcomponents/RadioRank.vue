<template>
  <div class="RadioRank">
    <div class="Top">
      <div class="head">
        <div class="back icon-fanhui1" @click="goback"></div>
        <div class="name">主播节目排行榜</div>
      </div>
      <van-tabs>
        <van-tab title="主播榜">
          <anchor :anchor=anchor :fastRank=fastRank :newRank=newRank></anchor>
        </van-tab>
        <van-tab title="节目榜">
          <program :radioShow=radioShow></program>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import anchor from '../../../base/Found/anchor.vue'
import program from '../../../base/Found/program.vue'
export default {
  data(){
    return {
      anchor: [],
      fastRank: [],
      newRank: [],
      radioShow: []
    }
  },
  created() {
    this._getRadioShow()
    this._getFastRank()
    this._getNewRank()
    this._getShowRank()
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 电台主播榜
    _getRadioShow(){
      this.$axios.get('/dj/toplist/popular')
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          this.anchor = res.data.toplist
        }
      })
    },
    // 24小时榜
    _getFastRank(){
      this.$axios.get('/dj/toplist/hours?limit=3')
      .then(res => {
        if(res.status == 200) {
          this.fastRank = res.data.toplist
        }
      })
    },
    // 新人主播榜
    _getNewRank(){
      this.$axios.get('/dj/toplist/newcomer?limit=3')
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          this.newRank = res.data.toplist
        }
      })
    },
    // 节目榜
    _getShowRank(){
      this.$axios.get('/dj/program/toplist')
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          this.radioShow = res.data.toplist
        }
      })
    }
  },
  components: {
    anchor,
    program
  }
};
</script>

<style lang="scss" scoped>
.RadioRank {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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