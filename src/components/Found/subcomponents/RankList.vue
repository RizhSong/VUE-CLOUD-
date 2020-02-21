<template>
  <div class="RankList">
    <div class="head">
      <div class="back icon-fanhui1" @click="goback"></div>
      <div class="rank">排行榜</div>
    </div>
    <div class="content" v-show="!loading">
      <div class="top1">
        <h3 class="name">巅峰榜</h3>
        <ul class="list">
          <li class="list-in" v-for="item in topList" :key="item.id" @click="goSongList(item.id)">
            <div class="rank">
              <p class="title" v-text="item.name"></p>
              <div class="toplist" v-for="(item,index) in item.trackArr" :key="index">
                <span class="num">
                  <span class="top">{{index+1}}.</span>
                  <span class="sname">
                    {{item.name}} -
                    <i>{{item.ar[0].name}}</i>
                  </span>
                </span>
              </div>
            </div>
            <div class="picUrl">
              <img v-lazy="item.coverImgUrl" :alt="item.name" />
              <div class="mask">
                <span class="update" v-text="item.updateFrequency"></span>
                <span class="count">
                  <span class="icon"></span>
                  <div class="down">
                    <span class="total">1940万</span>
                    <span class="play icon-bofang"></span>
                  </div>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="top2">
        <h3 class="name">推荐榜</h3>
        <ul class="list">
          <li class="list-in" v-for="item in localList" :key="item.id" @click="goSongList(item.id)">
            <div class="picUrl">
              <img v-lazy="item.coverImgUrl" />
              <div class="mask">
                <span class="update" v-text="item.updateFrequency"></span>
                <span class="count">
                  <span class="icon"></span>
                  <div class="down">
                    <span class="total">1940万</span>
                    <span class="play icon-bofang"></span>
                  </div>
                </span>
              </div>
            </div>
            <div class="words" v-text="item.name"></div>
          </li>
        </ul>
      </div>
      <div class="top2">
        <h3 class="name">特色榜</h3>
        <ul class="list">
          <li
            class="list-in"
            v-for="item in specialList"
            :key="item.id"
            @click="goSongList(item.id)"
          >
            <div class="picUrl">
              <img v-lazy="item.coverImgUrl" :alt="item.name" />
              <div class="mask">
                <span class="update" v-text="item.updateFrequency"></span>
                <span class="count">
                  <span class="icon"></span>
                  <div class="down">
                    <span class="total">1940万</span>
                    <span class="play icon-bofang"></span>
                  </div>
                </span>
              </div>
            </div>
            <div class="words" v-text="item.name"></div>
          </li>
        </ul>
      </div>
      <div class="top2">
        <h3 class="name">全球榜</h3>
        <ul class="list">
          <li
            class="list-in"
            v-for="item in globalList"
            :key="item.id"
            @click="goSongList(item.id)"
          >
            <div class="picUrl">
              <img v-lazy="item.coverImgUrl" :alt="item.name" />
              <div class="mask">
                <span class="update" v-text="item.updateFrequency"></span>
                <span class="count">
                  <span class="icon"></span>
                  <div class="down">
                    <span class="total">1940万</span>
                    <span class="play icon-bofang"></span>
                  </div>
                </span>
              </div>
            </div>
            <div class="words" v-text="item.name"></div>
          </li>
        </ul>
      </div>
    </div>
    <van-loading size="24px" vertical color="#00B7F8" v-show="loading">加载中...</van-loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ranks: [],
      topList: [],
      localList: [],
      specialList: [],
      globalList: [],
      loading: true
    };
  },
  created() {
    this._getRanks();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 请求榜单数据
    _getRanks() {
      this.$axios.get("/toplist/detail").then(res => {
        if (res.status == 200) {
          this.ranks = res.data.list;
          this.dealRanks(this.ranks);
        }
      });
    },
    // 请求榜单详情
    _getRankdetail(id) {
      this.$axios.get("/playlist/detail?id=" + id).then(res => {
        if (res.status == 200) {
          let trackArr = [];
          res.data.playlist.tracks.forEach((item, index) => {
            if (index < 3) {
              trackArr.push(item);
            }
          });
          this.topList.forEach((item, index) => {
            if (item.id == id) {
              item.trackArr = trackArr;
            }
          });
        }
        this.$forceUpdate();
        this.loading = false;
      });
    },
    // 处理榜单的函数
    dealRanks(ranks) {
      ranks.forEach((item, index) => {
        if (index < 7) {
          this.topList.push(item);
        } else if (index < 13) {
          this.localList.push(item);
        } else if (index < 19) {
          this.specialList.push(item);
        } else {
          this.globalList.push(item);
        }
      });
      this.sendThreeSong(this.topList);
    },
    // 把前三首歌传递给前面的榜单
    sendThreeSong(topList) {
      // console.log(topList)
      topList.forEach((item, index) => {
        this._getRankdetail(item.id);
      });
    },
    // 去歌单界面
    goSongList(id) {
      this.$router.push({ name: "songlist", params: { id: id } });
    }
  }
};
</script>

<style lang="scss">
.RankList {
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
    background-image: linear-gradient(#2ddae8,#00a4ff);
    border-bottom: 0.5px solid #eee;
    .back {
      width: 13%;
      font-size: 20px;
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
  .content {
    width: 100%;
    .top1 {
      width: 100%;
      .name {
        width: 100%;
        height: 42px;
        line-height: 42px;
        color: #2ddae8;
      }
      .list {
        width: 100%;
        .list-in {
          width: 100%;
          height: 112px;
          background: #fff;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          .rank {
            width: 67%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 0 10px;
            box-sizing: border-box;
            .title {
              height: 28px;
              line-height: 28px;
              color: #2ddae8;
              font-size: 15px;
            }
            .toplist {
              height: 84px;
              display: flex;
              flex-direction: column;
              .num {
                flex: 1;
                display: flex;
                .top {
                  width: 10%;
                  line-height: 28px;
                  font-size: 13px;
                }
                .sname {
                  width: 90%;
                  line-height: 28px;
                  font-size: 13px;
                  color: #333;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  i {
                    font-style: normal;
                    color: #666;
                  }
                }
              }
            }
          }
          .picUrl {
            width: 33%;
            background: pink;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .mask {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .update {
                height: 28px;
                text-align: right;
                font-size: 12px;
                margin-right: 10px;
                line-height: 28px;
                color: #eee;
              }
              .down {
                height: 32px;
                margin-bottom: 4px;
                display: flex;
                color: #eee;
                .total {
                  width: 70%;
                  line-height: 32px;
                  font-size: 12px;
                  padding-left: 10px;
                  box-sizing: border-box;
                }
                .play {
                  font-size: 20px;
                  line-height: 32px;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .top2 {
      width: 100%;
      .name {
        width: 100%;
        height: 42px;
        line-height: 42px;
        color: #2ddae8;
      }
      .list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        .list-in {
          width: 32%;
          height: 134px;
          margin-right: 2%;
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .picUrl {
            width: 100%;
            height: 106px;
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
            .mask {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .update {
                height: 28px;
                text-align: right;
                font-size: 12px;
                margin-right: 10px;
                line-height: 28px;
                color: #eee;
              }
              .down {
                height: 32px;
                margin-bottom: 4px;
                display: flex;
                color: #eee;
                .total {
                  width: 70%;
                  line-height: 32px;
                  font-size: 12px;
                  padding-left: 10px;
                  box-sizing: border-box;
                }
                .play {
                  font-size: 20px;
                  line-height: 32px;
                  color: #fff;
                }
              }
            }
          }
          .words {
            height: 28px;
            font-size: 12px;
            line-height: 28px;
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