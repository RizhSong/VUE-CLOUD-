<template>
  <div class="allWrap">
    <router-link to="/hotCommentsWall" class="hotComment" tag="div">
      <h3 class="top">乐圈热评墙</h3>
      <p class="bottom">朱艳，今日最错信的评论，你看过几条</p>
      <div class="date">
        <span class="month">Nov</span>
        <span class="day">14</span>
      </div>
    </router-link>  
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.allWrap {
  width: 100%;
  margin-top: 6px;
  .hotComment {
    width: 100%;
    height: 64px;
    padding: 0 16px;
    box-sizing: border-box;
    background-image: linear-gradient(#00a4ff,#00feff);
    border-radius: 8px;
    margin-bottom: 6px;
    position: relative;
    display: flex;
    flex-direction: column;
    .top {
      height: 60%;
      color: #fff;
      line-height: 2;
    }
    .bottom {
      height: 40%;
      color: #eee;
      font-size: 12px;
    }
    .date {
      position: absolute;
      width: 20%;
      right: 0;
      top: 10px;
      display: flex;
      flex-direction: column;
      .month {
        height: 24px;
        line-height: 30px;
        color: #fff;
      }
      .day {
        height: 24px;
        font-size: 24px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>