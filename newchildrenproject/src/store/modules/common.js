// initial state
const state = {
  currentPage: '',
  cityId: '',
  cityName: '',
  areaId: '',
  townId: '',
  CourseId: '',
  VillageId: '',
  Token: '',
  UserType: '',
  User: '',
  ChildrenHomeId: '',
  SocialStationId: '',
  PreCurrentPath: '',
  Select: '',
  activityImageList: [],
  signImgFileList: [],
  videoFileList: [],
  activityId: '',
  urls: [],
};

const getters = {
  currentPage: (state) => state.currentPage,
  cityId: (state) => state.currentTab,
  cityName: (state) => state.cityName,
  areaId: (state) => state.stuViewLists,
  townId: (state) => state.mediaDevice,
  CourseId: (state) => state.CourseId,
  VillageId: (state) => state.VillageId,
  Token: (state) => state.Token,
  UserType: (state) => state.UserType,
  User: (state) => state.User,
  ChildrenHomeId: (state) => state.ChildrenHomeId,
  SocialStationId: (state) => state.SocialStationId,
  PreCurrentPath: (state) => state.PreCurrentPath,
  Select: (state) => state.Select,
  activityImageList: (state) => state.activityImageList,
  signImgFileList: (state) => state.signImgFileList,
  videoFileList: (state) => state.videoFileList,
};

const actions = {};

const mutations = {
  getCurrentPage(state, value) {
    state.currentPage = value;
  },
  getCityId(state, value) {
    state.cityId = value;
  },
  getCityName(state, value) {
    state.cityName = value;
  },
  getAreaId(state, value) {
    state.areaId = value;
  },
  getTownId(state, value) {
    state.townId = value;
  },
  getCourseId(state, value) {
    state.CourseId = value;
  },
  getVillageId(state, value) {
    state.VillageId = value;
  },
  getToken(state, value) {
    state.Token = value;
    // window.localStorage.setItem('Token',value)
  },
  getUserTpye(state, value) {
    state.UserType = value;
  },
  getUser(state, value) {
    state.User = value;
  },
  getChildrenHomeId(state, value) {
    state.ChildrenHomeId = value;
  },
  getSocialStationId(state, value) {
    state.SocialStationId = value;
  },
  getPreCurrentPath(state, value) {
    state.PreCurrentPath = value;
  },
  SET_TOKEN(state, value) {
    state.Token = value;
    window.localStorage.setItem('childrenToken', value);
  },
  SET_cityId(state, value) {
    state.cityId = value;
    window.localStorage.setItem('cityId', value);
  },
  SET_cityName(state, value) {
    state.cityName = value;
    window.localStorage.setItem('cityName', value);
  },
  SET_UserTpye(state, value) {
    state.UserType = value;
    window.localStorage.setItem('UserType', value);
  },
  getSelect(state, value) {
    state.Select = value;
  },
  getActivityImageList(state, value) {
    state.activityImageList = value;
  },
  getSignImgFileList(state, value) {
    state.signImgFileList = value;
  },
  getVideoFileList(state, value) {
    state.videoFileList = value;
  },
  getActivityId(state, value) {
    state.activityId = value;
  },
  getUrls(state, value) {
    state.urls = value;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
