<template>
  <div class="radiolist">
    <!-- 节目列表 -->
    <div class="dateNum">
      <span class="count">共62期</span>
      <div class="sort">
        <div class="arrTop">⬆</div>
        <div class="word">排序</div>
      </div>
    </div>
    <ul class="list">
      <li class="list-in">
        <div class="num">1</div>
        <div class="title">
          <div class="dis">2019-11-15</div>
        </div>
        <div class="operate icon-caozuo"></div>
        <div></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default { 
}
</script>

<style lang="scss" scoped>
.radiolist {
  width: 100%;
  .dateNum {
    width: 100%;
    height: 36px;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .count {
      line-height: 36px;
      color: #000;
      font-weight: bold;
    }
    .sort {
      width: 20%;
      display: flex;
      .arrTop {
        width: 24%;
        line-height: 36px;
        color: #000;
      }
      .word {
        line-height: 36px;
        color: #000;
      }
    }
  }
  .list {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .list-in {
      width: 100%;
      height: 42px;
      display: flex;
      .num {
        width: 13%;
        font-size: 13px;
        line-height: 42px;
      }
      .title {
        width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
          height: 26px;
          line-height: 26px;
          font-size: 14px;
          color: #000;
        }
        .dis {
          line-height: 20px;
          font-size: 12px;
        }
      }
      .operate {
        width: 10%;
        font-size: 16px;
        line-height: 46px;
        text-align: center;
      }
    }
  }
}
</style>