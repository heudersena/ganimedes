<script setup>
import { useAsyncState } from "@vueuse/core"
import { getCurrentInstance, onMounted } from 'vue'
import ReceiptTextCheckIcon from "vue-material-design-icons/ReceiptTextCheck.vue"
import CloseCircleIcon from "vue-material-design-icons/CloseCircle.vue"
import CheckDecagramIcon from "vue-material-design-icons/CheckDecagram.vue"

import api from "../plugins/axios";
import { MoedaBR } from "../plugins/convertToMoedaAndDate"
import { StatusTransaction } from "../plugins/enums/StatusTransaction"
import { TypeTransaction } from "../plugins/enums/TypeTransaction"

const app = getCurrentInstance()
const socket = app.appContext.config.globalProperties.$socket

socket.on("new-deposit", data => {
    console.log("HomeView.vue: ", data);
})




const { state: transactions, transactionIsLoading } = useAsyncState(api.post("/transaction").then(t => t.data), [], { resetOnExecute: true })

onMounted(() => {
    socket.on("new-deposit", data => {
        transactions.value = data.new_array
        console.log(data.new_array);
    })
})

</script>

<template>
    <div class="w-full">
        <div v-if="transactionIsLoading" class="flex items-center justify-center mt-4">Carregando... </div>

        <div v-else v-for="(transaction, i) in transactions" :key="i"
            class="flex items-center justify-between bg-gray-100 my-1 p-4 hover:bg-gray-200 w-full ">
            <div class="text-xs w-6">{{ MoedaBR(transaction?.balance) }}</div>
            <div class="text-xs">{{ TypeTransaction(transaction?.type_transaction) }}</div>

            <div class="w-[20%]  block text-left">
                <div v-if="transaction?.mercado_pago_transaction_status === 'cancelled'"
                    class="text-red-400 text-xs font-bold">
                    {{ StatusTransaction(transaction?.mercado_pago_transaction_status) }}
                </div>

                <div v-else-if="transaction?.mercado_pago_transaction_status === 'pending'"
                    class="text-yellow-400 text-xs font-bold">
                    {{ StatusTransaction(transaction?.mercado_pago_transaction_status) }}
                </div>
                <div v-else class="text-green-400 text-xs font-bold">
                    {{ StatusTransaction(transaction?.mercado_pago_transaction_status) }}
                </div>
            </div>

            <div>
                <a v-if="transaction?.mercado_pago_transaction_status === 'pending'"
                    :href="transaction?.MercadoPago[0]?.m_ticket_url" target="_blank"
                    class="uppercase text-xs font-bold  hover:text-green-400">
                    <ReceiptTextCheckIcon class="text-yellow-400" />
                </a>
                <span v-if="transaction?.mercado_pago_transaction_status === 'cancelled'" href="#"
                    class="uppercase text-xs font-bold ">
                    <CloseCircleIcon class="text-red-400" />
                </span>
                <span v-if="transaction?.mercado_pago_transaction_status === 'approved'" href="#"
                    class="uppercase text-xs font-bold ">
                    <CheckDecagramIcon class="text-green-400" />
                </span>

            </div>
        </div>

    </div>
</template>



