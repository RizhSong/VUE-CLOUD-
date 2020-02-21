<template>
  <div class="mvClassify-container">
    <div class="head">
      <div class="back icon-fanhui1" @click.stop="$router.go(-1)"></div>
      <div class="rank">MV分类</div>
    </div>
    <div class="popup_box" v-show="popuBoxShow">
      <div class="popup_box_bg" @click.stop="popupShow = false"></div>
      <transition name="popup" v-on:after-leave="popupAfterLeave">
        <div class="popup_content_box" v-show="popupShow" @click.stop>
          <div class="classify_item">
            <p class="item_title">地区</p>
            <div class="item_content">
              <span
                :class="{'slectColor':index == areaNum}"
                v-for="(item, index) in areaList"
                :key="index"
                @click="changTypeNum(index,1)"
              >{{ item }}</span>
            </div>
          </div>
          <div class="classify_item">
            <p class="item_title">类型</p>
            <div class="item_content">
              <span
                :class="{'slectColor':index == typeNum}"
                v-for="(item, index) in typeList"
                :key="index"
                @click="changTypeNum(index,2)"
              >{{ item }}</span>
            </div>
          </div>
          <div class="classify_item">
            <p class="item_title">排序</p>
            <div class="item_content">
              <span
                :class="{'slectColor':index == orderNum}"
                v-for="(item, index) in orderList"
                :key="index"
                @click="changTypeNum(index,3)"
              >{{ item }}</span>
            </div>
          </div>
          <div class="close" @click="complete">完成</div>
        </div>
      </transition>
    </div>
    <div class="personalized_mv_box">
      <div class="title_box">
        <h3
          class="personalized_mv"
        >{{ areaList[titleList[0]] }} • {{ typeList[titleList[1]] }} • {{orderList[titleList[2]]}}</h3>
        <span class="click_box" @click="popBoxShow">筛选</span>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul class="list_ul">
          <li
            class="list_item"
            v-for="(item, index) in MVlist"
            :key="index"
            @click.stop="toMVPlayerPage(item.id)"
          >
            <div class="cover_box">
              <!-- <img :src="item.cover" /> -->
              <img v-lazy="item.cover" />
            </div>
            <div class="bofang_num">
              <van-icon name="play-circle-o" />
              <span>{{ item.playCount | playCountFormat }}</span>
            </div>
            <p class="bofang_name">{{ item.name }}</p>
            <p class="duration">{{ item.duration | timeFormat }}</p>
            <p class="title">{{ item.artistName }}</p>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      popupShow: false,
      popuBoxShow: false,
      MVlist: [],
      loading: false,
      finished: false,
      limit: 30,
      offset: 0,
      areaList: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      typeList: ["全部", "官方版", "原声", "现场版", "网易出品"],
      orderList: ["上升最快", "最热", "最新"],
      areaNum: 0,
      typeNum: 0,
      orderNum: 0,
      titleList: [0, 0, 0]
    };
  },
  methods: {
    toMVPlayerPage(id) {
      this.$router.push({
        name: "MVplayerPage",
        params: {
          id
        }
      });
    },
    getMVlist() {
      this.$axios
        .get("/mv/all", {
          params: {
            area: this.areaList[this.titleList[0]],
            type: this.typeList[this.titleList[1]],
            order: this.orderList[this.titleList[2]],
            limit: this.limit,
            offset: this.offset
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            let Data = res.data.data;
            this.MVlist = [...this.MVlist, ...Data];
            this.offset = this.offset + this.limit;
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (Data.length < this.limit) {
              this.finished = true;
            }
          }
        });
    },
    onLoad() {
      //异步更新数据
      setTimeout(() => {
        // 异步更新数据
        this.getMVlist();
      }, 500);
    },
    popBoxShow() {
      this.popupShow = true;
      this.popuBoxShow = true;
    },
    complete() {
      //就这样吧 为了实现一个小东西 多加了许多乱七八糟的东西
      this.popupShow = false;
      if (
        this.titleList[0] == this.areaNum &&
        this.titleList[1] == this.typeNum &&
        this.titleList[2] == this.orderNum
      ) {
        return;
      }
      this.titleList[0] = this.areaNum;
      this.titleList[1] = this.typeNum;
      this.titleList[2] = this.orderNum;
      console.log(this.titleList);

      this.offset = 0;
      this.MVlist = [];
      this.getMVlist();
    },
    changTypeNum(index, num) {
      if (num === 1) {
        this.areaNum = index;
        return;
      }
      if (num === 2) {
        this.typeNum = index;
        return;
      }
      if (num === 3) {
        this.orderNum = index;
        return;
      }
    },
    popupAfterLeave: function(el) {
      if (this.popupShow === false) {
        this.popuBoxShow = false;
      }
    },
    goback() {
      this.$router.push("/mv");
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
  }
};
</script>

<style lang="scss" scoped>
.popup_box {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  .popup_box_bg {
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .popup_content_box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
// popup进出动画
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}
.popup-enter,
.popup-leave-to {
  transform: translateY(-100%);
}

.mvClassify-container {
  position: fixed;
  top: 0;
  left: 0;
  padding: 64px 16px 52px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 15;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
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
  .classify_item {
    height: 75px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .item_title {
      font-size: 8px;
      color: #666;
    }
    .item_content {
      margin-top: 10px;
      color: #000;
      font-size: 16px;
      span {
        padding: 2px;
        margin-left: 15px;
      }
      .slectColor {
        color: red;
      }
    }
  }
  .close {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-top: 1px solid #c4c4c4;
  }
  .personalized_mv_box {
    .title_box {
      border-top: 1px solid #ccc;
      width: 92%;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      z-index: 10;
      top: 64px;
      background-color: #fff;
      .click_box {
        display: inline-block;
        text-align: center;
        width: 12%;
        line-height: 25px;
      }
      .personalized_mv {
        color: #000;
        padding-right: 20px;
        position: relative;
        font-weight: 520;
        font-size: 16px;
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
    .list_ul {
      padding: 50px 10px 10px;
      // height: 300px;
      // overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .list_item {
        position: relative;
        margin-top: 10px;
        width: 150px;
        height: 120px;
        .cover_box {
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
          height: 80%;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .bofang {
          // z-index: 9;
          position: absolute;
          left: 5%;
          bottom: 25%;
          font-size: 0.75rem;
          color: #fff;
        }
        .bofang_name {
          position: absolute;
          left: 2%;
          bottom: 25%;
          font-size: 0.65rem;
          color: #fff;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bofang_num {
          position: absolute;
          right: 5%;
          top: 2%;
          line-height: 20px;
          color: #fff;
          font-size: 14px;
        }
        .duration {
          position: absolute;
          top: 5%;
          left: 2%;
          font-size: 8px;
          color: #fff;
        }
        .title {
          line-height: 1.2;
          width: 100%;
          height: 20%;
          font-size: 0.55rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>