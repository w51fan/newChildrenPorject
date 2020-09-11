import Vue from 'vue';
import VueRouter from 'vue-router';
import guidePage from '../views/guidePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'guidePage',
    component: guidePage,
  },
  {
    path: '/guidePage',
    name: 'guidePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/guidePage.vue'),
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/loginPage.vue'),
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/homePage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
