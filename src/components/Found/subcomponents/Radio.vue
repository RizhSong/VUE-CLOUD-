<template>
  <div class="Radio">
    <div class="head">
      <div class="back icon-fanhui1" @click="goback"></div>
      <div class="name">电台</div>
    </div>
    <!-- 轮播图 -->
    <swiper :swiperSlides="radioBanner"></swiper>
    <div class="myTab">
      <router-link to="/radio/radioRank" class="rank">
        <span class="icon icon-paihang"></span>
        <span class="name">电台排行</span>
      </router-link>
      <div class="hot">
        <span class="icon icon-remen"></span>
        <span class="name">热门电台</span>
      </div>
    </div>
    <!-- 电台推荐 -->
    <div class="r-Wrap">
      <div class="recommend">
        <span class="rname">电台推荐</span>
        <span class="select" @click="selectOther">换一换</span>
      </div>
      <ul class="list">
        <li class="list-in" v-for="item in selectRecommend" :key="item.createTime">
          <div class="picUrl">
            <img v-lazy="item.picUrl" alt />
          </div>
          <p class="dis">{{item.rcmdtext}}</p>
        </li>
      </ul>
    </div>
    <!-- 创作翻唱 -->
    <div class="c-Wrap">
      <div class="resong">
        <span class="rname" @click="toHotRadio">创作|翻唱</span>
        <span class="select">播放全部</span>
      </div>
      <ul class="list">
        <li class="list-in" v-for="item in djRadios" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.picUrl">
          </div>
          <div class="title">
            <h3 class="name" v-text="item.lastProgramName"></h3>
            <div class="author">
              <span class="avator">
                <img v-lazy="item.dj.avatarUrl">
              </span>
              <span class="dis" v-text="item.name"></span>
              |
              <span class="hot">{{item.subCount}}万</span>
            </div>
          </div>
          <span class="icon icon-bofang1"></span>
        </li>
      </ul>
    </div>
    <!-- 情感调频 -->
    <div class="c-Wrap">
      <div class="resong">
        <span class="rname">情感调频</span>
        <span class="select">播放全部</span>
      </div>
      <ul class="list">
        <li class="list-in" v-for="item in emotion" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.picUrl">
          </div>
          <div class="title">
            <h3 class="name">{{item.rcmdtext}}</h3>
            <div class="author">
              <span class="avator">
                <img v-lazy="item.dj.avatarUrl">
              </span>
              <span class="dis">{{item.dj.nickname}}</span>
              |
              <span class="hot">{{item.subCount}}万</span>
            </div>
          </div>
          <span class="icon icon-bofang1"></span>
        </li>
      </ul>
    </div>
    <!-- 音乐故事 -->
    <div class="c-Wrap">
      <div class="resong">
        <span class="rname">音乐故事</span>
        <span class="select">播放全部</span>
      </div>
      <ul class="list">
        <li class="list-in" v-for="item in djStory" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.picUrl">
          </div>
          <div class="title">
            <h3 class="name">{{item.rcmdtext}}</h3>
            <div class="author">
              <span class="avator">
                <img v-lazy="item.dj.avatarUrl" alt />
              </span>
              <span class="dis">{{item.dj.nickname}}</span>
              |
              <span class="hot">{{item.subCount}}万</span>
            </div>
          </div>
          <span class="icon icon-bofang1"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import swiper from "../../../base/swiper.vue";
export default {
  data() {
    return {
      radioBanner: [],
      djCommend: [],
      selectRecommend: [],
      djRadios: [],
      emotion: [],
      djStory: []
    };
  },
  created() {
    this._getRadioBanner();
    this._getRadioCommend();
    this._getCreate();
    // this._getRadioType();
    this._getEmotion();
    this._getStory();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 电台轮播图数据
    _getRadioBanner() {
      this.$axios.get("/dj/banner").then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          this.radioBanner = res.data.data;
        }
      });
    },
    // 电台推荐
    _getRadioCommend(){
      this.$axios.get('/dj/recommend')
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          this.djCommend = res.data.djRadios
          this.dealDjRecommend(res.data.djRadios)
        }
      })
    },
    // 创作、翻唱的请求
    _getCreate(){
      this.$axios.get('/dj/recommend/type?type=2001')
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          this.djRadios = res.data.djRadios
        }
      })
    },
    //情感调频请求
    // _getRadioType(){
    //   this.$axios.get('/dj/catelist')
    //   .then(res => {
    //     if(res.status == 200) {
    //       // console.log(res.data)
    //     }
    //   })
    // },
    _getEmotion(){
      this.$axios.get('/dj/recommend/type?type=3')
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          this.emotion = res.data.djRadios
        }
      })
    },
    _getStory(){
      this.$axios.get('/dj/recommend/type?type=2')
      .then(res => {
        if(res.status == 200) {
          this.djStory = res.data.djRadios
          // console.log(this.djStory)
        }
      })
    },
    // 情感调频
    toHotRadio(){
      this.$router.push({path: '/radio/create'})
    },
    // 换一换
    selectOther(){
      this.dealDjRecommend(this.djCommend)
    },
    // 电台推荐处理
    dealDjRecommend(dj){
      let selectRecommend = dj.map((item,index) => {
        let num = Math.floor(Math.random() * dj.length)
        if(num > dj.length - 3) {
          num = num - 2
        }
        return dj.slice(num,num+3)
      })
      let index = Math.floor(Math.random() * selectRecommend.length)
      this.selectRecommend = selectRecommend[index]
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/scss/common.scss";
.Radio {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 13;
  overflow-y: auto;
  padding: 64px 16px 52px;
  box-sizing: border-box;
  background: #fff;
  .head {
    width: 100%;
    height: 4.2rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 19;
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
  .myTab {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 56px;
    display: flex;
    text-align: center;
    box-shadow: 0 0 2px rgba(0,0,0,0.4);
    border-radius: 8px;
    background-image: linear-gradient(#00a4ff, #2ddae8);
    .rank {
      flex: 1;
      display: flex;
      flex-direction: column;
      .icon {
        line-height: 36px;
        color: #eee;
      }
      .name {
        line-height: 20px;
        font-size: 14px;
        color: #eee;
      }
    }
    .hot {
      flex: 1;
      display: flex;
      flex-direction: column;
      .icon {
        line-height: 36px;
        color: #eee;
      }
      .name {
        line-height: 20px;
        font-size: 14px;
        color: #eee;
      }
    }
  }
  .r-Wrap {
    width: 100%;
    .recommend {
      height: 36px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      .rname {
        color: #000;
      }
      .select {
        font-size: 14px;
        color: #333;
      }
    }
    .list {
      width: 100%;
      box-shadow: 0 0 2px rgba(0,0,0,0.4);
      border-radius: 8px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      .list-in {
        width: 31%;
        height: 141px;
        margin-right: 3.5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .picUrl {
          width: 100%;
          height: 109px;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .dis {
          line-height: 16px;
          font-size: 12px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
  .c-Wrap {
    width: 100%;
    margin-bottom: 16px;
    .resong {
      height: 36px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      .rname {
        color: #000;
      }
      .select {
        font-size: 14px;
        color: #333;
      }
    }
    .list {
      width: 100%;
      .list-in {
        width: 100%;
        height: 46px;
        margin-bottom: 16px;
        display: flex;
        .picUrl {
          width: 14%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          width: 77%;
          padding-left: 12px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .author {
            height: 18px;
            line-height: 18px;
            display: flex;
            .avator {
              width: 7%;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .dis {
              padding: 0 12px;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .hot {
              font-size: 12px;
              padding: 0 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .icon {
          width: 10%;
          font-size: 20px;
          line-height: 46px;
          text-align: center;
        }
      }
    }
  }
}
</style>