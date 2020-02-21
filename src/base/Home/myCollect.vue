<template>
  <div class="myWrap">
    <!-- 收藏的专辑 -->
    <div class="albums">
      <div class="num">
        <div class="picUrl">
          <div class="pic-in">
            <img src alt />
          </div>
        </div>
        <div class="name" @click="toMyNumAlbum">我的数字专辑</div>
      </div>
      <div class="content">
        <h3 class="title">
          收藏的专辑
          <i>(8)</i>
        </h3>
        <ul class="list">
          <li class="list-in" v-for="item in albumList" :key="item.id" @click="displayAlbums(item.id)">
            <div class="picUrl">
              <div class="pic-in">
                <img v-lazy="item.picUrl" alt />
              </div>
            </div>
            <div class="name">
              <h3 class="alname" v-text="item.name"></h3>
              <span class="dis">{{item.artists[0].name}} 7首</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albumList: Array
  },
  methods: {
    displayAlbums(id){
      this.$router.push({name: 'albumdetail', params:{id:id}})
    },
    toMyNumAlbum(){
      this.$router.push({path: '/home/album'})
    }
  },
};
</script>

<style lang="scss" scoped>
.myWrap {
  width: 100%;
  height: 578px;
  overflow-y: auto;
  padding: 6px 16px 72px;
  box-sizing: border-box;
  // 我的专辑
  .albums {
    width: 100%;
    .num {
      width: 100%;
      height: 46px;
      display: flex;
      .picUrl {
        width: 16%;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 46%;
        .pic-in {
          width: 83%;
          height: 100%;
          background: rgb(165, 125, 125);
          border-radius: 6px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .name {
        width: 84%;
        padding-left: 10px;
        box-sizing: border-box;
        font-size: 15px;
        color: #000;
        line-height: 46px;
      }
    }
    .content {
      width: 100%;
      margin-top: 10px;
      border-top: 0.5px solid #eee;
      .title {
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #000;
        i {
          font-style: normal;
          font-size: 12px;
        }
      }
      .list {
        width: 100%;
        .list-in {
          width: 100%;
          height: 46px;
          margin-bottom: 10px;
          display: flex;
          .picUrl {
            width: 16%;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 46%;
            .pic-in {
              width: 83%;
              height: 100%;
              border-radius: 6px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .name {
            width: 84%;
            padding-left: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .alname {
              font-size: 15px;
              color: #000;
              line-height: 28px;  
            }
            .dis {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>