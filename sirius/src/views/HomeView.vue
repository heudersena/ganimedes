<template>
  <div class="">
  sdsa
  </div>
</template>

<script setup>
import { useAsyncState  } from "@vueuse/core"



import api from "../plugins/axios";
import {useTransaction} from "../composables/useTransaction";


// TODO
const {state:transaction, transactionIsLoading} = useAsyncState(api.post("/transaction").then(t=>t.data[0].Transaction),[],{resetOnExecute:false})
const {state:balance, isLoading: balanceIsLoading} = useAsyncState(api.post("/profile/balance").then(t=>t.data),[],{resetOnExecute:false})




</script>


