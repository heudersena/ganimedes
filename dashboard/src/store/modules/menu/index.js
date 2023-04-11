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
        // eslint-disable-next-line no-unused-vars
        setIsMenuOpen(state, payload) {
            state.isMenuOpen = !state.isMenuOpen;
        },
    },
    actions: {
        updateIsMenuOpen({ commit }, values) {
       
            commit('setIsMenuOpen', values);
        },
    },
};
