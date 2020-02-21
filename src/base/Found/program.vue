<template>
  <div class="program">
    <div class="tf-rank">
      <div class="top">24小时榜</div>
      <ul class="list">
        <li class="list-in" v-for="item in showRank" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.program.coverUrl" alt />
          </div>
          <p>{{item.program.description}}</p>
        </li>
      </ul>
    </div>
    <div class="c-Wrap">
      <div class="resong">
        <span class="rname">最热节目</span>
      </div>
      <ul class="list">
        <li
          class="list-in"
          v-for="(item,index) in radioShow"
          :key="index"
        >
          <div class="num">{{index+1}}</div>
          <div class="picUrl">
            <img v-lazy="item.program.coverUrl" alt />
          </div>
          <div class="title">
            <h3 class="name">{{item.program.name}}</h3>
            <div class="author">
              <span class="avator">
                <img v-lazy="item.program.dj.avatarUrl" alt />
              </span>
              <span class="dis">{{item.program.dj.nickname}}</span>
              |
              <span class="hot">{{item.program.likedCount}}万</span>
            </div>
          </div>
          <span class="icon icon-bofang1"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRank: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.dealRadioShow();
    });
  },
  props: {
    radioShow: Array
  },
  methods: {
    // radioShow数组处理
    dealRadioShow() {
      this.showRank = this.radioShow.filter((item, index) => {
        if (index < 3) {
          return true;
        }
        return false;
      });
      // console.log(this.showRank)
    },
    playRadio(id) {
    },
  }
};
</script>

<style lang="scss" scoped>
.program {
  width: 100%;
  height: 501px;
  overflow-y: auto;
  padding: 12px 16px 0;
  box-sizing: border-box;
  .tf-rank {
    width: 100%;
    padding-bottom: 16px;
    .top {
      width: 100%;
      height: 36px;
      line-height: 36px;
      color: #000;
    }
    .list {
      width: 100%;
      display: flex;
      .list-in {
        width: 30%;
        height: 133px;
        margin-right: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .picUrl {
          width: 100%;
          height: 101px;
          border-radius: 16px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          font-size: 12px;
          line-height: 16px;
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
        .num {
          width: 10%;
          line-height: 46px;
          font-size: 18px;
          font-weight: bold;
        }
        .picUrl {
          width: 14%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          width: 67%;
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