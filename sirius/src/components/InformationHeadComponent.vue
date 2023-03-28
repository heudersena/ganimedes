<template>
  <div class="mt-3 mb-3 text-gray-500 text-sm font-bold">
    {{ msg }} 

    <span v-if="isLoading">
     - R$ ...
    </span>
     <span v-else>
    - {{money}}
    </span>

    </div>
</template>

<script setup>
    const props = defineProps(["msg","money","isLoading"]);
</script>