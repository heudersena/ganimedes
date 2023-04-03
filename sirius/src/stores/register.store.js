import { defineStore } from 'pinia';
import { router } from '@/helpers';
import api from '../plugins/axios';
import axios from 'axios';

import { useAuthStore } from "@/stores";

export const useRegisterStore = defineStore({
    id: 'register',
    state: () => ({

    }),
    actions: {
        async get_token() {
            // Buscar token de criação
            const url_keycloak = "http://192.168.0.103:8080/auth/realms/master/protocol/openid-connect/token";
            const keycloak = await axios.post(url_keycloak, {
                client_id: "admin-cli",
                grant_type: "client_credentials",
                client_secret: "dad38594-8ec1-430c-82a7-0650e2bba475"
            },
                {
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                }
            )
            // Fazer o registro na base de dados do keycloak
            return keycloak?.data?.access_token
        },

        async register(password, lastname, firstname, email, phone, keyPix) {

            const bearer = await this.get_token();

            const data = {
                "id": "3132131232131",
                "enabled": true,
                "attributes": {},
                "groups": [],
                "email": email,
                "emailVerified": true,
                "lastName": lastname,
                "firstName": firstname,
                "credentials": [{
                    "type": "password",
                    "value": password,
                    "temporary": false
                }]
            }

            const url = "http://192.168.0.103:8080/auth/admin/realms/desenvolvimento/users"

            try {
                const new_user = await axios.post(url, data, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + bearer
                    }
                })
                if (new_user) {
                    const create_Login = useAuthStore()
                    const response = await create_Login.complitedRegister(email, password)
                    await api.post("/profile/store", { keyPix, phone }, {
                        headers: {
                            "Authorization": "Bearer " + response
                        }
                    })

                }
                router.push("/login")
                return new_user
            } catch (error) {

                console.log(error)
                return error
            }


        }


    }
});
