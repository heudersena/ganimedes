<script setup>
import { RouterLink } from "vue-router";
import { onMounted, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
const saqueStore = useStore();

const app = getCurrentInstance();
const socket = app.appContext.config.globalProperties.$socket;

function execSom() {
  var playAudio = document.getElementById("playaudio");
  playAudio.play();
  // setTimeout
  setTimeout(() => {
    console.log("..");
    playAudio.pause();
  }, 5000);
}

onMounted(() => {
  saqueStore.dispatch("saque/getSaques");

  socket.on("SOLICITACAO_SAQUE", () => {
    saqueStore.dispatch("saque/getSaques");
    execSom();
  });
});

const saques = computed(() => saqueStore.state.saque.saques);
</script>

<style scoped>
/* @import url('../assets/photon.min.css'); */
</style>
>

<template>
  <div class="ml-2 mt-4">
    <audio style="visibility: hidden" loop="false" id="playaudio">
      <source src="../assets/alerta.mp3" type="audio/mp3" />
    </audio>

    <div class="mb-8 mt-1">
      <RouterLink to="/saque-completed" class="cursor-pointer">
        <button class="btn btn-success">
          <div class="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span> Listagem completa de todos os saques</span>
          </div>
        </button>
      </RouterLink>
    </div>
    <h3 class="f">Listagem de solicitação de saques</h3>

    <div
      v-if="saques.length === 0"
      class="text-center text-2xl mt-8 text-red-500 flex flex-col items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-11 h-11"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div>O sistema não possou saques para ser processado!</div>
    </div>

    <table v-else class="table-striped">
      <thead>
        <tr class="uppercase">
          <th>valor R$</th>
          <th>Status</th>
          <th>E-mail</th>
          <th>telefone</th>
          <th>Chave PIX</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(saque, i) in saques" :key="i" class="cursor-pointer">
          <td>{{ BR(saque.amount) }}</td>
          <td
            class="uppercase"
            :class="saque.status === 'processing' ? 'text-yellow-500 font-semibold' : ''"
          >
            {{ saque.status === "processing" ? "EM PROCESSO" : saque.status }}
          </td>
          <td>{{ saque.profile.email }}</td>
          <td>{{ saque.profile.phone }}</td>
          <td>{{ saque.profile.keyPix }}</td>
          <td>
            <RouterLink
              :to="'saque-editar/' + saque.id + '/' + saque.profile.keycloak_id"
              class="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
