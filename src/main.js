import Vue from 'vue'
import App from './App.vue'

import VueLazyload from 'vue-lazyload'                          // VueLazyload


Vue.config.productionTip = false


import axios from 'axios';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';


import Images from './components/Images.vue'
Vue.component('images', Images);


Vue.use(VueLazyload);                                           // VueLazyload

new Vue({
  render: h => h(App),
}).$mount('#app')
