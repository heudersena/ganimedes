<template>
  <RouterLink
    to="/home"
    class="flex items-center cursor-pointer space-x-3 hover:text-purple-500 hover:bg-gray-400/30 p-4"
    :class="GetIsMenuOpen ? 'justify-center' : ''"
  >
    <span class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    </span>
    <span class="font-semibold text-white" :class="GetIsMenuOpen ? 'hidden' : ''"
      >Home</span
    >
  </RouterLink>
  <RouterLink
    to="/saque"
    class="flex items-center cursor-pointer space-x-3 hover:text-purple-500 hover:bg-gray-400/30 p-4"
    :class="GetIsMenuOpen ? 'justify-center' : ''"
  >
    <span class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    </span>
    <span class="font-semibold text-white" :class="GetIsMenuOpen ? 'hidden' : ''"
      >Saques</span
    >
  </RouterLink>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { RouterLink } from "vue-router";

const store = useStore();
const GetIsMenuOpen = computed(() => store.getters["menu/GetIsMenuOpen"]);
</script>
