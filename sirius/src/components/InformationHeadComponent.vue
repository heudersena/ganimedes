<template>
  <div class="mt-3 mb-3 text-gray-500 text-sm font-bold">{{ msg }}</div>
</template>

<script setup>
const props = defineProps(["msg"]);
</script>