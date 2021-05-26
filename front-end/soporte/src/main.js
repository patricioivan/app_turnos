import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');