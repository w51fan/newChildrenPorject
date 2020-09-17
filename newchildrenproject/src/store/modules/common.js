// initial state
const state = {
  currentPage: '',
};

const getters = {
  // eslint-disable-next-line no-shadow
  currentPage: (state) => state.currentPage,

};

const actions = {};

const mutations = {
  // eslint-disable-next-line no-shadow
  getCurrentPage(state, value) {
    state.currentPage = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
