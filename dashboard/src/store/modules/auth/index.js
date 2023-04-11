export default {
    namespaced: true,
    state: {
        user: {
            first_name: 'Heuder',
            last_name: 'Rodrigues de Sena',
        },
    },
    getters: {
        fullName(state) {
            return state.user.first_name + ' ' + state.user.last_name;
        },
    },
    mutations: {},
    actions: {
        clean() {}
    },
};
