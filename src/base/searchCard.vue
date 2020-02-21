<template>
  <div class="masksearch" v-show="showcard" @click="hide">
    <div class="card" v-show="showcard">
      <div class="top">搜索 "{{ inputKey }}"</div>
      <ul class="list">
        <li class="list-in" v-for="(item,index) in resultKey" :key="index" @click="searchResult(item.keyword)">
          <span class="s-icon icon-sousuo"></span>
          <span class="result" v-text="item.keyword"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showcard: false
    };
  },
  props: {
    inputKey: {
      type: String
    },
    resultKey: {
      type: Array
    }
  },
  methods: {
    // 通过点击li把li中的值传递给父组件
    searchResult(key){
      this.$emit('Card',key)
    },
    show() {
      this.showcard = true;
    },
    hide() {
      this.showcard = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.masksearch {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.1);
  .card {
    position: absolute;
    top: 42px;
    left: 16px;
    width: 86%;
    background: #fff;
    box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.3);
    .top {
      width: 100%;
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #00a4ff;
      border-bottom: 0.5px solid #eee;
      box-sizing: border-box;
    }
    .list {
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      .list-in {
        height: 36px;
        border-bottom: 0.5px solid #eee;
        box-sizing: border-box;
        display: flex;
        .s-icon {
          width: 10%;
          line-height: 36px;
          font-size: 20px;
        }
        .result {
          width: 90%;
          line-height: 36px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>