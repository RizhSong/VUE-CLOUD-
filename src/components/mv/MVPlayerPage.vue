<template>
  <div class="mvPlayerPage-container">
    <mv-video :mvName="mvDetail.name" :mvScr="mvDetail.brs" :duration="mvDetail.duration">123</mv-video>
    <div class="content_box">
      <div class="mv_info">
        <div class="info_title" @click="descFlag = !descFlag">
          <span>{{ mvDetail.name }}</span>
          <span
            class="artists"
            v-for="(item, index) in mvDetail.artists"
            :key="index"
          >{{ item.name}}</span>
          <van-icon name="arrow-down" class="show_content" v-show="!descFlag" />
          <van-icon name="arrow-up" class="show_content" v-show="descFlag" />
        </div>
        <p class="play_count">{{mvDetail.playCount | playCountFormat}}次观看</p>
        <p class="desc" v-show="descFlag">
          {{ mvDetail.publishTime }}发布
          <br />
          {{ mvDetail.desc }}
        </p>
        <div class="operate">
          <div class="icon_box" @click="islikeFlag = !islikeFlag">
            <span v-show="!islikeFlag" class="icon iconfont icon-dianzan2"></span>
            <transition name="iconShow">
              <span v-show="islikeFlag" :style="{color:'red'}" class="icon iconfont icon-dianzan3"></span>
            </transition>
            <span class="num">{{ mvDetail.likeCount}}</span>
          </div>
          <div class="icon_box" @click="isCollectFlag = !isCollectFlag">
            <span v-show="!isCollectFlag" class="icon iconfont icon-xiangkan"></span>
            <transition name="iconShow">
              <span
                v-show="isCollectFlag"
                :style="{color:'red'}"
                class="icon iconfont icon-yixiangkan"
              ></span>
            </transition>
            <span class="num">{{ mvDetail.subCount}}</span>
          </div>
          <div class="icon_box">
            <span class="icon iconfont icon-pinglun"></span>
            <span class="num">{{ mvDetail.commentCount}}</span>
          </div>
          <div class="icon_box">
            <span class="icon iconfont icon-share_icon"></span>
            <span class="num">{{ mvDetail.shareCount}}</span>
          </div>
        </div>
      </div>
      <div class="relatedMV_box">
        <div class="related_title">相关视频</div>
        <ul>
          <li class="related_item" v-for="(item, index) in simiMVlist" :key="index">
            <div class="cover_box">
              <img :src="item.coverUrl" alt />
              <div class="play_box">
                <van-icon name="play-circle-o" class="play_num_icon" />
                {{ item.playTime | playCountFormat}}
              </div>
            </div>
            <div class="info_right_box">
              <p class="related_mv_title">{{ item.title}}</p>
              <p>
                <span class="related_durationm">{{ item.durationms | timeFormat}}</span>
                <span class="related_userName">by {{ item.creator[0].userName}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <mv-comment :commentList="mvComment.hotComments" title="精彩评论" @func="getSubIDandName"></mv-comment>
      <mv-comment :commentList="mvComment.comments" title="最新评论" @func="getSubIDandName"></mv-comment>
    </div>
    <footer class="do_comment">
      <input
        ref="commentInput"
        class="comment_input"
        type="text"
        :placeholder="placeholderMsg"
        v-model="content"
      />
      <button class="fabiao iconfont icon-icon_send" @click.prevent="sentMessage"></button>
    </footer>
    <van-popup v-model="popupShow">
      <div class="popupShow_box">
        <p @click="doComment">回复评论</p>
        <p>分享评论</p>
        <p>复制评论</p>
        <p>举报评论</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";
import mvVideo from "../../base/mv/mvVideo.vue";
import mvComment from "../../base/mv/mvComment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      mvDetail: {},
      simiMVlist: [],
      mvComment: {},
      islikeFlag: false,
      isCollectFlag: false,
      descFlag: false,
      //------------
      popupShow: false,
      subArr: [],
      //   userName: "",
      // commentId: -1,
      //----------评论输入框
      content: "", //评论内容
      placeholderMsg: "写点什么..."
    };
  },
  created() {
    this.getMvDetail();
    this.getSimiMVlist();
    this.getMvComment();
  },
  methods: {
    getMvDetail() {
      this.$axios.get(`/mv/detail?mvid=${this.id}`).then(res => {
        if (res.data.code === 200) {
          this.mvDetail = res.data.data;
        }
      });
    },
    getSimiMVlist() {
      this.$axios.get(`/related/allvideo?id=${this.id}`).then(res => {
        if (res.data.code === 200) {
          this.simiMVlist = res.data.data;
        }
      });
    },
    getMvComment() {
      this.$axios.get(`/comment/mv?id=${this.id}`).then(res => {
        if (res.data.code === 200) {
          this.mvComment = res.data;
        }
      });
    },
    getSubIDandName(arr) {
      this.subArr = arr;
      console.log(arr);
    },
    doComment() {
      this.$refs.commentInput.focus();
      this.placeholderMsg = "回复 " + this.subArr[0];
      this.popupShow = false;
    },
    setComment(t, commentId) {
      // /comment?t=1&type=1&id=5436712&content=test
      //t 1 评论 2 回复
      this.$axios
        .get(
          `comment?t=${t}&type=1&id=${this.id}&content=${this.content}&commentId=${commentId}`
        )
        .then(res => {
          if (res.data.code === 200) {
            if (commentId) {
              console.log(res.data, commentId);
            } else {
              console.log(res.data);
              this.mvComment.comments.unshift(res.data.comment);
            }
          }
        });
    },
    sentMessage() {
      if (this.content.trim().length === 0) {
        return this.$toast({
          message: "评论不能为空",
          duration: 2000
        });
      }
      if (this.subArr.length !== 0) {
        // this.setComment(2, this.commentId);
        console.log("没写了");
      } else {
        setComment(1);
      }
      this.content = "";
      this.placeholderMsg = "写点什么...";
    }
  },
  filters: {
    playCountFormat: function(value) {
      if (value > 100000) {
        let str = value + "";
        return str.slice(0, str.length - 4) + "万";
      }
      return value;
    },
    timeFormat: function(el) {
      return moment(el).format("mm:ss");
    }
  },
  components: {
    mvVideo,
    mvComment
  }
};
</script>

<style lang="scss" scoped>
.mvPlayerPage-container {
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  padding: 0 0 52px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow-y: auto;
  .content_box {
    padding: 0 16px;
    box-sizing: border-box;
    overflow: auto;
    height: 70%;
    &::-webkit-scrollbar {
      display: none; /*隐藏滚动条*/
    }
    .mv_info {
      .info_title {
        position: relative;
        line-height: 35px;
        font-size: 16px;
        color: #000;
        font-weight: 550;
        .artists {
          color: #444;
          font-size: 14px;
        }
        .show_content {
          position: absolute;
          right: 0;
          top: 8px;
          font-size: 18px;
        }
      }
      .play_count {
        margin: 8px 0 12px;
        font-size: 12px;
        color: #666;
      }
      .desc {
        font-size: 12px;
        color: #444;
        line-height: 18px;
        letter-spacing: 1px;
      }
      .operate {
        margin-top: 18px;
        height: 40px;
        display: flex;
        padding: 0 8px;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .icon_box {
          width: 12%;
          height: 100%;
          position: relative;
          color: #444;
          .icon {
            position: absolute;
            margin-bottom: 5px;
            font-size: 24px;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          .num {
            bottom: 0;
            position: absolute;
            font-size: 12px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .iconShow-enter-active {
          animation: bounce-in 0.5s;
        }
        .iconShow-enter-active {
          // transition: all 0.3s ease;
          // transform: scaleX(5);
          animation: bounce-in 0.5s;
        }
        @keyframes bounce-in {
          0% {
            transform: translateX(-50%) scale(0);
          }
          50% {
            transform: translateX(-50%) scale(1.25);
          }
          100% {
            transform: translateX(-50%) scale(1);
          }
        }
      }
    }
    .relatedMV_box {
      border-bottom: 1px solid #ccc;
      margin-bottom: 5px;
      .related_title {
        padding: 15px 0;
      }
      .related_item {
        height: 75px;
        margin-bottom: 8px;
        display: flex;
        .cover_box {
          position: relative;
          width: 40%;
          height: 100%;
          border-radius: 8px;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
          }
          .play_box {
            padding-left: 14px;
            position: absolute;
            right: 3%;
            top: 5%;
            font-size: 8px;
            color: #fff;
            .play_num_icon {
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
            }
          }
        }
        .info_right_box {
          padding-left: 8px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .related_mv_title {
            font-size: 14px;
            color: #000;
            margin-bottom: 8px;
          }
          .related_durationm,
          .related_userName {
            color: #666;
            font-size: 12px;
            margin-right: 8px;
          }
        }
      }
    }
    .comment_box {
      margin-top: 12px;
      height: 60px;
    }
  }

  footer {
    z-index: 100;
    height: 52px;
    width: 100%;
    background-color: #f8f8f8;
    position: fixed;
    bottom: 0;
    line-height: 52px;
    .comment_input {
      margin: 0;
      margin-left: 8px;
      padding-left: 5px;
      height: 24px;
      border-radius: 15px;
      width: 82%;
      font-size: 12px;
      color: #000;
    }
    .fabiao {
      display: inline-block;
      background-color: #f8f8f8;
      border: none;
      outline: none;
      margin-left: 5px;
      height: 24px;
      // line-height: 0.8rem;
      width: 35px;
      font-size: 16px;
    }
  }
  .van-popup {
    border-radius: 12px;
  }
  .popupShow_box {
    padding: 5px 0;
    box-sizing: border-box;
    overflow: hidden;
    width: 220px;
    height: 150px;
    display: flex;
    flex-direction: column;
    p {
      flex: 1;
      padding-left: 12px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      color: #000;
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
}
</style>