
import axios from "axios";
import { ref } from "vue"
import api from "../plugins/axios";

const users = ref({})
const isLoading = ref(false)
const isAuth = ref(false)
const error = ref(null)



export const useAuth = () => {

    async function setUsers(user) {
        users.value = user;
    }

    async function login(username, password) {
        const { access_token, refresh_token } = await InternalLogin(username, password);
        const profile = await InternalMeProfile(access_token)
        users.value = profile.user;
        isAuth.value = true
        localStorage.setItem('sirius::access_token', access_token);
    }

    async function InternalLogin(username, password) {       
        const data = {
            username,
            password,
            client_id: "account_web",
            grant_type: "password",
            scope: "openid"
        }

        return axios.post(import.meta.env.VITE_API_URL_LOGIN, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(({ data }) => {
            return {
                access_token: data.access_token,
                refresh_token: data.refresh_token
            }
        })
            .catch(err => {
                err
            })
    }

    async function InternalMeProfile(token) {
        return api.post("/profile/me",
            {},
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(({ data }) => {
                return {
                    user: data.user.data,
                    request: data.request
                }
            })
    }

    return {
        users,
        setUsers,
        login,
        isAuth
    }
}
