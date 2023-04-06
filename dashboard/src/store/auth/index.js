import { createStore } from "vuex";

const store = createStore({
  namespaced: true,
  state: {
    user: {
      first_name: "Heuder",
      last_name: "Rodrigues de Sena",
    },
  },
  getters: {
    fullName(state) {
      return state.user.length;
    },
  },
  mutations: {},
  actions: {},
});

export default store;
