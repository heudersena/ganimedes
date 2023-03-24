

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center tw-gradient-to h-full w-[50%]">
      <img src="@/assets/game.svg" class="h-[60%]" />
    </div>
    <RouterView />
  </div>
</template>


<script setup>
import { RouterView } from "vue-router";

</script>
