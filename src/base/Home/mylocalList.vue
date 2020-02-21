<template>
  <div class="myList">
    <div class="mywrap">
      <span class="icon icon-bendiyinle00"></span>
      <span class="local">本地音乐<i>(59)</i></span>
    </div>
    <van-divider :style="{margin: '8px 0',padding: '0 0 0 51px'}"></van-divider>
    <router-link to="/currentplay" class="mywrap">
      <span class="icon icon-lately icon-zuijinbofang"></span>
      <span class="lately">最近播放<i>({{latelength}})</i></span>
    </router-link>
    <van-divider :style="{margin: '8px 0',padding: '0 0 0 51px'}"></van-divider>
    <router-link to="/home/myradio" class="mywrap">
      <span class="icon icon-diantai1"></span>
      <span class="radio">我的电台<i>({{10}})</i></span>
    </router-link>
    <van-divider :style="{margin: '8px 0',padding: '0 0 0 51px'}"></van-divider>
    <div class="mywrap" @click="goToMyCollect">
      <span class="icon icon-wodeshoucang"></span>
      <span class="collect">我的收藏<i>({{mvCount}})</i></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artistCount: Number,
    mvCount: Number,
    djRadioCount: Number,
    latelength: Number
  },
  methods: {
    goToMyCollect(){
      this.$router.push({path:'/mycollect'})
    }
  },
}
</script>

<style lang="scss" scoped>
.myList {
  width: 100%;
  .mywrap {
    width: 100%;
    height: 36px;
    display: flex;
    .icon {
      width: 15%;
      color: #333;
      font-size: 22px;
      line-height: 36px;
    }
    .icon-lately {
      color: #000;
      font-size: 24px;
    }
    .local,.lately,.radio,.collect {
      width: 85%;
      font-size: 14px;
      color: #333;
      line-height: 36px;
      i {
        font-size: 12px;
        font-style: normal;
        color: #666;
        padding-left: 6px;
      }
    }
  }
} 
</style>