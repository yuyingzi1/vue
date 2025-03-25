import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import '@/assets/global.css'
import '@/assets/manger.css'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.component('tree-table', TreeTable)