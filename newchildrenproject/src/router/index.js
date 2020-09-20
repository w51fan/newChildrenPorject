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
  {
    path: '/userCenterPage',
    name: 'userCenterPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/userCenterPage.vue'),
  },
  {
    path: '/growthStoryPage',
    name: 'growthStoryPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/growthStoryPage.vue'),
  },
  {
    path: '/childrenHomePage',
    name: 'childrenHomePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/childrenHomePage.vue'),
  }, {
    path: '/childrenHomePageIndex',
    name: 'childrenHomePageIndex',
    component: () => import(/* webpackChunkName: "about" */ '../views/childrenHomePageIndex.vue'),
  }, {
    path: '/myIntegralPage',
    name: 'myIntegralPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/myIntegralPage.vue'),
  },
  {
    path: '/userFeedbackPage',
    name: 'userFeedbackPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/userFeedbackPage.vue'),
  },
  {
    path: '/governmentLedPage',
    name: 'governmentLedPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/governmentLedPage.vue'),
  },
  {
    path: '/volunteersListPage',
    name: 'volunteersListPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/volunteersListPage.vue'),
  },
  {
    path: '/volunteerDetailPage',
    name: 'volunteerDetailPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/volunteerDetailPage.vue'),
  },
  {
    path: '/learningParkPage',
    name: 'learningParkPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/learningParkPage.vue'),
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
