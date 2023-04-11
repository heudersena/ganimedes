import { api } from './axios';

export default {
    async all() {
        return await api.get('withdraw');
    },
    async getById(id) {
        return (await api.get(`withdraw/${id}`)).data;
    },
    async update(id, status, description, keycloakid) {
        return await api.patch(`withdraw/${id}`, { status, description, keycloakid });
    }
};