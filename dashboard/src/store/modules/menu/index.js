export default {
  namespaced: true,
  state: {
    isMenuOpen: false,
  },

  getters: {
    GetIsMenuOpen(state) {
      return state.isMenuOpen;
    },
  },
  mutations: {
    setIsMenuOpen(state, payload) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
  actions: {
    updateIsMenuOpen({ commit }, values) {
       
      commit("setIsMenuOpen", values);
    },
  },
};
