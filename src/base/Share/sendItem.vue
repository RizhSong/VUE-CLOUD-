<template>
  <div class="sendWrap">
    <div class="my-operate" v-show="false"></div>
    <div class="content">
      <ul class="my-info">
        <li class="list" v-for="item in events" :key="item.id">
          <div class="head">
            <div class="avator">
              <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="name">
              <h3 class="nickname">{{item.user.nickname}}</h3>
              <p class="time">19分钟前</p>
            </div>
          </div>
          <p class="title">{{JSON.parse(item.json).msg}}</p>
          <div class="picUrl" v-if="true">
            <img src="https://p2.music.126.net/zsrf_Qy1b5c0mn5y3EllkA==/109951164325562564.jpg" alt />
          </div>
          <div class="v-box" v-else>
            <div class="video"></div>
          </div>
          <div class="operate">
            <span class="share icon-fenxiang2"></span>
            <span class="dis" v-text="item.forwardCount?item.forwardCount:'转发'">转发</span>
            <span class="comment icon-pinglun"></span>
            <span class="dis" v-text="item.info.commentCount"></span>
            <span class="like icon-zan"></span>
            <span class="dis" v-text="item.info.likedCount"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
      lasttime: -1
    };
  },
  created() {
    this._getUserShare()
  },
  methods: {
    _getUserShare() {
      this.$axios.get('/event',{
        params: {
          pagesize: 30
        }
      })
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          this.events = res.data.event
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.sendWrap {
  width: 100%;
  .my-operate {
    width: 100%;
    height: 70px;
    border-bottom: 0.5px solid #eee;
  }
  .content {
    width: 100%;
    padding: 16px 0;
    box-sizing: border-box;
    .my-info {
      width: 100%;
      .list {
        width: 100%;
        margin-top: 16px;
        border-bottom: 0.5px solid #eee;
        .head {
          height: 46px;
          display: flex;
          align-items: center;
          .avator {
            width: 13%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            background: pink;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            padding-left: 2%;
            box-sizing: border-box;
            width: 85%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .nickname {
              height: 26px;
              line-height: 26px;
              color: #00a4ff;
            }
            .time {
              height: 20px;
              line-height: 15px;
              font-size: 12px;
            }
          }
        }
        .title {
          padding-left: 13%;
          padding-top: 12px;
          line-height: 20px;
          box-sizing: border-box;
          font-size: 15px;
          color: #000;
        }
        .picUrl {
          padding-left: 13%;
          padding-top: 6px;
          width: 40%;
          height: 172px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .v-box {
          width: 100%;
          padding-left: 13%;
          padding-top: 6px;
          box-sizing: border-box;
          height: 120px;
          .video {
            width: 100%;
            height: 100%;
          }
        }
        .operate {
          width: 100%;
          height: 36px;
          padding-left: 13%;
          margin-bottom: 10px;
          box-sizing: border-box;
          display: flex;
          .share,
          .comment,
          .like {
            font-size: 16px;
            line-height: 36px;
          }
          .dis {
            width: 20%;
            padding-left: 6px;
            font-size: 12px;
            line-height: 36px;
          }
        }
      }
    }
  }
}
</style>