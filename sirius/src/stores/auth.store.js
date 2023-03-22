import { defineStore } from 'pinia';
import { router } from '@/helpers';
import api from '../plugins/axios';
import axios from 'axios';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('sirius::user') || null),
        returnUrl: null,
        access_token: ""
    }),
    actions: {
        async login(username, password) {
            // API
            const url = "http://192.168.0.103:8080/auth/realms/desenvolvimento/protocol/openid-connect/token"
            const data = {
                username,
                password,
                client_id: "account_web",
                grant_type: "password",
                scope: "openid"
            }

            const token = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })

            const user_api_rest = await api.post("/profile/me", null, {
                headers: {
                    Authorization: "Bearer " + token.data?.access_token
                }
            })



            // update pinia state
            this.user = user_api_rest.data?.content;
            this.access_token = token.data.access_token

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('sirius::access_token', token.data?.access_token);
            localStorage.setItem('sirius::user', JSON.stringify(user_api_rest.data?.content));

            // redirect to previous url or default to home page            
            router.push(this.returnUrl || '/');
            return token.data?.access_token;

        },
        logout() {
            this.user = null;
            localStorage.removeItem('sirius::user');
            localStorage.removeItem('sirius::access_token');
            window.document.location.href = "/login"
        }
    }   
});
