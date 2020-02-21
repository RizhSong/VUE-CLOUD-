<template>
  <div class="mvChoice-container">
    <div class="head">
      <div class="back icon-fanhui1" @click.stop="$router.go(-1)"></div>
      <div class="rank">MV精选</div>
    </div>
    <mv-list :list="exclusiveList" msg1="网易出品" :show="false" :cover="true"></mv-list>
    <mv-list :list="inlandList" msg1="内地" :show="false" :cover="true"></mv-list>
    <mv-list :list="outlandList" msg1="港台" :show="false" :cover="true"></mv-list>
    <mv-list :list="europeList" msg1="欧美" :show="false" :cover="true"></mv-list>
    <mv-list :list="japanList" msg1="日本" :show="false" :cover="true"></mv-list>
    <mv-list :list="koreaList" msg1="韩国" :show="false" :cover="true"></mv-list>
  </div>
</template>

<script>
import mvList from "../../base/mv/mvList.vue";
export default {
  data() {
    return {
      exclusiveList: [],
      inlandList: [],
      outlandList: [],
      europeList: [],
      japanList:[],
      koreaList:[]
    };
  },
  created() {
    this.getExclusive();
    this.getList();
  },
  methods: {
    getExclusive() {
      this.$axios
        .get("/mv/exclusive/rcmd?limit=2")
        .then(res => {
          if (res.data.code == 200) {
            this.exclusiveList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      this.getChoiceList("内地").then(res => {
        this.inlandList = res;
      });
      this.getChoiceList("港台").then(res => {
        this.outlandList = res;
      });
      this.getChoiceList("欧美").then(res => {
        this.europeList = res;
      });
      this.getChoiceList("日本").then(res => {
        this.japanList = res;
      });
      this.getChoiceList("韩国").then(res => {
        this.koreaList = res;
      });
    },
    getChoiceList(params) {
      let that = this;
      return new Promise(function(resolve, reject) {
        that.$axios
          .get(`/mv/first?area=${params}&limit=4`)
          .then(res => {
            if (res.data.code == 200) {
              resolve(res.data.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // /mv/first?area=内地&limit=10
    goback() {
      this.$router.push('/mv')
    }
  },
  components: {
    mvList
  }
};
</script>

<style lang="scss" scoped>
.mvChoice-container {
  position: fixed;
  top: 0;
  left: 0;
  padding: 64px 16px 52px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 15;
  overflow-y: auto;
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