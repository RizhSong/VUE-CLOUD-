<template>
  <div class="login">
    <div class="l-wrap">
      <div class="loginbox">
        <div class="phone">
          <input type="text" v-model="phone" placeholder="手机号" id="phone" />
          <transition>
            <div class="e-mess" v-show="showMessage">请输入正确的手机号</div>
          </transition>
        </div>
        <div class="psw">
          <input type="password" v-model="password" placeholder="密码" id="psw" />
          <transition>
            <div class="e-mess" v-show="showPassword">请输入正确的密码</div>
          </transition>
        </div>
      </div>
      <div class="forget">
        <router-link to="/found" class="for">直接进去</router-link>
      </div>
      <div class="btn">
        <button class="submit" @click="loginMyMusicAccount" v-text="title"></button>
      </div>
    </div>
    <div class="welcome">
      <h1>CLOUD MUSIC</h1>
      <div class="square">
        <ul class="square_ul">
          <li class="square_item"></li>
          <li class="square_item"></li>
          <li class="square_item"></li>
          <li class="square_item"></li>
          <li class="square_item"></li>
        </ul>
      </div>
      <div class="ciecle">
        <ul class="ciecle_ul">
          <li class="ciecle_item"></li>
          <li class="ciecle_item"></li>
          <li class="ciecle_item"></li>
          <li class="ciecle_item"></li>
          <li class="ciecle_item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      flag: true,
      title: "登录",
      showMessage: false,
      showPassword: false
    };
  },
  created() {
    this.autoFull();
  },
  methods: {
    // 7.登录成功后登录状态的请求
    loginStatus() {
      this.$axios
        .get("/login/status?date=" + new Date().getTime())
        .then(res => {
          if (res.status == 200) {
            // 存取用户Id
            let userId = res.data.profile.userId;
            if (res.data.code == 200) {
              // 存取用户信息
              let accountInfo = res.data.profile;
              // 成功登录 修改vuex中的登录状态 变为1
              this.$store.commit("updateUserLoginStatus", 1);
              localStorage.setItem("loginStatus", 1);
              // 存入用户头像 昵称
              localStorage.setItem("avatarUrl", accountInfo.avatarUrl);
              localStorage.setItem("nickname", accountInfo.nickname);
              // 存取用户的id信息
              this.$store.commit("updateUserAccountId", userId);
              localStorage.setItem("accountId", userId);
              // 获取用户详情
              this._getUserDetail(userId);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 8. 获取用户详情
    _getUserDetail(uid) {
      this.$axios
        .get("/user/detail?uid=" + uid)
        .then(res => {
          if (res.status == 200) {
            // console.log(res.data);
            if (res.data.code == 200) {
              // 用户等级
              this.$store.commit("updateUserLevel", res.data.level);
              localStorage.setItem("level", res.data.level);
              // 用户详情
              this.$store.commit("updateUserProfile", res.data.profile);
              localStorage.setItem(
                "backgroundUrl",
                res.data.profile.backgroundUrl
              );
              // 跳转到推荐页面
              this.$router.replace({ path: "/found" });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 2.判断手机号的输入是否合法
    phoneContent(text) {
      // 正则表达式判断手机号
      let exp = /^1[345789]\d{9}$/;
      return exp.test(text);
    },
    //3.判断手机号有没有被注册
    determineRegister(phone) {
      this.$axios.get("/cellphone/existence/check?phone=" + phone).then(res => {
        if (res.status == 200) {
          // 手机号已经注册
          if (res.data.exist !== -1) {
            // 密码逻辑的判断
            this.determinePassword(phone, this.password);
          } else if (res.data.exist === -1) {
          }
        }
      });
    },
    // 4.判断密码是否正确
    determinePassword(phone, pwd) {
      // 如果密码为空
      if (!pwd) {
        // 提示请输入密码
        this.showPassword = true;
        setTimeout(() => {
          this.showPassword = false;
        }, 3000);
        this.flag = true;
      }
      // 在继续判断密码是否正确
      this.isSure(phone, pwd);
    },
    // 5.密码的判断
    isSure(phone, pwd) {
      // 手机号登录请求
      this.$axios
        .get(`/login/cellphone?phone=${phone}&password=${pwd}`)
        .then(res => {
          if (res.status == 200) {
            // 密码正确 登录成功
            // 将手机号保存到当地 下次登录时账号自动填写
            localStorage.setItem("account", phone);
            this.$store.commit("updateLogin", true);
            localStorage.setItem("isLogin", true);
            this.success();
          }
        })
        // 密码错误的处理
        .catch(err => {
          if (err) {
            // 错误处理
            this.error();
          }
        });
    },
    // 1.手机号登录
    loginMyMusicAccount() {
      if (this.flag) {
        // 将按钮禁用
        this.flag = false;
        if (this.phoneContent(this.phone)) {
          // 如果输入内容合法 进行下一步操作
          this.determineRegister(this.phone);
        } else {
          // 1.如果输入内容不合法 设置提示消息
          this.showMessage = true;
          // 2.文本框中的内容为空
          this.phone = "";
          // 3.按钮恢复
          this.flag = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        }
      }
    },
    // 6.登录成功的处理
    success() {
      // 发起获取登录状态的请求 存取登录状态
      this.loginStatus();
    },
    // 6.登录失败密码错误处理
    error() {
      this.showPassword = true;
      setTimeout(() => {
        this.showPassword = false;
      }, 3000);
      this.flag = true;
    },
    // 当内存中有手机号信息时自动填写
    autoFull() {
      let phone = localStorage.getItem("account");
      this.phone = phone;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  .l-wrap {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 60%;
    z-index: 12;
    transform: translateX(-50%);
    .loginbox {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .phone,
      .psw {
        width: 86%;
        margin-bottom: 1rem;
        #phone,
        #psw {
          width: 100%;
          height: 36px;
          outline: none;
          background: transparent;
          color: #fff;
          font-size: 16px;
          letter-spacing: 2px;
          border-bottom: 0.5px solid #fff;
        }
        input::-webkit-input-placeholder {
          color: #00a4ff;
        }
        input::-moz-input-placeholder {
          color: #00a4ff;
        }
        input::-ms-input-placeholder {
          color: #00a4ff;
        }
        .e-mess {
          width: 100%;
          height: 36px;
          padding-left: 16px;
          box-sizing: border-box;
          line-height: 36px;
          color: red;
          font-size: 14px;
          &.v-enter,
          &.v-leave-to {
            opacity: 0.2;
            transform: scale(0);
          }
          &.v-enter-active,
          &.v-leave-active {
            transition: all 0.6s;
          }
        }
      }
    }
    .forget {
      width: 100%;
      display: flex;
      justify-content: center;
      .for {
        width: 86%;
        text-align: right;
        font-size: 13px;
        color: rgba(151, 53, 130, 0.623);
        letter-spacing: 1px;
      }
    }
    .btn {
      width: 100%;
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      .submit {
        width: 80%;
        height: 32px;
        border-radius: 16px;
        border: 0;
        background-image: linear-gradient(#00a4ff, #2ddae8);
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .welcome {
    background-image: linear-gradient(#00a4ff, #2ddae8);
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    h1 {
      width: 100%;
      color: #fff;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
      text-align: center;
      z-index: 1;
    }
    ul {
      .square_item {
        position: absolute;
        border: 1px solid #fff;
        width: 30px;
        height: 30px;
        list-style: none;
        opacity: 0;
        background-color: #fff;
        top: 50%;
        left: 20%;
        animation: squareit 10s linear infinite;
        &:nth-child(2) {
          top: 40%;
          left: 60%;
          animation-delay: 1s;
        }

        &:nth-child(3) {
          top: 85%;
          left: 60%;
          animation-delay: 2s;
        }

        &:nth-child(4) {
          top: 10%;
          left: 70%;
          animation-delay: 2.5s;
        }

        &:nth-child(5) {
          top: 10%;
          left: 10%;
          animation-delay: 4s;
        }
      }
      .ciecle_item {
        position: absolute;
        border: 1px solid #fff;
        width: 30px;
        height: 30px;
        list-style: none;
        opacity: 0;
        background-color: #fff;
        bottom: 0;
        left: 15vw;
        animation: circleit 10s linear infinite;
        &:nth-child(2) {
          left: 35vw;
          animation-delay: 0.5s;
        }

        &:nth-child(3) {
          bottom: 0;
          left: 55vw;
          animation-delay: 6s;
        }

        &:nth-child(4) {
          bottom: 0;
          left: 75vw;
          animation-delay: 4.5s;
        }

        &:nth-child(5) {
          bottom: 0;
          left: 90vw;
          animation-delay: 2s;
        }
      }
    }
  }
}
@keyframes squareit {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
  }

  100% {
    transform: scale(4) rotateY(1000deg);
    opacity: 0;
  }
}
@keyframes circleit {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0.8;
    bottom: 0;
    border-radius: 0;
  }

  100% {
    transform: scale(4) rotate(1000deg);
    opacity: 0.1;
    bottom: 90vh;
    border-radius: 50%;
  }
}
</style>