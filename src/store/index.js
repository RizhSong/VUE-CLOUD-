import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    // banners
    banners: [],
    // 登录状态
    loginStatus: 0,
    // 用户的ID
    accountId: 0,
    // 用户等级
    level: 0,
    // 用户详情
    userInfo: {},
    // 全屏
    fullScreen: false,
    // 播放模式
    mode: 0,
    // 控制是否播放
    isplay: false,
    //当前播放歌曲的id
    songId: 0,
    // 当前歌曲的索引
    songIndex: -1,
    // 当前的音乐列表
    songList: [],
    // 音乐播放列表
    playList: [],
    // 当前时间
    currentTime: 0,
    // 最喜爱的音乐列表id
    favSong: [],
    historyPlay: [],
    latelength: 0
  },
  mutations: {
    updateLogin(state,status) {
      state.isLogin = status
    },
    //banners
    updateBanners(state, banners) {
      state.banners = banners
    },
    // 更新用户状态
    updateUserLoginStatus(state, status) {
      state.loginStatus = status
    },
    // 更新用户Id
    updateUserAccountId(state, id) {
      state.accountId = id
    },
    // 更新用户等级
    updateUserLevel(state, num) {
      state.level = num
    },
    // 更新用户详情
    updateUserProfile(state, info) {
      state.userInfo = info
    },
    // 是否播放
    updatePlaying(state,flag) {
      state.isplay = flag
    },
    // 是否全屏
    updateFullScreen(state,status) {
      state.fullScreen = status
    },
    updateMode(state,mode){
      state.mode = mode
    },
    // 更新歌曲Id
    updateSongId(state, id) {
      state.songId = id
      console.log(id)
    },
    // 歌单列表
    updateSongList(state, songList) {
      state.songList = songList
      // console.log(songList)
    },
    // 更新当前播放列表中歌曲的索引
    updateSongIndex(state, index) {
      state.songIndex = index
      // console.log(index)
    },
    // 更新音乐列表
    updatePlayList(state,list) {
      state.playList = list
      // console.log(state.playList)
    },
    updateCurrentTime(state,time) {
      state.currentTime = time
    },
    // 最喜爱的音乐列表数组
    updateFavSong(state,list) {
      state.favSong = list
    },
    updateHistory(state,list) {
      state.historyPlay = list
    },
    updateLateLength(state,length) {
      state.latelength = length
      // console.log(length)
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    // banners
    banners: state => state.banners,
    // 用户登录状态
    loginStatus: state => state.loginStatus,
    // 用户Id
    accountId: state => state.accountId,
    // 用户等级
    level: state => state.level,
    // 用户详情
    userInfo: state => state.userInfo,
    // 全屏
    fullScreen: state => state.fullScreen,
    // 播放模式
    mode: state => state.mode,
    // 是否播放
    isplay: state => state.isplay,
    //当前歌曲的Id
    songId: state => state.songId,
    // 得到当前歌曲的信息
    songs: state => state.playList[state.songIndex],
    // 更新歌曲的列表
    songList: state => state.songList,
    // 歌曲的索引
    songIndex: state => state.songIndex,
    // 播放列表
    playList: state => state.playList,
    // 当前时间
    currentTime: state => state.currentTime,
    // 
    favSong: state => state.favSong,
    historyPlay: state => state.historyPlay,
    latelength: state => state.latelength
  }
})

export default store