<template>
  <div class="hotCommentsWall">
    <div class="headWrap">
      <div class="head">
        <div class="top">
          <span class="back icon-fanhui1" @click="goback"></span>
          <h3 class="title">热评墙</h3>
        </div>
      </div>
    </div>

    <van-swipe @change="onChange" v-if="list.length>0">
      <van-swipe-item v-for="item in list" :key="item.id">
        <div class="cover">
          <div class="content">
            <div class="case middle">
              <span class="imgCase">
                <img :src="item.simpleUserInfo.avatar" />
              </span>
              <div class="guanzhu">
                <van-icon name="plus" />
                <span>关注</span>
              </div>
              <div class="idName middle">{{item.simpleUserInfo.nickname}}</div>
            </div>
          </div>

          <div class="main_box">
            <van-icon name="fire-o" size="35px" color="#ccc" />
            <div class="comment">{{item.content}}</div>
            <div class="song">
              <span
                class="songName"
              >{{item.simpleResourceInfo.name}}-{{item.simpleResourceInfo.artists[0].name}}</span>
              <span class="like middle" @click="getheart">
                <van-icon v-if="heart" name="like-o" size="18px" class="middle" />
                <van-icon v-if="!heart" name="like" size="18px" class="middle" color="red" />
              </span>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator"></div>
    </van-swipe>

    <div class="view">
      <ul v-if="list1.length>0">
        <li class="barrage middle" v-for="item in list1" :key="item.id">
          <div class="case middle">
            <span class="imgCase">
              <img :src="item.user.avatarUrl" />
            </span>
            <div class="pinglun">
              <span>{{item.content}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <van-row type="flex" justify="space-around">
        <van-col span="12">
          <van-cell-group :border="false">
            <van-field placeholder="说点什么吧~" size="25px" />
          </van-cell-group>
        </van-col>

        <van-col span="2">
          <span class="middle">
            <van-icon
              name="chat-o"
              size="20px"
              :info="num1"
              is-link
              @click="showPopup"
              :border="false"
            />
            <van-popup
              v-model="show"
              position="bottom"
              round
              :style="{ height: '80%'}"
              v-if="list.length>0"
            >
              <van-cell-group>
                <van-cell title="回复(22)" />

                <van-cell>
                  <template slot="title">
                    <span class="custom-title">
                      <span class="imgCase"></span>
                    </span>
                  </template>
                  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                  <van-icon slot="right-icon" name="good-job-o" style="line-height: inherit;" />
                </van-cell>
              </van-cell-group>
            </van-popup>
          </span>
        </van-col>

        <van-col span="2">
          <span class="middle" @click="dianzan(index,list[index].likedCount)" v-if="list.length>0">
            <van-icon v-if="good" name="good-job-o" size="20px" :info="num" />
            <van-icon v-if="!good" name="good-job" size="20px" color="red" :info="num" />
          </span>
        </van-col>
        <van-col span="2">
          <span class="middle">
            <van-icon name="share" size="20px" />
          </span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      list: [],
      list1: [],
      heart: true,
      good: true,
      num: "1",
      num1: "1",
      show: false,
      index: 0,
      list_a: [],
      show_box: false
    };
  },
  created() {
    this._getHotCommentWall();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getheart() {
      this.heart = !this.heart;
    },
    onChange(index) {
      this.getComment(this.list[index].simpleResourceInfo.songId);
      this.index = index;
      console.log(this.list[index]);

      this.num = this.list[index].likedCount;
      this.num1 = this.list[index].replyCount;
    },
    dianzan(e, num) {
      this.num = num;
      console.log(this.list_a);
      this.good = !this.good;
      if (this.list_a[e]) {
        this.num += 1;
        this.list_a[e] = false;
      } else {
        this.num = this.num - 1;
        this.list_a[e] = true;
      }
    },
    showPopup() {
      this.show = true;
      this.num1 = num1;
    },
    _getHotCommentWall() {
      this.$axios.get("/comment/hotwall/list").then(res => {
        if (res.status == 200) {
          this.list = res.data.data;
          this.show_box = true;
          this.list.forEach(ele => {
            this.list_a.push(true);
          });
          // this.getComment(res.data.data[0].id);
        }
      });
    },
    getComment(id) {
      this.$axios.get(`/comment/music?id=${id}`).then(res => {
        if (res.data.code === 200) {
          this.list1 = res.data.comments;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/scss/common.scss";

.hotCommentsWall {
  position: fixed;
  top: 0;
  left: 0;
  padding: 64px 16px 52px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-image: linear-gradient(#0b136d, #4f5ad6, #0b136d);

  .headWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    .back {
      width: 10%;
      text-align: center;
      height: 64px;
      line-height: 64px;
      color: white;
      font-size: $font-size-large-s;
    }
    .head {
      width: 100%;
      height: 102px;
      position: fixed;
      top: 0;
      left: 0;
      .top {
        width: 100%;
        height: 64px;
        display: flex;

        .title {
          width: 90%;
          line-height: 64px;
          height: 64px;
          padding-left: 1rem;
          box-sizing: border-box;
          color: white;
        }
      }
    }
  }
  .cover {
    // background-color: red;
    position: relative;
    width: 100%;
    height: 450px;
    .content {
      width: 100%;
      position: absolute;
      height: 60px;
      .case {
        height: 35px;
        border-radius: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
        color: white;
        display: flex;
        flex-wrap: nowrap;
        font-size: 15px;
      }

      .imgCase {
        flex: 1;
        width: 35px;
        height: 35px;
      }

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .idName {
        text-align: left;
        margin: 10px 10px;
        flex: 10;
        height: 20px;
        // display: none;
      }
      .class {
        // position: flex;
        width: 110px;
        height: 35px;
        border-radius: 15px;
        background-color: #41468a;
        margin-top: 20px;
        margin-bottom: 20px;
        color: white;
        display: flex;
        // flex-direction: column;
        flex-wrap: nowrap;
        display: none;
      }
      .guanzhu {
        text-align: left;
        margin: auto 10px;
        flex: 10;
        display: none;
      }
    }
  }

  .main_box {
    z-index: 120;
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 400px;

    .comment {
      margin-top: 10px;
      font-size: 16px;
      color: white;
      line-height: 40px;
    }
    .song {
      margin: 15px 0;
      font-size: 14px;
      color: #bbb;

      .songName {
        max-width: 300px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;

        .like {
          width: 14px;
          height: 14px;
          margin-left: 20px;
          .middle {
            vertical-align: middle;
          }
        }
      }
    }
  }

  .view {
    display: flex;
    width: 100%;
    height: 100px;
    margin: 10px 0;
    position: absolute;
    bottom: 9%;
    left: 16px;
    overflow: hidden;

    .barrage {
      display: flex;
      width: 100%;
      height: 40px;
      position: relative;
      margin-bottom: 10px;
      animation: danmu 6s ease infinite;

      .case {
        height: 40px;
        border-radius: 25px;
        width: auto;
        color: white;
        background-color: #232a77;
        font-size: 15px;
        position: absolute;
        top: 0px;
        left: 0px;
      }

      .imgCase {
        // flex: 1;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 5px;
        left: 3px;
      }

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .pinglun {
        text-align: left;
        // flex: 10;
        height: 40px;
        line-height: 40px;
        max-width: 290px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        margin-left: 40px;
        margin-right: 15px;
      }
    }
  }

  .footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #333975;

    .van-cell {
      background-color: #333975;
      color: white;
    }
    // .van-field {
    //   border:1px solid  333975;
    // }
    .middle {
      height: 50px;
      line-height: 50px;
    }
    .van-popup--bottom {
      z-index: 122;
      background-color: #272c61;
    }
  }
}

@keyframes danmu {
  from {
    bottom: 100%;
    transform: translateY(0);
  }
  to {
    top: 0;
    transform: translateY(-100%);
  }
}
</style>