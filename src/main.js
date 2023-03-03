import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VModal from 'vue-js-modal'
import InfiniteScroll from 'vue-infinite-scroll'

Vue.use(InfiniteScroll)
Vue.use(ElementUI)
Vue.use(VModal)
new Vue({
  el: '#app',
  render: h => h(App)
})
