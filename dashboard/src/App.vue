<script setup>
import { computed } from "vue"
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from "vuex"

const store = useStore()

// const fullName = computed(() => store.auth.getters.fullName)



</script>

<template>
  <header>
    <pre>
      {{ this.$store.getters }}
     </pre>
  </header>

  <RouterView />
</template>
