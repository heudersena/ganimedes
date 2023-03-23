
import { useAuthStore } from "../stores";
import api from "../plugins/axios"
import jwt from "jwt-decode"

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

        if (user.data?.error == true) {
            n = { name: "login" }
            localStorage.clear()
        } else {
            const token_decod = jwt(user.data?.token)

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