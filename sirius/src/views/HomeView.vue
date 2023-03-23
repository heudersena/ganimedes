<template>
  <div>
    <InformationHeadComponent msg="Lista de transações" />
    <span v-if="loading">carregando...</span>
    <span v-if="!load_transaction">...</span>
    <TableComponent v-if="loading === false" :transaction="load_transaction" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import TableComponent from "../components/TableComponent.vue";
import InformationHeadComponent from "../components/InformationHeadComponent.vue";
import ExempleComponent from "../components/ExempleComponent.vue";
// TODO

import api from "../plugins/axios";

const load_transaction = ref({});
const loading = ref(true);

onMounted(() => {
  api.post("/transaction").then((response) => {
    load_transaction.value = response.data?.[0].Transaction;
  });
  loading.value = false;
  console.log(load_transaction);
});

const total_money = computed(() => {
  load_transaction[0].balance.reduce(function (soma, i) {
    return soma++;
  });
});

console.log(total_money);
</script>


