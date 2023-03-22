<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();
</script>


<template>
  <div class="app-container bg-light">
    <nav
      v-show="authStore.user"
      class="navbar navbar-expand navbar-dark bg-dark"
    >
      <div class="navbar-nav">
        <!-- <a @click="authStore.logout()" class="nav-item nav-link">Logout</a> -->
      </div>

    </nav>
    <div>
      <RouterView />
    </div>
  </div>
</template>

