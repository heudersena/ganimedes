

<script setup>

import { useStore } from 'vuex';
import { v4 } from 'uuid';
import { computed } from 'vue';

import { RouterView } from 'vue-router';
import secureLS from 'secure-ls';

const ls = new secureLS({ isCompression: false });

const store = useStore();

// console.log(store.getters["auth/fullName"]);

// store.dispatch("add")

function save() {
    store.dispatch('transaction/add', v4());
}

function clear() {
    store.dispatch('transaction/clean', []);
    ls.clear();

}


// const transactions = computed(() => this.$store.state.transaction.transactions)
const transactions = computed(() => store.state.transaction.transactions);

</script>

<template>
  <header>
    <button @click="save">ADD</button>
    <button @click="clear()">CLEAN</button>
    <p v-for="transaction in transactions" :key="transaction.id">
      {{ transaction.id }}
    </p>

    <span v-show="transactions.length">
      <h1>Ok</h1>
    </span>

  </header>



  <RouterView />
</template>

