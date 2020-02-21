<template>
  <div class="mytab">
    <router-link to="/daily" class="daily" tag="div">
      <span class="icon-meirituijian- icon"></span>
      <span class="day">每日推荐</span>
    </router-link>
    <div class="personal">
      <span class="icon-fm icon"></span>
      <span class="dis">私人FM</span>
    </div>
    <div class="runing">
      <span class="icon-paobu icon"></span>
      <span class="run">跑步FM</span>
    </div>
    <div class="positive">
      <span class="icon-shudan icon"></span>
      <span class="enerty">乐圈正能量</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mytab {
  width: 100%;
  height: 4rem;
  background-image: linear-gradient(#00a4ff, #2ddae8);
  border-radius: 10px;
  display: flex;
  .daily,
  .personal,
  .runing,
  .positive {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .icon {
      text-align: center;
      height: 32px;
      line-height: 32px;
      color: #eee;
    }
    .day,
    .dis,
    .run,
    .enerty {
      text-align: center;
      font-size: 12px;
      color: #eee;
    }
  }
}
</style>