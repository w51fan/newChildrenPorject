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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/guidePage.vue'),
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/loginPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
