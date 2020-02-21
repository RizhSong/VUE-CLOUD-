<template>
  <swiper :options="swiperOption" ref="mySwiper" v-if="swiperSlides.length > 1">
    <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
      <div class="typeTitle">
        <img :src="item.pic" class="myPic">
        <span class="dot">{{item.typeTitle}}</span>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        pagination: {
          el: ".swiper-pagination"
        },
        initialSlide: 0,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        // preventClicks : false,
        speed: 800,
        loop: true
      }
    };
  },
  props: {
    swiperSlides: {
      type: Array
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style lang="scss">
.swiper-container {
  width: 100%;
  height: 130px;
  border-radius: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  .myPic {
    width: 100%;
    height: 100%; 
  }
  .dot {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 6px;
    line-height: 22px;
    height: 22px;
    background: red;
    font-size: 12px;
    color: #f1f1f1;
    border-radius: 10px 0 0 0;
  }
}
</style>