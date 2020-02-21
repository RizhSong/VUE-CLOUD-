import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const Login = () => import('../components/Login.vue') // 登录
const Home = () => import('../components/Home/Home.vue') // 我的
const Mycollect = () => import('../components/Home/subcomponents/Mycollect.vue') //我的收藏
const NumAlbum = () => import('../components/Home/subcomponents/NumAlbum.vue') //我的数字专辑
const MyRadio = () => import('../components/Home/subcomponents/MyRadio.vue') // 我的电台
const Daily = () => import('../components/Home/subcomponents/Daily.vue') //每日推荐
const Signed = () => import('../components/Home/subcomponents/Signed.vue') // 每日签到
const Found = () => import('../components/Found/Found.vue') // 发现
const Search = () => import('../components/Search.vue') //搜索
const Singer = () => import('../components/Found/subcomponents/Singer.vue') // 歌手
const Share = () => import('../components/Share/Share.vue') // 乐圈
const Album = () => import('../components/Found/subcomponents/Album.vue') // 专辑
const AlbumDetail = () => import('../components/Found/subcomponents/AlbumDetail.vue') // 专辑详情
const Recommend = () => import('../components/Found/subcomponents/Recommend.vue') // 歌单广场
const RankList = () => import('../components/Found/subcomponents/RankList.vue') // 排行榜
const SongList = () => import('../components/Found/subcomponents/SongList.vue') // 歌单
const CurrentPlay = () => import('../components/Home/subcomponents/currentPlay.vue') // 最近播放
const Comment = () => import('../components/Comment.vue') // 评论
const RadioList = () => import('../components/Found/subcomponents/RadioList.vue') // 电台列表
const RadioRank = () => import('../components/Found/subcomponents/RadioRank.vue') //电台排行
const Radio = () => import('../components/Found/subcomponents/Radio.vue') // 电台
const Create = () => import('../components/Found/subcomponents/Create.vue') // 电台创作
const MV = () => import('../components/mv/MV.vue') // 视频
const MVChoice = () => import('../components/mv/MVChoice.vue')
const MVClassify = () => import('../components/mv/MVClassify.vue')
const MVOrderList = () => import('../components/mv/MVOrderList.vue')
const MVPlayerPage = () => import('../components/mv/MVPlayerPage.vue')
const HotCommentsWall = () => import('../components/Share/subcomponents/hotCommentsWall.vue') //热评墙

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Login, name: 'login', meta: { keepAlive: false } }, // 登录
    { path: '/home', component: Home, name: 'home', meta: { requireAuth: true, keepAlive: true } }, // 我的部分
    { path: '/mycollect', component: Mycollect, meta: { requireAuth: true, keepAlive: false } }, // 我的收藏
    { path: '/home/album', component: NumAlbum, meta: { requireAuth: true, keepAlive: false } }, // 我的数字专辑
    { path: '/home/myradio', component: MyRadio, meta: { requireAut: true, keepAlive: false } },  // 我的电台
    { path: '/daily', component: Daily, meta: { requireAuth: true, keepAlive: false } }, // 每日推荐歌曲
    { path: '/sign', component: Signed, meta: { requireAuth: true, keepAlive: false } }, // 签到
    { path: '/found', component: Found, name: 'found', meta: { keepAlive: false } }, // 发现
    { path: '/singer/:id', component: Singer, name: 'singer', meta: { keepAlive: false } }, //歌手
    { path: '/search', component: Search, meta: { keepAlive: true } }, // 搜索
    { path: '/share', component: Share, name: 'share', meta: { requireAuth: true, keepAlive: true } }, // 分享
    { path: '/album', component: Album, meta: { keepAlive: true } }, // 专辑
    { path: '/recommend', component: Recommend, meta: { keepAlive: false } }, // 推荐
    { path: '/found/ranklist', component: RankList, name: 'rankList', meta: { keepAlive: true } }, //排行榜
    { path: '/songlist/:id', component: SongList, name: 'songlist', meta: { keepAlive: false } }, // 歌曲列表
    { path: '/currentplay', component: CurrentPlay, meta: { keepAlive: false } },
    { path: '/comment/:id', component: Comment, name: 'comment', meta: { keepAlive: true } },
    { path: '/albumdetail/:id', component: AlbumDetail, name: 'albumdetail', meta: { keepAlive: true } }, // 专辑详情列表
    { path: '/radio', component: Radio, name: 'radio', meta: { keepAlive: true } }, // 电台
    { path: '/radio/radioRank', component: RadioRank, meta: { keepAlive: false } }, // 节目主播排行
    { path: '/radioList/:id', component: RadioList, name: 'radioList', meta: { keepAlive: false } }, // 电台详情
    { path: '/radio/create', component: Create, meta: { keepAlive: false } },
    { path: '/mv', component: MV, name: 'mv', meta: { keepAlive: false } }, // mv主页
    { path: '/MVchoice', component: MVChoice, name: 'MVchoice', meta: { keepAlive: false } }, // mv精选
    { path: '/MVclassify', component: MVClassify, name: 'MVclassify', meta: { keepAlive: false } }, // mv分类
    { path: '/MVorderList', component: MVOrderList, name: 'MVorderList', meta: { keepAlive: false } }, // mv排行
    { path: '/MVplayerPage/:id', component: MVPlayerPage, name: 'MVplayerPage', meta: { keepAlive: false } }, // mv排行
    { path: '/hotCommentsWall', component: HotCommentsWall, name: 'hotCommentsWall', meta: { requireAuth: true, keepAlive: false } } // 热评墙
  ]
})

// 登录拦截
router.beforeEach(async (to, from, next) => {
  const { name, meta } = to;
  const { requireAuth } = meta;
  if (requireAuth) {
    const isLogin = store.getters.isLogin || localStorage.getItem('isLogin')
    if (isLogin) {
      next()
    } else {
      next('login')
    }
  } else {
    next()
  }
})

export default router