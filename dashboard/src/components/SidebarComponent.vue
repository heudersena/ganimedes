<template>
  <div class="w-full h-full flex">
    <div
      :class="GetIsMenuOpen ? 'md:w-[5%] flex justify-center ' : ''"
      class="hidden md:block md:w-[15%] h-screen bg-slate-900/90 border-r border-blue-300 shadow-blue-100 shadow-sm"
    >
      <LogoComponent />
      <NavegationComponent />
    </div>

    <div class="w-full">
      <header
        :class="GetIsMenuOpen ? '' : ''"
        class="h-16 border-b border-gray-100 shadow-sm w-full flex items-center"
      >
        <div class="flex justify-between w-full mx-3">
          <div @click="FNIsOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-xs uppercase text-gray-600">
              Olá, Heuder Rodrigues de Sena
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 cursor-pointer text-purple-500 hover:text-red-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
      </header>
      <!--  -->
      <div class="h-full flex-1 w-full overflow-y-auto flex-wrap mb-16 px-6">
        <RouterView />
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import NavegationComponent from "./NavegationComponent.vue";
import LogoComponent from "./LogoComponent.vue";

const store = useStore();

function FNIsOpen() {
  store.dispatch("menu/updateIsMenuOpen");
}
const GetIsMenuOpen = computed(() => store.getters["menu/GetIsMenuOpen"]);
</script>
