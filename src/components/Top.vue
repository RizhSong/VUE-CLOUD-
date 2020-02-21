<template>
  <div class="main">
    <span class="myList icon-liebiao1" @click="openMyInfo"></span>
    <div class="head">
      <ul class="headList">
        <!-- <router-link to="/home" tag="li">我的</router-link> -->
        <router-link to="/found" tag="li">云音乐</router-link>
        <!-- <router-link to="/share" tag="li">乐圈</router-link> -->
      </ul>
    </div>
    <router-link to="/search" class="search icon-sousuo"></router-link>
    <!-- 我的信息模板 -->
    <my-info ref="panel"></my-info>
  </div>
</template>

<script>
import MyInfo from '../base/MyInfo.vue'
export default {
  methods: {
    openMyInfo () {
      this.$refs.panel.open()
    }
  },
  components: {
    MyInfo
  }
}
</script>

<style lang="scss" scoped>
@import '../common/scss/common.scss';
.main {
  width: 100%;
  height: 4rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  background: $color-background;
  .myList {
    width: 56px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #333;
    text-align: center;
    line-height: 4rem;
  }
  .head {
    width: 100%;
    height: 100%;
    .headList {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 0 56px;
      box-sizing: border-box;
      li {
        flex: 1;
        text-align: center;
        line-height: 4rem;
      }
    }
  }
  .search {
    width: 56px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 4rem;
    color: #333;
  }
}
.router-link-active {
  color: $color-theme;
}  
</style>