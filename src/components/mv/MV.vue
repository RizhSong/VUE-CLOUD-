<template>
  <div class="mv-container">
    <mv-list :list="personalizedList" to="/MVchoice" msg1="MV推荐" msg2="更多MV"></mv-list>
    <div class="top_mv_box">
      <div class="title" @click="$router.push('/MVorderList')">
        <h3 class="personalized_mv">
          排行榜
          <van-icon class="icon" name="arrow" />
        </h3>
        <div class="top_pic">
          <span class="updata_time">更新时间:{{topMvInfo.updataTime | dataFormat}}</span>
          <div class="img_box">
            <img :src="topMvInfo.firstCover" alt />
          </div>
        </div>
      </div>
    </div>
    <mv-list :list="MoreMvList" to="/MVclassify" msg1="更多精彩MV" msg2="MV分类" :cover="true"></mv-list>
  </div>
</template>

<script>
import moment from "moment";
import mvList from "../../base/mv/mvList.vue";
export default {
  data() {
    return {
      personalizedList: [],
      MoreMvList: [], //25条差不多了
      topMvInfo: {}
    };
  },
  filters: {
    dataFormat: function(el) {
      return moment(el).format("MM月DD日");
    }
  },
  components: {
    mvList
  },
  created() {
    this.getPersonalizedList();
    this.getMoreMvList();
    this.getTopMvInfo();
  },
  methods: {
    getPersonalizedList() {
      this.$axios
        .get("/personalized/mv")
        .then(res => {
          if (res.data.code == 200) {
            this.personalizedList = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTopMvInfo() {
      this.$axios
        .get("/top/mv?limit=1")
        .then(res => {
          if (res.data.code == 200) {
            this.topMvInfo.undataTime = res.data.updateTime;
            this.topMvInfo.firstCover = res.data.data[0].cover;
            this.$forceUpdate();
          }
        })
        .catch(err => {
          console.log(err);
          return null;
        });
    },
    getMoreMvList() {
      this.$axios
        .get("/mv/all")
        .then(res => {
          if (res.data.code == 200) {
            this.MoreMvList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          return null;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";

.mv-container {
  .title {
    border-top: 1px solid #ccc;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .personalized_mv {
      color: #000;
      padding-right: 20px;
      position: relative;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      .icon {
        color: #444;
        position: absolute;
        right: 0;
        top: 12%;
      }
    }
    .top_pic {
      height: 80%;
      // width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .img_box {
        border-radius: 5px;
        overflow: hidden;
        height: 100%;
        width: 120px;
        background-color: #fff;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .updata_time {
        font-size: 12px;
      }
    }
    .more {
      border-radius: 20px;
      border: 1px solid #ccc;
      color: #444;
      padding: 0 5px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>