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
import Start from '../views/Start.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'StartPage',
    component: Start,
    meta: {
      title: 'HWDYKM - Best Anonymous Messaging and Online Quiz website',
      metaTags: [
        {
          name: 'msvalidate.01',
          content: '335A9D8B1A0B02A600D3FE3AC6D4021C',
        },
        {
          name: 'description',
          content: 'How well do you know me, is the best FREE anonymous messaging and online quiz platform, that allows you find out how well your friends and family know about you. in this platform, you can channel the kind of response you get, as you can set up questions for your friends and families.',
        },
        {
          property: 'og:description',
          content: 'How well do you know me, is the best FREE anonymous messaging and online quiz platform, that allows you find out how well your friends and family know about you. in this platform, you can channel the kind of response you get, as you can set up questions for your friends and families.',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          name: 'keywords',
          content: 'anonymous, online quiz, fun and games, anonymous messaging, social platform, friends, connection, fun, text messaging, messaging, quiz',
        },
        {
          name: 'twitter:site',
          content: '@encodedbicoding',
        },
        {
          name: 'twitter:domain',
          content: 'hwdykm.xyz',
        },
      ],
    },
  },
  {
    path: '/begin',
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
