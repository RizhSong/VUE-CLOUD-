<template>
  <div class="Share">
    <div class="mytab">
      <van-tabs color="#2ddae8" line-height="2px" animated swipeable>
        <van-tab title="广场">
          <all-item></all-item>
        </van-tab>
        <van-tab title="动态">
          <send-item></send-item>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import allItem from '../../base/Share/allItem.vue'
import sendItem from '../../base/Share/sendItem.vue'
export default {
  components: {
    allItem,
    sendItem
  }
};
</script>

<style lang="scss" scoped>
.Share {
  width: 100%;
}
</style>