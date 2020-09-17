import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';

Vue.use(Vuex);
const state = {};
const actions = {};
const mutations = {};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    common,
  },
});
