<template>
  <div>
    <template v-if="transactionIsLoading">
     <div class="flex items-center justify-center mt-4">
       Carregando...
     </div>
    </template>
    <template v-else>
        <InformationHeadComponent msg="Lista de transações" :money="balance.balance_br" :isLoading="balanceIsLoading" />
        <TableComponent :transaction="transaction" />
    </template>
  </div>
</template>

<script setup>
import { useAsyncState  } from "@vueuse/core"
import TableComponent from "../components/TableComponent.vue";
import InformationHeadComponent from "../components/InformationHeadComponent.vue";
import ExempleComponent from "../components/ExempleComponent.vue";

import api from "../plugins/axios";
import {useTransaction} from "../composables/useTransaction";

// TODO
const {state:transaction, transactionIsLoading} = useAsyncState(api.post("/transaction").then(t=>t.data[0].Transaction),[],{resetOnExecute:false})
const {state:balance, isLoading: balanceIsLoading} = useAsyncState(api.post("/profile/balance").then(t=>t.data),[],{resetOnExecute:false,delay:2000})



</script>


