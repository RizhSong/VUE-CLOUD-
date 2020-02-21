<template>
  <div class="comment-container">
    <div class="comment_title">{{ title }}</div>
    <div
      :class="['comment_item_box',{comment_item_bgc:bgcIdx === index}]"
      v-for="(item, index) in commentList"
      :key="index"
      @touchstart="commentStart(index)"
      @touchmove="bgcIdx = -1"
      @click="showCommentControl(index,item.user.nickname,item.commentId)"
    >
      <div class="user_info">
        <div class="cover">
          <img v-lazy="item.user.avatarUrl" alt />
        </div>
        <div class="name_time">
          <p class="user_name">
            {{ item.user.nickname }}
            <span></span>
          </p>
          <p class="comment_time">{{ item.time | dataFormat}}</p>
        </div>
        <div class="zan_num" @click.stop="doZan(index)" @touchstart.stop>
          {{ item.likedCount }}
          <span
            v-show="!zanShowList.includes(index)"
            class="icon iconfont icon-dianzan2"
          ></span>
          <span
            v-show="zanShowList.includes(index)"
            :style="{color:'red'}"
            class="icon iconfont icon-dianzan3"
          ></span>
        </div>
      </div>
      <p class="comment_content">{{ item.content }}</p>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      bgcIdx: -1,
      islikeFlag: false,
      zanShowList: [],
      // userName: "",
      // commentId: -1
    };
  },
  methods: {
    doZan(index) {
      if (this.zanShowList.includes(index)) {
        this.zanShowList = this.zanShowList.filter(function(ele) {
          return ele != index;
        });
        // console.log(this.zanShowList);
      } else {
        this.zanShowList.push(index);
      }
    },
    commentStart(index) {
      if (this.bgcIdx === index) {
        this.bgcIdx = -1;
      } else {
        this.bgcIdx = index;
      }
    },
    showCommentControl(index, name, id) {
      if (this.bgcIdx !== -1) {
        // this.userName = name;
        // this.commentId = id;
        this.$emit("func", [name, id]);
        this.$parent.popupShow = true;
        this.bgcIdx = -1;
      }
    }
  },
  filters: {
    dataFormat: function(el) {
      return moment(el).format("MM月DD日");
    }
  },
  props: {
    title: String,
    commentList: Array
  }
};
</script>
<style lang="scss" scoped>
.comment-container {
  padding-bottom: 15px;
  box-sizing: border-box;
  .comment_title {
    line-height: 28px;
    font-size: 16px;
    font-weight: 550;
    color: #000;
  }
  .comment_item_bgc {
    background-color: #ccc;
  }
  .comment_item_box {
    transition: all 0.3s;
    padding: 15px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .user_info {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cover {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name_time {
        margin-left: 5px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .user_name {
          font-size: 14px;
          color: #444;
        }
        .comment_time {
          margin-top: 5px;
          font-size: 12px;
        }
      }
      .zan_num {
        font-size: 12px;
        height: 60%;
      }
    }
    .comment_content {
      margin: 8px 0 0 45px;
      font-size: 14px;
      color: #000;
      line-height: 1.2;
      letter-spacing: 1px;
    }
  }
}
</style>