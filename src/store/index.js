import { createStore } from 'vuex';

export default createStore({
  state: {
    totems: {
      totem1: false,
      totem2: false,
      totem3: false,
      totem4: false,
    },
  },
  mutations: {
    activateTotem(state, totem) {
      state.totems[totem] = true;
    },
  },
  actions: {
    activateTotem({ commit }, totem) {
      commit('activateTotem', totem);
    },
  },
  getters: {
    isActive: (state) => (totem) => state.totems[totem],
  },
});
