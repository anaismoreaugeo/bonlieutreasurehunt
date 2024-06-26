import { createStore } from 'vuex';

export default createStore({
  state: {
    totems: {
      totem1: false,
      totem2: false,
      totem3: false,
      totem4: false,
    },
    logoStructure: {}  // Stocker les objets contenant currentIndex et colorClass
  },
  mutations: {
    activateTotem(state, totem) {
      state.totems[totem] = true;
    },
    updateLogoStructure(state, { id, currentIndex, colorClass }) {
      state.logoStructure = {
        ...state.logoStructure,
        [id]: { currentIndex, colorClass }
      };
    }
  },
  actions: {
    activateTotem({ commit }, totem) {
      commit('activateTotem', totem);
    },
    updateLogoStructure({ commit }, data) {
      commit('updateLogoStructure', data);
    }
  },
  getters: {
    isActive: (state) => (totem) => state.totems[totem],
    getLogoStructure: (state) => (id) => state.logoStructure[id] || { currentIndex: 0, colorClass: 'cls-1' },
    getFullLogo: (state) => () => state.logoStructure
  },
});
