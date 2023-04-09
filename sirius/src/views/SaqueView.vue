<template>
    <div>

        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="flex flex-col w-full p-1">
            <label class="text-xs mb-2 font-bold text-gray-500">Digite um valor</label>
            <Field name="amount" type="number"
                :class="{ 'contrast-more:border-red-600 placeholder-red-100': errors.amount }"
                class="w-full border-none placeholder-gray-300 text-xs" placeholder="Quantos quer sacar?" />
            <div class="text-xs text-red-300 mb-4">{{ errors.amount }}</div>

            <button>
                <!-- <span v-show="paymentsIsLoading">Carregando...</span> -->
                <span
                    class="bg-[#7159c1] hover:bg-[#7159c1]/90 w-full flex justify-center p-3 rounded-sm text-white uppercase text-xs">
                    solicitar saque
                </span>
            </button>

        </Form>

        <div class="mt-6">

            <div v-show="!withdran.values?.data?.length" class="text-xs text-center flex flex-col text-red-500">
                <span class="">Ops!</span>
                <span>VOCÊ AINDA NÃO POSSUI SOLICITAÇÃO DE SAQUE</span>
            </div>

            <div v-for=" (w, i) in withdran.values?.data" :key="i"
                class="flex mt-2 p-4  justify-around items-center bg-gray-100">
                <div class="space-y-4 text-xs">{{ moneuBr(w.amount) }}</div>
                <div v-if="w.status === 'processing'" class="text-xs font-bold text-yellow-500 uppercase">
                    <UpdateIcon />
                </div>
                <div v-if="w.status === 'accepted'" class="text-xs font-bold text-green-500 uppercase">
                    <CheckDecagramIcon />
                </div>
                <div v-if="w.status === 'refused'" class="text-xs font-bold text-red-500 uppercase">
                    <CloseCircleIcon />
                </div>
                <div>{{ formatDate(w.created_at) }}</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import UpdateIcon from "vue-material-design-icons/Update.vue"
import CheckDecagramIcon from "vue-material-design-icons/CheckDecagram.vue"
import CloseCircleIcon from "vue-material-design-icons/CloseCircle.vue"

import { useWithdran } from "../composables/useWithdran"
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import api from "../plugins/axios";

const { withdran } = useWithdran()

const toast = useToast();



const schema = Yup.object().shape({
    amount: Yup.number("Precisa ser um numero").required("Digite um valor para fazer sacar")
});

async function onSubmit(values, { setErrors }) {
    const { amount } = values;
    api.post("withdran", { amount }).then(response => {
        console.log(response.data);
        toast.success("Solicitação gerada com success");
    }).catch(err => {
        toast.error(err?.response?.data?.errorMessage)
    })
}

function moneuBr(money) {
    return Number(money).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function formatDate(date) {
    const responseData = new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const responseHora = new Date(date).toLocaleTimeString('pt-BR', 'long')
    return responseData + ' às ' + responseHora
}


</script>