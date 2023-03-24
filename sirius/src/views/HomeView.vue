<template>
  <div>
    <InformationHeadComponent msg="Lista de transações" />
    <template v-if="isLoading">Carregando... </template>
    <template v-else>
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
const {state:transaction, isLoading} = useAsyncState(api.post("/transaction").then(t=>t.data[0].Transaction),[],{resetOnExecute:false})



</script>


