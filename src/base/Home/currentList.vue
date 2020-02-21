<template>
  <div class="playlist">
    <ul class="list">
      <li class="list-in">
        <div class="picUrl">
          <img src />
        </div>
        <div class="title">
          <h3 class="name" v-text="11"></h3>
          <span class="dis">12首 by 朱艳</span>
        </div>
        <div class="time">11月11日</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.playlist {
  width: 100%;
  .list {
    width: 100%;
    .list-in {
      width: 100%;
      height: 46px;
      display: flex;
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
      .picUrl {
        width: 14%;
        overflow: hidden;
        border-radius: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        width: 70%;
        line-height: 46px;
        padding: 0 16px;
        box-sizing: border-box;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          width: 100%;
          height: 28px;
          line-height: 28px;
          font-size: 15px;
          color: #333;
        }
        .dis {
          line-height: 14px;
          font-size: 12px;
        }
      }
      .time {
        width: 16%;
        font-size: 12px;
        line-height: 46px;
      }
    }
  }
}
</style>