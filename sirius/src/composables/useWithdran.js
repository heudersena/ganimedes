import { reactive } from "vue"
import api from "../plugins/axios"

const withdran = reactive([])

export const useWithdran = () => {


    api.get("withdran").then(({ data }) => {
        return withdran.values = data
    })

    return {
        withdran
    }

}