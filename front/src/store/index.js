import { createStore } from 'vuex';

export const Colors = {
  Default: 'cls-1',
  Color1: 'red-stroke',
  Color2: 'blue-stroke',
  Color3: 'yellow-stroke',
  Color4: 'green-stroke'
}

export const Forms = {
  Form1: 0,
  Form2: 1,
  Form3: 2,
}

export const Category = {
  Canard: 0,
  Poisson: 1,
  Poulpe: 2,
  Bateau: 3
}

export default createStore({
  state: {
    totems: {
      totem1: false,
      totem2: false,
      totem3: false,
      totem4: false,
    },
    logoStructure: {},  // Stocker les objets contenant currentIndex et colorClass,
    selectedSquare: null,
    selectedColor: null,
  },
  mutations: {
    activateTotem(state, totem) {
      state.totems[totem] = true;
    },
    updateLogoStructure(state, { id, form, color }) {
      state.logoStructure = {
        ...state.logoStructure,
        [id]: { form, color }
      };
    },
    updateSelectedSquare(state, id) {
      state.selectedSquare = id
    },
    updateSelectedColor(state, color) {
      state.selectedColor = color
    }
  },
  actions: {
    activateTotem({ commit }, totem) {
      commit('activateTotem', totem);
    },
    updateLogoStructure({ commit }, data) {
      commit('updateLogoStructure', data);
    },
    updateSelectedSquare({ commit }, id) {
      commit('updateSelectedSquare', id)
    },
    updateSelectedColor({ commit }, color) {
      commit('updateSelectedColor', color)
    }
  },
  getters: {
    isActive: (state) => (totem) => state.totems[totem],
    getLogoStructure: (state) => (id) => state.logoStructure[id] || { form: Forms.Form1, color: Colors.Default },
    getFullLogo: (state) => () => state.logoStructure,
    getSelectedSquare: (state) => () => state.selectedSquare,
    getSelectedColor: (state) => () => state.selectedColor
  },
});
