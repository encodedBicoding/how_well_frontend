import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Dashboard from '../views/Dashboard.vue';
import PlaquePage from '../views/PlaquePage.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Terms from '../views/Terms.vue';
import Privacy from '../views/Privacy.vue';
import ResetPassword from '../views/ResetPassword.vue';
import PageNotFound from '../views/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('__token__HWDYKM__user__')) {
        next({ name: 'Dashboard' });
      } else {
        next();
      }
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('__token__HWDYKM__user__')) {
        next({ name: 'LandingPage' });
      } else {
        next();
      }
    },
  },
  {
    path: '/plaque/:username/:plaqueId/hwdykm',
    name: 'Plaque',
    component: PlaquePage,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
  },
  {
    path: '/rp/:token/:email',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '*',
    name: 'NotFound',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
