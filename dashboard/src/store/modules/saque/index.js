// eslint-disable-next-line no-unused-vars
import Saque from '../../../http/Saque';
export default {
    namespaced: true,
    state: {
        saques: [],
        saqueId: {}
    },
    getters: {

    },
    mutations: {
        GET_ALL(state, payload) {
            state.saques = payload;
        },
        GET_BY_ID(state, payload) {
            state.saqueId = payload;
        }
    },
    actions: {
        getSaques({ commit }) {
            Saque.all().then(response => {
                commit('GET_ALL', response.data?.data);
            });
        },
        getSaqueById({ commit }, payload) {
            Saque.getById(payload.id).then(response => {
                commit('GET_BY_ID', response.data);
            });
        },
        // eslint-disable-next-line no-unused-vars
        updateSaqueById({ commit }, payload) {
            const status = payload.fields.action;
            const description = payload.fields.description;
            Saque.update(payload.id, status, description, payload.keycloakid).then(response => {
                console.log(response);
            });
        }

    },
};
