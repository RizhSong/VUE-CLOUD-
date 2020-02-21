<template>
  <div class="myradio">
    <div class="head">
      <div class="back icon-fanhui1" @click="goback"></div>
      <div class="rank">我的电台</div>
    </div>
    <div class="wrap" v-show="!loading">
      <div class="top">我订阅的电台</div>
      <ul class="list">
        <li class="list-in" v-for="item in djRadios" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.picUrl" />
          </div>
          <div class="title">
            <h3 class="name" v-text="item.name"></h3>
            <span class="nickname">by {{item.dj.nickname}}</span>
            <span class="dis">{{item.rcmdtext ? item.rcmdtext : '秋天走了，冬天来了'}}</span>
          </div>
        </li>
      </ul>
    </div>
    <van-loading size="24px" vertical color="#00B7F8" v-show="loading">加载中...</van-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      djRadios: [],
      loading: true
    };
  },
  computed: {
    ...mapGetters(["accountId"])
  },
  created() {
    if (this.accountId || localStorage.getItem("accountId")) {
      this._getmyradio();
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 获取我的电台的请求
    _getmyradio(id) {
      this.$axios
        .get("/dj/hot", {
          params: {
            limit: 10
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.djRadios = res.data.djRadios;
            this.loading = false;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.myradio {
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
  .wrap {
    width: 100%;
    .top {
      width: 100%;
      height: 36px;
      color: #000;
      font-size: 15px;
      font-weight: bold;
      line-height: 36px;
    }
    .list {
      width: 100%;
      .list-in {
        width: 100%;
        height: 64px;
        display: flex;
        margin-bottom: 16px;
        .picUrl {
          width: 19%;
          border-radius: 8px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          width: 76%;
          padding: 0 12px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          .name {
            height: 28px;
            line-height: 28px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .nickname {
            height: 14px;
            line-height: 14px;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .dis {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .van-loading__text {
    color: #00b7f8;
  }
}
</style>