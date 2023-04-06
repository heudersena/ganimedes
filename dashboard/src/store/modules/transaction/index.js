import { v4 } from "uuid";

export default {
  namespaced: true,
  state: {
    transactions: [],
  },
  getters: {
    getAllTransactions: (state) => state.transactions,
  },
  mutations: {
    setTransaction(state, values) {
      state.transactions.push({
        id: v4(),
        transaction: values,
      });
    },
    cleanTransaction(state, values) {
      console.log("----");
      state.transactions = [];
    },
  },
  actions: {
    add({ commit }, values) {
      commit("setTransaction", values);
    },
    clean({ commit }, values) {
      commit("cleanTransaction", values);
    },
  },
};
