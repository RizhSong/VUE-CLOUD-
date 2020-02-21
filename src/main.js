import Vue from 'vue'

import App from './App.vue'

// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

// 引入vant插件
import {
  Tab,
  Tabs,
  Icon,
  Divider,
  Lazyload,
  List,
  Loading,
  Popup,
  PullRefresh, 
  Toast,
  Field,
  Row, 
  Col,
  Cell, 
  CellGroup
} from 'vant';

Vue.use(Tab).use(Tabs);
Vue.use(Divider);
Vue.use(Icon);
Vue.use(Lazyload, {
  loading: require('./common/images/lazy1.jpg'),
  error: require('./common/images/lazy2.jpg'),
  listenEvents: ['scroll', 'mousewheel']
});
Vue.use(List);
Vue.use(Loading);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Row).use(Col);
Vue.use(Cell).use(CellGroup);

import './common/scss/index.scss'

import router from './router/router.js'
import store from './store/index.js'

import axios from 'axios'

axios.defaults.baseURL = 'http://waitz.cn:3000'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$axios = axios

const vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
