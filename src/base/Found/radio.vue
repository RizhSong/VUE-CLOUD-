<template>
  <div class="radio">
    <div class="title">
      <h3 class="new">推荐电台</h3>
      <router-link to="/radio" class="more" @click="moreRadio" tag="span">更多电台</router-link>
    </div>
    <div class="content">
      <div class="cover" v-for="item in radio" :key="item.id" @click="toRadioList(item.id)">
        <div class="cover-in">
          <img v-lazy="item.picUrl" :alt="item.name">
        </div>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    radio: {
      type: Array
    }
  },
  methods: {
    moreRadio(){

    },
    toRadioList(id) {
      this.$router.push({name: 'radioList', params: {id: id}})
    }
  }, 
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/common.scss";
.radio {
  width: 100%;
  margin-bottom: 2rem;
  .title {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    .new {
      text-align: center;
      line-height: 56px;
      height: 56px;
      color: $color-text;
      font-size: $font-size-medium-x;
    }
    .more {
      text-align: center;
      line-height: 56px;
      height: 56px;
      font-size: $font-size-small-x;
    }
  }
  .content {
    width: 100%;
    height: 310px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    border-radius: 10px;
    .cover {
      width: 31%;
      height: 139px;
      margin-right: 3%;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .cover-in {
        width: 100%;
        height: 107px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        color: $color-text-m;
        font-size: $font-size-small;
        display: inline-block;
        width: 100%;
        height: 2.2rem;
        line-height: 1.1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>