import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faEyeSlash,
  faTrash,
  faLink,
  faPlusCircle,
  faPaperPlane,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';


library.add(
  faEye,
  faEyeSlash,
  faTrash,
  faLink,
  faPlusCircle,
  faPaperPlane,
  faPlus,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
