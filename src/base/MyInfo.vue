<template>
    <div class="Mask" v-show="showMyInfo" @click="close">
      <transition name="info"
      @after-leave="afterLeave">
        <div class="myInfo" v-show="showCard" @click.stop @touchmove.prevent>
          <div class="mywrap">
            <div
              class="user"
              :style="`background: url(${backgroundUrl}) no-repeat;
          background-size: 100% 100%; background-position: center center`"
            >
              <div class="info">
                <div class="picUrl">
                  <div class="pic">
                    <img v-lazy="avatarUrl" alt />
                  </div>
                </div>
                <div class="name">
                  <div class="title">
                    <span class="nickname" v-text="nickname"></span>
                    <span class="level">
                      <span class="lev-in">Lv.{{Level}}</span>
                    </span>
                  </div>
                  <span class="sign">
                    <span class="daily" @click="Signed" v-text="signed"></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="operate"></div>
          </div>
          <layout></layout>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import layout from "./layout.vue";
export default {
  data() {
    return {
      showMyInfo: false,
      showCard: false,
      signed: "签到",
      Level: 0,
      nickname: "",
      avatarUrl: "",
      backgroundUrl: ""
    };
  },
  created() {
    this.Level = localStorage.getItem("level");
    this.nickname = localStorage.getItem("nickname");
    this.avatarUrl = localStorage.getItem("avatarUrl");
    this.backgroundUrl = localStorage.getItem("backgroundUrl");
  },
  computed: {
    ...mapGetters(["level", "accountId", "loginStatus"])
  },
  methods: {
    // 签到的路由跳转
    Signed() {
      this.signed = "已签到";
      this.$router.push({ path: "/sign" });
    },
    open() {
      this.showMyInfo = true;
      this.showCard = true;
    },
    close() {
      this.showCard = false;
    },
    afterLeave(el) {
      if(!this.showCard) {
        this.showMyInfo = false;
      }
    }
  },
  components: {
    layout
  }
};
</script>

<style lang="scss" scoped>
.Mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.4);
  .myInfo {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    width: 80%;
    height: 100%;
    background: #fff;
    &.info-enter {
      transform: translateX(-100%);
    }
    &.info-leave-to {
      transform: translateX(-100%);
    }
    &.info-enter-active {
      transition: all 0.4s ease;
    }
    &.info-leave-active {
      transition: all 0.4s ease;
    }
    .mywrap {
      display: flex;
      flex-direction: column;
      .user {
        width: 100%;
        height: 209px;
        padding: 0 16px 42px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .info {
          width: 100%;
          height: 108px;
          display: flex;
          flex-direction: column;
          .picUrl {
            height: 65%;
            display: flex;
            .pic {
              width: 27%;
              border-radius: 50%;
              overflow: hidden;
              background: #fff;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .name {
            display: flex;
            justify-content: space-between;
            height: 35%;
            .title {
              display: flex;
              height: 100%;
              .nickname {
                font-size: 16px;
                color: #fff;
                text-align: center;
                align-self: center;
              }
              .level {
                font-size: 12px;
                align-self: center;
                padding-left: 10px;
                .lev-in {
                  padding: 1px 3px 0;
                  background: #ccc;
                  border-radius: 6px;
                }
              }
            }
            .sign {
              height: 100%;
              line-height: 37px;
              .daily {
                font-size: 13px;
                padding: 4px 10px;
                border-radius: 9px;
                background: rgba(0, 0, 0, 0.4);
                color: #fff;
              }
            }
          }
        }
      }
    }
    .operate {
      width: 100%;
      height: 458px;
    }
  }
}
</style>