<template>
  <div class="home">
    <!-- 头部组件 -->
    <mytab></mytab>
    <van-divider :style="{margin: '16px 0 8px'}"></van-divider>
    <!-- 中间的部分 -->
    <mylocal-list
      :artistCount="artistCount"
      :djRadioCount="djRadioCount"
      :mvCount="mvCount"
      :latelength="latelength"
    ></mylocal-list>
    <!-- 我创建的列表 -->
    <my-list
      :myCreateSong="myCreateSong"
      :myCollectSong="myCollectSong"
      :createdPlaylistCount="createdPlaylistCount"
      :subPlaylistCount="subPlaylistCount"
    ></my-list>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import mytab from '../../base/Home/mytab.vue'
import mylocalList from '../../base/Home/mylocalList.vue'
import myList from '../../base/Home/myList.vue'
export default {
  data(){
    return {
      artistCount: 0,
      mvCount: 0,
      createdPlaylistCount: 0,
      subPlaylistCount: 0,
      djRadioCount: 0,
      myCreateSong: [],
      myCollectSong: [],
      favList: []
    } 
  },
  computed: {
    ...mapGetters(['loginStatus','accountId','latelength'])  
  },
  watch: {
    favList(newVal) {
      this.updateFavSong(newVal)
    }
  },
  created() {
    if(this.loginStatus == 1 || localStorage.getItem('loginStatus')){
      this._getUserInfo()
      this._getUserSingList(this.accountId)
      this._getFavSong(this.accountId)
    }
  },
  methods: {
    // 请求获取用户信息、歌单、收藏、MV/DJ的数量
    _getUserInfo(){
      this.$axios.get('/user/subcount')
        .then(res => {
          if(res.status == 200){
            this.artistCount = res.data.artistCount
            this.mvCount = res.data.mvCount
            this.createdPlaylistCount = res.data.createdPlaylistCount
            this.subPlaylistCount = res.data.subPlaylistCount
            this.djRadioCount = res.data.djRadioCount
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取用户歌单的请求
    _getUserSingList(id){
      let uid = localStorage.getItem("accountId")
      this.$axios.get('/user/playlist?uid='+id)
      .then(res => {
        if(res.status == 200) {
          const {playlist} = res.data
          this._dealSinglist(playlist)
        }
      })
    },
    // 获取我最喜爱的音乐列表数组
    _getFavSong(uid){
      this.$axios.get('/likelist?uid='+uid)
      .then(res => {
        if(res.status == 200) {
          this.favList = res.data.ids
        }
      })
    },
    // 处理我创建的歌单和收藏的歌单的数量
    _dealSinglist(playlist){
      return playlist.forEach((item,index) => {
        if(index < this.createdPlaylistCount){
          return this.myCreateSong.push(item) 
        }
        return this.myCollectSong.push(item)
      });
    },
    ...mapMutations(['updateFavSong'])
  },
  components: {
    mytab,
    mylocalList,
    myList
  } 
}
</script>

<style lang="scss" scoped>
</style>