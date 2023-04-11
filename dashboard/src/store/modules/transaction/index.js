
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
                id: '',
                transaction: values,
            });
        },
        // eslint-disable-next-line no-unused-vars
        cleanTransaction(state, values) {
            state.transactions = [];
        },
    },
    actions: {
        add({ commit }, values) {
            commit('setTransaction', values);
        },
        clean({ commit }, values) {
            commit('cleanTransaction', values);
        },
    },
};
