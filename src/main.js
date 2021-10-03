import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false


import axios from 'axios';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';


import Images from './components/Images.vue'
Vue.component('images', Images);


new Vue({
  render: h => h(App),
}).$mount('#app')
