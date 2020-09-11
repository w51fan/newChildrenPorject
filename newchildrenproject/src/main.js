import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import echarts from 'echarts';
import axios from 'axios';
import App from './App.vue';

import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
