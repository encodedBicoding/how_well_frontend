import Vue from 'vue';
import Ads from 'vue-google-adsense';
import VueSweetalert2 from 'vue-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faEyeSlash,
  faTrash,
  faLink,
  faPlusCircle,
  faPaperPlane,
  faPlus,
  faCaretDown,
  faCaretUp,
  faShareAlt,
  faAngleDoubleDown,
  faHouseUser,
  faStar,
  faTheaterMasks,
  faSmileWink,
  faBolt,
  faBars,
  faTimes,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.use(require('vue-script2'));

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options);

Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);


library.add(
  faEye,
  faEyeSlash,
  faTrash,
  faLink,
  faPlusCircle,
  faPaperPlane,
  faPlus,
  faCaretUp,
  faCaretDown,
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faShareAlt,
  faAngleDoubleDown,
  faHouseUser,
  faStar,
  faTheaterMasks,
  faSmileWink,
  faBolt,
  faBars,
  faTimes,
  faEdit,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default app;
