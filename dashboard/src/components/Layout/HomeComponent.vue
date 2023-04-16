<script setup>
import SidebarComponent from "../SidebarComponent.vue";
import NavegationPieces from "./HomePieces/NavegationPieces.vue";
import HeaderMainPieces from "./HomePieces/HeaderMainPieces.vue";
import CenterSlotComponent from "./CenterSlotComponent.vue";
</script>
<template>
  <main class="bg-slate-800/90 w-full h-full flex flex-col">
    <header
      class="bg-slate-800 w-full h-16 flex items-center justify-center border-b border-slate-800/30"
    >
      <div class="mr-4 ml-4 uppercase font-bold text-slate-300">
        <span class="text-md">DASH</span>
        <span class="text-md text-yellow-300">gamer</span>
      </div>
      <div class="md:w-full">
        <NavegationPieces />
      </div>
    </header>
    <CenterSlotComponent>
      <RouterView />
    </CenterSlotComponent>
  </main>
</template>
