<template>
  <div class="searchWord">
    <div class="headWrap">
      <div class="head">
        <span class="back icon-fanhui1" @click="goback"></span>
        <input
          type="text"
          class="txt"
          :placeholder="defaultKeyWord.showKeyword"
          v-model="keyWords"
          @input="_getSuggest(keyWords)"
          v-focus
        />
        <span class="singer"></span>
      </div>
      <div class="searchTab" v-show="showTab">
        <van-tabs
          animated
          background="#fff"
          color="#000"
          line-height="2px"
          line-width="32px"
          title-inactive-color="#333"
          title-active-color="#000"
          :swipeable="flag"
          :duration="num"
          @click="receiveType"
        >
          <van-tab v-for="(item,index) in searchList" :title="item.type" :key="index">
            <search-tabresult
              :songs="songs"
              :albums="albums"
              :arts="arts"
              :playlists="playlists"
              :tabType="type"
              ref="Lists"
            ></search-tabresult>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 历史记录 热搜榜 -->
    <div class="his-wrap" v-show="showContent">
      <div class="history">
        <div class="word">历史记录</div>
        <div class="del icon-shanchu" @click="delHistory"></div>
      </div>
      <div class="smalltags">
        <span class="tags" v-for="item in savekeywords" :key="item" v-text="item"></span>
      </div>
      <div class="hot">
        <h3 class="hotword">热搜榜</h3>
        <ul class="list">
          <li
            class="list-in"
            v-for="(item,index) in hotKeyWord"
            :key="index"
            @click="sendKeyRequest(item.searchWord)"
          >
            <span class="rank" v-text="index+1"></span>
            <div class="title">
              <h3 class="name" v-text="item.searchWord"></h3>
              <span class="dis" v-text="item.content"></span>
            </div>
            <span class="num" v-text="item.score"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索时显示的卡片 -->
    <search-card :inputKey="keyWords" :resultKey="searchKeyResult" ref="card" @Card="Card"></search-card>
    <!-- 是否删除历史记录提示 -->
    <div class="message" v-show="messageBox" @click="closeBox">
      <div class="box">
        <p class="title">确定要清空全部历史记录?</p>
        <div class="select">
          <span class="cancel" @click="cancel">取消</span>
          <span class="sure" @click="empty">清空</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchCard from "../base/searchCard.vue";
import searchTabresult from "../base/searchTabresult.vue";
export default {
  data() {
    return {
      // tab栏的类型
      searchList: [
        {
          id: 1,
          type: "单曲"
        },
        {
          id: 10,
          type: "专辑"
        },
        {
          id: 100,
          type: "歌手"
        },
        {
          id: 1000,
          type: "歌单"
        },
        {
          id: 1002,
          type: "用户"
        },
        {
          id: 1004,
          type: "MV"
        },
        {
          id: 1009,
          type: "电台"
        },
        {
          id: 1014,
          type: "视频"
        }
      ],
      // 关键的搜索类型 默认单曲1
      type: 1,
      keyWords: "",
      num: 0.5,
      flag: true,
      // tab栏的展示与隐藏
      showTab: false,
      showContent: true,
      // 消息盒子的显示
      messageBox: false,
      // 热搜词
      hotKeyWord: [],
      // 搜索建议的搜索结果
      searchKeyResult: [],
      // 默认关键字
      defaultKeyWord: {
        realkeyword: "",
        showKeyword: ""
      },
      // 保存关键字到本地 作历史记录
      savekeywords: [],
      // 单曲搜索结果
      songs: [],
      // 专辑搜索结果
      albums: [],
      // 歌手搜索结果
      arts: [],
      // 歌单搜索结果
      playlists: [],
      // 用户搜索结果
      users: [],
      // MV搜索结果
      vlog: [],
      // 电台搜索结果
      radios: [],
      // 视频搜索结果
      videos: []
    };
  },
  watch: {
    keyWords(newVal) {
      return newVal;
    },
    searchKeyResult(newVal) {
      return newVal;
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  created() {
    this._getHotSearchWord();
    this._getDefault();
    this.receiveSaveKeywords();
  },
  methods: {
    goback() {
      if (!this.showTab) {
        this.$router.go(-1);
        return;
      }
      this.showTab = false;
      this.keyWords = "";
    },
    // 输入关键词搜索
    getSearchInfo(key, type) {
      this.$axios.get(`/search?keywords=${key}&type=${type}`).then(res => {
        if (res.status == 200) {
          if (type == 1) {
            this.songs = res.data.result.songs;
          } else if (type == 10) {
            this.albums = res.data.result.albums;
          } else if (type == 100) {
            this.arts = res.data.result.artists;
          } else if (type == 1000) {
            this.playlists = res.data.result.playlists;
          } else if (type == 1002) {
          } else if (type == 1004) {
          } else if (type == 1009) {
          } else if (type == 1014) {
          }
          // 保存关键字
          this.savekeywords.unshift(key);
          this.saveKeywords();
          // 展示tab栏
          this.showTab = true;
          // 显示搜索结果的列表
          this.$refs.Lists[0].display();
        }
      });
    },
    // 搜索建议请求
    _getSuggest(key) {
      this.$axios
        .get(`/search/suggest?keywords=${key || "朱艳"}&type=mobile`)
        .then(res => {
          if (res.status == 200) {
            // console.log(res.data)
            // card显示
            this.showCard();
            // 显示搜索建议的结果
            this.searchKeyResult = res.data.result.allMatch;
          }
        });
    },
    // 热搜榜的请求
    _getHotSearchWord() {
      this.$axios.get("/search/hot/detail").then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          this.hotKeyWord = res.data.data;
        }
      });
    },
    // 默认搜索关键字
    _getDefault() {
      this.$axios.get("/search/default").then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          const { realkeyword, showKeyword } = res.data.data;
          this.defaultKeyWord = { realkeyword, showKeyword };
        }
      });
    },
    // 保存关键字
    saveKeywords() {
      // 去除重复的关键字
      this.savekeywords = this.savekeywords.reduce((all, item) => {
        if (!all.includes(item)) {
          all.push(item);
        }
        return all;
      }, []);
      localStorage.setItem("keywords", JSON.stringify(this.savekeywords));
    },
    // 从本地得到关键字
    receiveSaveKeywords() {
      this.savekeywords = JSON.parse(localStorage.getItem("keywords")) || [];
    },
    // 点击热榜发送关键字搜索请求
    sendKeyRequest(key) {
      this.keyWords = key;
      this.getSearchInfo(key, this.type);
    },
    // 卡片的显示方法
    showCard() {
      this.$refs.card.show();
    },
    // 得到tab栏的类型
    receiveType(index, title) {
      // 找到点击处的值type 单曲为1
      const search = this.searchList.find(item => item.type == title);
      this.type = search.id;
      // 发起搜索请求
      this.getSearchInfo(this.keyWords, this.type);
    },
    // 接收card传过来的li的值
    Card(key) {
      this.keyWords = key;
      // 调用搜索关键字的请求
      this.getSearchInfo(key, this.type);
      // 隐藏历史记录和热搜榜的内容
      this.showContent = false;
    },
    // 弹出消息提示
    delHistory() {
      this.messageBox = true;
    },
    closeBox() {
      this.messageBox = false;
    },
    cancel() {
      this.messageBox = false;
    },
    empty() {
      this.savekeywords = [];
      localStorage.removeItem("keywords");
    }
  },
  components: {
    searchCard,
    searchTabresult
  }
};
</script>

<style lang="scss">
.searchWord {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 13;
  overflow-y: auto;
  padding: 0 1rem;
  box-sizing: border-box;
  background: #fff;
  .headWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .head {
      height: 36px;
      background: #fff;
      display: flex;
      .back,
      .singer {
        width: 13%;
        text-align: center;
        line-height: 36px;
        color: #333;
      }
      .back {
        font-size: 20px;
      }
      .singer {
        font-size: 24px;
      }
      .txt {
        width: 74%;
        box-sizing: border-box;
        border-bottom: 1px solid #333;
        color: #333;
        font-size: 15px;
        &::-webkit-input-placeholder {
          color: #2ddae8;
          font-size: 16px;
        }
        &:-moz-placeholder {
          color: #2ddae8;
          font-size: 16px;
        }
        &:-ms-input-placeholder {
          color: #2ddae8;
          font-size: 16px;
        }
      }
    }
    .searchTab {
      .van-tabs--line .van-tabs__wrap {
        height: 36px;
      }
    }
  }
  .his-wrap {
    width: 100%;
    margin-top: 64px;
    .history {
      width: 100%;
      height: 28px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .word {
        color: #000;
        line-height: 28px;
      }
      .del {
        font-size: 18px;
        line-height: 28px;
      }
    }
    .smalltags {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .tags {
        font-size: 14px;
        color: #333;
        padding: 2px 5px;
        background: #eee;
        margin-right: 6px;
        border-radius: 6px;
        margin-bottom: 6px;
      }
    }
    .hot {
      width: 100%;
      margin-top: 21px;
      .hotword {
        height: 28px;
        line-height: 28px;
        color: #000;
      }
      .list {
        width: 100%;
        margin-top: 10px;
        .list-in {
          width: 100%;
          height: 36px;
          margin-bottom: 16px;
          display: flex;
          .rank {
            width: 10%;
            padding-left: 8px;
            box-sizing: border-box;
            line-height: 36px;
            color: #333;
            font-size: 14px;
          }
          .title {
            width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .name {
              color: #333;
              font-size: 15px;
              line-height: 24px;
            }
            .dis {
              font-size: 12px;
            }
          }
          .num {
            width: 20%;
            font-size: 12px;
            line-height: 32px;
            text-align: center;
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
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
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