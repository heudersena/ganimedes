<template>
  <div>

    <div class="mt-16">

      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="flex flex-col w-full p-1">
        <label class="text-xs mb-2 font-bold text-gray-500">Digite um valor</label>
        <Field name="balance" type="number"
          :class="{ 'contrast-more:border-red-600 placeholder-red-100': errors.balance }"
          class="w-full border-none placeholder-gray-300 text-xs" placeholder="Quantos quer depositar?" />
        <div class="text-xs text-red-300 mb-4">{{ errors.balance }}</div>

        <button :disabled="paymentsIsLoading">
          <span v-show="paymentsIsLoading">Carregando...</span>
          <span v-show="!paymentsIsLoading"
            class="bg-[#7159c1] hover:bg-[#7159c1]/90 w-full flex justify-center p-3 rounded-sm text-white uppercase text-xs">Fazer
            deposito</span>
        </button>

        <div v-if="errors.apiError">
          {{ errors.apiError }}
        </div>
      </Form>

    </div>

    <div class="mt-16">
      <p v-show="image_payments" class="ml-4 text-sx font-bold mb-2 text-gray-600">Abra o aplicativo do seu banco e faça o
        pagamento</p>
      <div class="flex flex-col h-[180px] mt-4 ml-4">
        <div class="">
          <img v-show="image_payments" :src="'data:image/jpeg;charset=utf-8;base64, ' + image_payments" class="h-[180px]">
        </div>
        <!-- <img class="w-[50px] h-[20px] absolute bottom-1 right-2" src="https://upload.wikimedia.org/wikipedia/commons/d/de/Logo_-_pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.png" alt="" srcset=""> -->
        <a v-show="url_payments" :href="url_payments" target="_blank" rel="noopener noreferrer" class="mt-4">
          <div class="flex items-center space-x-1">
            <OpenInNewIcon class="text-blue-600" />
            <span class="text-xs font-light text-blue-600">abrir diretamente no site do mercado pago</span>
          </div>
        </a>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import {getCurrentInstance} from "vue"
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { useAsyncState } from "@vueuse/core"
import { ref } from "vue"

import OpenInNewIcon from "vue-material-design-icons/OpenInNew.vue"
import ContentCopyIcon from "vue-material-design-icons/ContentCopy.vue"
import { useDeposit } from "../composables/useDeposit"

import { useAuth } from "../composables/useAuth"

const { deposit, paymentsIsLoading, image_payments, url_payments, payments } = useDeposit()


const schema = Yup.object().shape({
  balance: Yup.number("Precisa ser um numero").required("Digite um valor para fazer deposito")
});

const { users } = useAuth()
const app = getCurrentInstance()
const socket = app.appContext.config.globalProperties.$socket
socket.emit("/user", { email: users.value.email })

async function onSubmit(values, { setErrors }) {
  const { balance } = values;
  try {
    deposit(balance)
    socket.emit("/new-balance", balance)
  } catch (er) {
    console.log(er);
  }
}


</script>
