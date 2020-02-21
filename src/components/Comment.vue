<template>
  <div class="comment">
    <!-- 头部 -->
    <div class="head">
      <span class="back icon-fanhui1" @click="goback"></span>
      <div class="title">
        <h3>评论({{total}})</h3>
      </div>
      <span class="share icon-fenxiang"></span>
    </div>
    <div class="wrap">
      <div class="singer" @click="playMusic">
        <div class="picUrl">
          <img :src="songs.al.picUrl" alt />
        </div>
        <div class="title">
          <h3 class="name" v-text="songs.name"></h3>
          <p class="arname" v-text="songs.ar[0].name"></p>
        </div>
      </div>
      <div class="content">
        <div class="good">
          <h4 class="hot">精彩评论</h4>
          <ul class="list">
            <li class="list-in" v-for="(item,index) in hotComments" :key="index">
              <div class="top">
                <div class="pic">
                  <img :src="item.user.avatarUrl" alt />
                </div>
                <div class="title">
                  <span class="nick" v-text="item.user.nickname"></span>
                  <span class="time">2015年1月1日</span>
                </div>
                <div class="num">{{likeCount(item.likedCount)}}</div>
                <div class="icon icon-zan"></div>
              </div>
              <div class="word" v-text="item.content"></div>
              <div class="review">31条回复</div>
            </li>
          </ul>
          <div class="box">
            <div class="all" @click="getaAllHot">全部精彩评论</div>
          </div>
        </div>
        <div class="new">
          <h4 class="hot">最新评论</h4>
          <ul class="list">
            <li class="list-in" v-for="item in comments" :key="item.time">
              <div class="top">
                <div class="pic">
                  <img :src="item.user.avatarUrl" alt />
                </div>
                <div class="title">
                  <span class="nick" v-text="item.user.nickname"></span>
                  <span class="time">2015年1月1日</span>
                </div>
                <div class="num">{{likeCount(item.likedCount)}}</div>
                <div class="icon icon-zan"></div>
              </div>
              <div class="word" v-text="item.content"></div>
              <div class="review">31条回复</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 播放音乐提示 -->
    <div class="message" v-show="messageBox" @click="closeBox">
      <div class="box" @click.stop>
        <p class="title">{{`开始播放《${songs.name}》?`}}</p>
        <div class="select">
          <span class="cancel" @click="cancel">取消</span>
          <span class="sure" @click="empty">播放</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      total: 0,
      limit: 30,
      offset: 0,
      comments: [],
      hotComments: [],
      messageBox: false
    };
  },
  computed: {
    ...mapGetters(['isplay','songs'])
  },
  created() {
    this._getComment(this.id,this.offset,this.limit)
  },
  methods: {
    goback() {
      this.$router.go(-1);
      this.updateFullScreen(true);
    },
    // 获取歌曲评论的请求
    _getComment(id,offset,limit){
      this.$axios.get('/comment/music',{
        params: {
         id: id,
         limit: limit,
         offset: offset
        }
      })
      .then(res => {
        if(res.status == 200) {
          // console.log(res.data)
          const {hotComments,comments} = res.data
          // const [cuser,ctime,clikeCount,cpendant] = comments
          // const [huser,htime,hlikeCount,hpendant] = hotComments
          this.total = res.data.total
          this.comments = comments
          this.hotComments = hotComments
        }
      })
    },
    getaAllHot(){
      this._getComment(this.id,this.offset,this.limit + 20)
    },
    playMusic(){
      if(!this.isplay) {
        this.messageBox = true 
      } else {
        this.goback()
      }
    },
    closeBox(){
      this.messageBox = false
    },
    cancel(){
      this.messageBox = false
    },
    empty(){
      this.updatePlaying(true)
      this.messageBox = false
      this.goback()
    },
    // 格式化评论时间
    format(time){
      
    },
    // 格式化点赞数量
    likeCount(count){
      if(count > 10000) {
        let count1 = count / 10000
        count = count1.toFixed(1)
        return count = count + '万'
      }
      return count
    },
    ...mapMutations(["updateFullScreen","updatePlaying"])
  }
};
</script>

<style lang="scss" scoped>
.comment {
  position: fixed;
  left: 0;
  top: 0;
  padding: 51.2px 16px 52px;
  box-sizing: border-box;
  z-index: 14;
  width: 100%;
  height: 100%;
  overflow-y: auto; 
  .head {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    height: 3.2rem;
    display: flex;
    background: #00a4ff;
    .back {
      width: 12%;
      text-align: center;
      line-height: 3.2rem;
      font-size: 20px;
    }
    .title {
      width: 86%;
      padding: 0 6px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h3 {
        height: 32px;
        line-height: 32px;
        color: #000;
      }
    }
    .share {
      width: 12%;
      text-align: center;
      line-height: 3rem;
      font-size: 22px;
    }
  }
  .wrap {
    width: 100%;
    .singer {
      width: 100%;
      height: 56px;
      margin-top: 10px;
      display: flex;
      .picUrl {
        width: 18%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        width: 82%;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .name {
          height: 32px;
          line-height: 32px;
          font-size: 15px;
          color: #000;
        }
        .arname {
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          color: #00a4ff;
        }
      }
    }
    .content {
      width: 100%;
      margin-top: 10px;
      .good {
        width: 100%;
        .hot {
          width: 100%;
          height: 28px;
          line-height: 28px;
          color: #000;
          font-size: 15px;
          font-weight: bold;
        }
        .list {
          width: 100%;
          .list-in {
            width: 100%;
            display: flex;
            flex-direction: column;
            border-bottom: 0.5px solid #eee;
            margin-bottom: 10px;
            &:last-child {
              border: 0;
            }
            .top {
              width: 100%;
              height: 28px;
              display: flex;
              .pic {
                width: 9%;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .title {
                width: 65%;
                padding-left: 10px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .nick {
                  width: 100%;
                  font-size: 13px;
                }
                .time {
                  font-size: 12px;
                }
              }
              .num {
                width: 15%;
                font-size: 12px;
                line-height: 28px;
                text-align: right;
                padding-right: 6px;
                box-sizing: border-box;
              }
              .icon {
                width: 11%;
                font-size: 18px;
                line-height: 28px;
              }
            }
            .word {
              width: 100%;
              padding-left: 9%;
              padding-right: 6%;
              padding-top: 16px;
              padding-bottom: 12px;
              box-sizing: border-box;
              font-size: 14px;
              color: #000;
            }
            .review {
              width: 100%;
              line-height: 24px;
              padding-left: 9%;
              box-sizing: border-box;
              font-size: 13px;
              color: #00a4ff;
            }
          }
        }
        .box {
          display: flex;
          justify-content: center;
          border-bottom: 0.5px solid #eee;
          .all {
            height: 32px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            width: 30%;
            border: 1px solid #eee;
            border-radius: 10px;
            margin-bottom: 10px;
          }
        }
      }
      .new {
        width: 100%;
        .hot {
          width: 100%;
          height: 28px;
          line-height: 28px;
          color: #000;
          font-size: 15px;
          font-weight: bold;
        }
        .list {
          width: 100%;
          .list-in {
            width: 100%;
            display: flex;
            flex-direction: column;
            border-bottom: 0.5px solid #eee;
            margin-bottom: 10px;
            .top {
              width: 100%;
              height: 28px;
              display: flex;
              .pic {
                width: 9%;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .title {
                width: 65%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .nick {
                  width: 100%;
                  font-size: 13px;
                }
                .time {
                  font-size: 12px;
                }
              }
              .num {
                width: 15%;
                font-size: 12px;
                line-height: 28px;
                text-align: right;
                padding-right: 6px;
                box-sizing: border-box;
              }
              .icon {
                width: 11%;
                font-size: 18px;
                line-height: 28px;
              }
            }
            .word {
              width: 100%;
              padding-left: 9%;
              padding-right: 6%;
              padding-top: 16px;
              padding-bottom: 12px;
              box-sizing: border-box;
              font-size: 14px;
              color: #000;
            }
            .review {
              width: 100%;
              line-height: 24px;
              padding-left: 9%;
              box-sizing: border-box;
              font-size: 13px;
              color: #00a4ff;
            }
          }
        }
      }
    }
  }
  .message {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .box{
      width: 80%;
      height: 20%;
      background: #fff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
        line-height: 400%;
        padding-left: 16px;
        font-size: 14px;
      }
      .select {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .cancel,
        .sure {
          width: 20%;
          line-height: 400%;
          font-size: 15px;
          color: #000;
        }
      }
    }
  }
}
</style>