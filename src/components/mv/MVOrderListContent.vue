<template>
  <div class="mvOrderListContent-container">
    <div class="more_mv_box">
      <h3 class="updateTime">更新时间 :{{ Obj.updateTime | dataFormat }}</h3>
      <ul class="more_mv_ul">
        <li class="mv_item" v-for="(item, index) in Obj.data" :key="index">
          <div class="player_cover_box" @click="toMVPlayerPage(item.id)">
            <div class="play_num">
              <van-icon name="play-circle-o" class="van-icon" />623万
            </div>
            <img v-lazy="item.cover" alt />
          </div>
          <div class="info_box">
            <div class="info_left">{{ index + 1 }}</div>
            <div class="info_right">
              <P class="info_title">{{ item.name }}</P>
              <P class="info_speak">{{ item.artistName }}</P>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  methods: {
    toMVPlayerPage(id) {
      this.$router.push({
        name: "MVplayerPage",
        params: {
          id
        }
      });
    }
  },
  props: {
    Obj: Object
  },
  filters: {
    dataFormat: function(el) {
      return moment(el).format("MM月DD日");
    },
    playCountFormat: function(value) {
      if (value > 100000) {
        let str = value + "";
        return str.slice(0, str.length - 4) + "万";
      }
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
.mvOrderListContent-container {
  padding: 0 5px;
  box-sizing: border-box;
  .more_mv_box {
    .updateTime {
      font-weight: 550;
      line-height: 30px;
    }
    .more_mv_ul {
      .mv_item {
        height: 240px;
        margin-bottom: 10px;
        .player_cover_box {
          overflow: hidden;
          border-radius: 8px;
          height: 70%;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .play_num {
            position: absolute;
            right: 2%;
            top: 2%;
            font-size: 14px;
            color: #fff;
            padding: 2px 4px 2px 16px;
            .van-icon {
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
            }
          }
        }
        .info_box {
          height: 30%;
          display: flex;
          .info_left {
            width: 15%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 30px;
            color: rgb(238, 28, 28);
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          .info_right {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .info_title {
              line-height: 25px;
              font-size: 16px;
              color: #000;
              font-weight: 550;
            }
            .info_speak {
              line-height: 25px;
              font-size: 12px;
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>
