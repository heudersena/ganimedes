import { ref } from "vue"

import axios from "../plugins/axios"

const payments = ref({})
const image_payments = ref("")
const url_payments = ref("")
const paymentsIsLoading = ref(false)

export const useDeposit = () => {

    function deposit(balance) {

        paymentsIsLoading.value = true;
        axios.post("/profile/store-deposit", { balance: Number(balance) }).then(response => {
            payments.value = response.data;
            image_payments.value = response.data?.mercado_pago?.m_qr_code_base64;
            url_payments.value = response.data?.mercado_pago?.m_ticket_url;
        }).finally(() => {
            paymentsIsLoading.value = false;
        })

    }

    return {
        payments,
        deposit,
        image_payments,
        url_payments,
        paymentsIsLoading
    }

}