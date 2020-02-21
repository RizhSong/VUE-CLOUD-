<template>
  <div class="daily">
    <div class="head">
      <div class="back icon-fanhui1" @click="goback"></div>
      <div class="commend" v-show="showDay">每日推荐</div>
    </div>
    <div class="backUrl">
      <div class="date">
        <span class="month">07</span>
        /
        <span class="day">11</span>
      </div>
    </div>
    <div class="content">
      <div class="contentHead" ref="Head">
        <div class="left">
          <span class="icon icon-bofang1"></span>
          <span class="play">播放全部</span>
        </div>
        <div class="right">
          <span class="slelct icon-liebiao1"></span>
          <span class="word">多选</span>
        </div>
      </div>
      <ul class="list">
        <li class="list-in" v-for="item in dailySong" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.album.picUrl" />
            <span class="icon"></span>
          </div>
          <div class="title">
            <h3 class="name" v-text="item.name"></h3>
            <span class="dis">{{item.artists[0].name}}-{{item.album.name}}</span>
          </div>
          <span class="operate icon-caozuo"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDay: true,
      backgroundUrl: "",
      dailySong: []
    };
  },
  created() {
    this._getDailySong();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 每日推荐请求
    _getDailySong() {
      this.$axios.get("/recommend/songs").then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          this.dailySong = res.data.recommend;
        }
      });
    }
  },
  mounted() {
    console.log(this.$refs.Head);
    const Head = this.$refs.Head;
    console.log(Head.style.top);
  }
};
</script>

<style lang="scss" scoped>
.daily {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19;
  overflow-y: auto;
  background: #fff;
  .head {
    width: 100%;
    height: 64px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    background: #00a4ff;
    .back {
      width: 15%;
      text-align: center;
      line-height: 64px;
      font-size: 20px;
      color: #fff;
    }
    .commend {
      width: 85%;
      line-height: 64px;
      color: #fff;
    }
  }
  .backUrl {
    width: 100%;
    height: 240px;
    background: url(../../../common/images/day.jpg) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: relative;
    .date {
      position: absolute;
      top: 60%;
      left: 5%;
      width: 40%;
      height: 20%;
      line-height: 48px;
      display: flex;
      color: #fff;
      .month {
        width: 22%;
        font-size: 24px;
        line-height: 42px;
      }
    }
  }
  .content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 210px;
    padding: 0 0 52px 0;
    background: #fff;
    border-radius: 16px 16px 0 0;
    .contentHead {
      width: 100%;
      height: 36px;
      border-radius: 16px 16px 0 0;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;
      position: sticky;
      top: 64px;
      border-bottom: 0.5px solid #eee;
      background: #fff;
      .left {
        width: 30%;
        display: flex;
        .icon {
          width: 30%;
          font-size: 18px;
          line-height: 36px;
          color: #000;
        }
        .play {
          width: 70%;
          font-size: 15px;
          color: #000;
          line-height: 36px;
        }
      }
      .right {
        width: 20%;
        display: flex;
        .slelct {
          flex: 1;
          line-height: 36px;
          text-align: center;
          color: #000;
        }
        .word {
          flex: 1;
          line-height: 36px;
          text-align: center;
          color: #000;
          font-size: 15px;
        }
      }
    }
    .list {
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      margin-top: 10px;
      .list-in {
        width: 100%;
        height: 46px;
        display: flex;
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        .picUrl {
          width: 14%;
          border-radius: 6px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          width: 76%;
          padding-left: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            line-height: 32px;
            font-size: 15px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .dis {
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .operate {
          width: 10%;
          font-size: 18px;
          line-height: 46px;
          text-align: right;
        }
      }
    }
  }
}
</style>