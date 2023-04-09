
<script setup>
import { ref, reactive } from "vue";



import * as Yup from "yup";

import { Form, Field } from "vee-validate";

import api from "../plugins/axios";

const isLoggedIn = ref(true);
const pix = ref("");
const m_ticket_url = ref("");

const schema = Yup.object().shape({
    balance: Yup.number("Precisa ser um numero").required(
        "Digite um valor para fazer deposito"
    ),
});

async function onSubmit(values, { setErrors }) {
    const { balance } = values;
    try {

        const content = await api.post("/profile/store-deposit", {
            balance: Number(balance),
        });
        const imagem = content.data?.mercado_pago?.m_qr_code_base64;
        pix.value = imagem;
        console.log(content.data?.mercado_pago?.m_ticket_url);
        m_ticket_url.value = content.data?.mercado_pago?.m_ticket_url;

    } catch (er) {
        console.log(er);
    }
}
</script>




<template>
    <div class="flex">
        <div>
            <div class="flex w-full">
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }"
                    class="flex flex-col w-full">
                    <Field name="balance" type="number" :class="{ 'bg-red-200': errors.balance }" class="w-full" />
                    <div class="invalid-feedback">{{ errors.balance }}</div>

                    <br />
                    <button :disabled="isSubmitting">
                        <span v-show="isSubmitting">Carregando...</span>
                        <span v-show="!isSubmitting">Depoistar</span>
                    </button>

                    <div v-if="errors.apiError">
                        {{ errors.apiError }}
                    </div>
                </Form>

                <div v-if="isSubmitting">Carregando...</div>

                <div v-else>
                    <div v-if="m_ticket_url" class="border border-gray-700 p-2 flex rounded-sm ml-3">
                        <img v-if="pix" class="h-[150px]" :src="'data:image/jpeg;charset=utf-8;base64, ' + pix" />

                        <div>
                            <a v-if="m_ticket_url" :href="m_ticket_url" target="_blank" class="text-purple-800">Abrir Pagina
                                para fazer pagamento</a>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>


