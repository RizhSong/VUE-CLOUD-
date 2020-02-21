<template>
  <div id="app">
    <!-- 头部固定部分 -->
    <top></top>
    <!-- 过渡动画 -->
    <transition out-in>
      <!-- 缓存 -->
      <keep-alive>
        <router-view class="content" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition>
      <router-view class="content" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <player></player>
  </div>
</template>

<script>
import Top from "./components/Top.vue";
import player from "./components/player.vue";
export default {
  components: {
    Top,
    player
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  padding: 4rem 0.9rem 3.2rem;
  box-sizing: border-box;
  overflow-x: hidden;
}
.content {
  width: 100%;
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  position: absolute;
}
.v-enter-active {
  transition: all 0.6s;
}
.v-leave-active {
  transition: all 0.4s;
}
</style>