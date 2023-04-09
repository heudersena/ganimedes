<template>
    <ul class="flex ml-8 space-x-2">
        <RouterLink class="uppercase flex items-center text-xs bg-green-900/10 p-1 rounded hover:bg-green-900/30"
            to="/deposit">
            <PlusIcon />
            <span>depositar</span>
        </RouterLink>
    </ul>
</template>

<script setup>
import { RouterLink } from "vue-router";
import PlusIcon from "vue-material-design-icons/Plus.vue";
</script>
