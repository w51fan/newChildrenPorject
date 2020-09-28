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
  {
    path: '/articleDetail',
    name: 'articleDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/articleDetail.vue'),
  },
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/newsDetail.vue'),
  },
  {
    path: '/courseDetailPage',
    name: 'courseDetailPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/courseDetailPage.vue'),
  },
  {
    path: '/lessonPage',
    name: 'lessonPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/lessonPage.vue'),
  },
  {
    path: '/myRecordsListPage',
    name: 'myRecordsListPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/myRecordsListPage.vue'),
  },
  {
    path: '/myRecordsPage',
    name: 'myRecordsPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/myRecordsPage.vue'),
  },
  {
    path: '/growthRecordPage',
    name: 'growthRecordPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/growthRecordPage.vue'),
  },
  {
    path: '/learningRecordsPage',
    name: 'learningRecordsPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/learningRecordsPage.vue'),
  },
  {
    path: '/accountSettingPage',
    name: 'accountSettingPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/accountSettingPage.vue'),
  },
  {
    path: '/myMembersListPage',
    name: 'myMembersListPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/myMembersListPage.vue'),
  },
  {
    path: '/childrenHomeListPage',
    name: 'childrenHomeListPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/childrenHomeListPage.vue'),
  },
  {
    path: '/addRecordPage',
    name: 'addRecordPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/addRecordPage.vue'),
  },
  {
    path: '/recordDetailPage',
    name: 'recordDetailPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/recordDetailPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
