
import { useAuthStore } from "../stores";
import api from "../plugins/axios"
import jwt from "jwt-decode"
import { useAuth } from "../composables/useAuth";

export default {
    redirectIfAuthenticated(to, from, next) {
        const auth = useAuthStore()
        let n

        if (auth.authenticated()) {
            n = { name: "index" }
        }


        next(n)
    },
    async redirectIfNotAuthenticated(to, from, next) {
        const auth = useAuthStore()
        let n

        const user = await api.post("/profile/me")

        console.log(user.data?.user?.data);
        const { setUsers } = useAuth();

        setUsers(user.data?.user?.data)

        if (user.data?.request?.error == true) {
            n = { name: "login" }
            localStorage.clear()
        } else {
            const token_decod = jwt(user.data?.request?.token)

            if (Date.now() >= token_decod.exp * 1000) {
                n = { name: "login" }
                localStorage.clear()
            }

            if (!auth.authenticated()) {
                n = { name: "login" }
            }

        }

        next(n)
    }

}