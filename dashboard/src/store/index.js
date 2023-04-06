import { createStore } from "vuex";

import auth from "./auth";

const store = createStore({
  namespaced: true,
  modules: {
    auth,
  },
});

export { store };
