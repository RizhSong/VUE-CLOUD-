<template>
  <div class="setting">
    <div class="mode">
      <span class="icon icon-riqian"></span>
      <span class="word">夜间模式</span>
    </div>
    <div class="set">
      <span class="icon icon-shezhi"></span>
      <span class="word">设置</span>
    </div>
    <div class="layout">
      <span class="icon icon-tuichu2"></span>
      <span class="word" @click="Layout">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出登录
    Layout() {
      this.$axios.get('/logout')
      .then(res => {
        if(res.status == 200) {
          console.log("退出登录成功")
          localStorage.setItem("loginStatus",0)
          this.$store.commit("updateUserLoginStatus",0)
          localStorage.removeItem("accountId")
          localStorage.removeItem("level")
          localStorage.removeItem("nickname")
          localStorage.removeItem("avatarUrl")
          localStorage.removeItem("backgroundUrl")
          this.$router.replace('/')
        }
      })  
    }
  },
};
</script>

<style lang="scss" scoped>
.setting {
  position: absolute;
  left: 0;
  bottom: 52px;
  width: 100%;
  height: 42px;
  display: flex;
  border-top: 0.5px solid #eee;
  .mode,
  .set,
  .layout {
    flex: 1;
    margin-right: 16px;
    display: flex;
    &:nth-child(3) {
      margin: 0;
    }
    .icon {
      width: 25%;
      font-size: 16px;
      line-height: 42px;
      color: #333;
      text-align: center;
    }
    .word {
      width: 80%;
      color: #333;
      line-height: 42px;
      font-size: 14px;
      padding-left: 5px;
      box-sizing: border-box;
    }
  }
}
</style>