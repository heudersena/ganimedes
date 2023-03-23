<template>
  <div class="flex h-full flex-col">
    <header class="flex items-center w-full justify-between h-16 border-b border-gray-100">
      
      <div class="w-[1180px] m-auto flex items-center justify-between">

       <div class="flex items-center">
         <RouterLink to="/" class="flex items-center space-x-2">
            <CashSyncIcon />
            <span>Coringa <span class="text-yellow-600 font-bold">G</span>ames </span>
        </RouterLink>
        <MenuComponent />
       </div>
      <div>
        <button @click="authStore.logout()">
            <LogoutIcon class="text-blue-700" />
        </button>
      </div>
      </div>

    </header>

    <div class="w-[1180px] m-auto">
        <RouterView />
    </div>

  </div>
</template>


<script setup>
import { RouterView, RouterLink } from "vue-router";
import LogoutIcon from "vue-material-design-icons/Logout.vue"
import CashSyncIcon from "vue-material-design-icons/CashSync.vue"
import MenuComponent from "../MenuComponent.vue"

// Logount
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();

</script>   