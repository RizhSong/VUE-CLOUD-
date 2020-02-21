<template>
  <div class="anchor">
    <div class="tf-rank">
      <div class="top">24小时榜</div>
      <ul class="list">
        <li class="list-in" v-for="item in fastRank" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.picUrl" alt />
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 新人榜 -->
    <div class="tf-rank">
      <div class="top">新人榜</div>
      <ul class="list">
        <li class="list-in" v-for="item in newRank" :key="item.id">
          <div class="picUrl">
            <img v-lazy="item.picUrl" alt />
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 最热主播 -->
    <div class="wrap">
      <div class="head">最热主播</div>
      <ul class="list">
        <li class="list-in" v-for="(item,index) in anchor" :key="item.id">
          <span class="num">{{index + 1}}</span>
          <span class="avator">
            <img v-lazy="item.picUrl" alt="">
          </span>
          <span class="name">{{item.name}}</span>
          <span class="hot">{{item.score}}万</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    anchor: Array,
    fastRank: Array,
    newRank: Array
  }
};
</script>

<style lang="scss" scoped>
.anchor {
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
  .wrap {
    width: 100%;
    .head {
      width: 100%;
      height: 36px;
      line-height: 36px;
      color: #000;
    }
    .list {
      width: 100%;
      .list-in {
        width: 100%;
        height: 42px;
        margin-bottom: 16px;
        display: flex;
        .num {
          width: 10%;
          font-size: 18px;
          color: #000;
          font-weight: bold;
          line-height: 42px;
        }
        .avator {
          width: 13%;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          width: 60%;
          line-height: 42px;
          color: #333;
          font-size: 14px;
          padding-left: 12px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hot {
          line-height: 42px;
          font-size:13px;
        }
      }
    }
  }
}
</style>