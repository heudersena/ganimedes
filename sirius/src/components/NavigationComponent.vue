<template>
    <div class="bg-gray-100 h-12 mt-2 mb-2 flex items-center pl-4 pr-4 space-x-2">
        <RouterLink to="/"
            class="flex items-center uppercase text-xs font-bold text-gray-500 rounded h-8 px-6 hover:bg-teal-500/80">
            <HomeFloodIcon class="pr-2" />
            <span>Home</span>
        </RouterLink>
        <RouterLink to="/saque"
            class="flex items-center uppercase text-xs font-bold text-gray-500  rounded h-8 px-6 hover:text-white hover:bg-teal-500/80">
            <Cash100Icon class="pr-2" />
            <span>Solicitar Saque</span>
        </RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import HomeFloodIcon from "vue-material-design-icons/HomeFlood.vue"
import Cash100Icon from "vue-material-design-icons/Cash100.vue"

// withdran

</script>
