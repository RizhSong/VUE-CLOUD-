<template>
  <div class="personalized_mv_box">
    <div class="title_box">
      <h3 class="personalized_mv">{{ msg1 }}</h3>
      <router-link :to="to" v-if="show" class="more" tag="span">{{ msg2 }}</router-link>
    </div>
    <ul class="list_ul">
      <li
        class="list_item"
        v-for="(item, index) in list"
        :key="index"
        @click.stop="toMVPlayerPage(item.id)"
      >
        <div class="cover_box">
          <img v-if="cover" :src="item.cover" />
          <img v-else :src="item.picUrl" />
        </div>
        <div class="bofang_num">
          <van-icon name="play-circle-o" />
          <span>{{ item.playCount | playCountFormat }}</span>
        </div>
        <p class="bofang_name">{{ item.name }}</p>
        <p class="title">{{ item.artistName }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
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
    msg1: {
      type: String
    },
    msg2: {
      type: String
    },
    to: {
      type: String,
      default: "/"
    },
    show: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  filters: {
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
.title_box {
  border-top: 1px solid #ccc;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .personalized_mv {
    color: #000;
    padding-right: 20px;
    position: relative;
    font-weight: 600;
    font-size: 18px;
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
.personalized_mv_box {
  .list_ul {
    padding: 0 10px 10px;
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
</style>