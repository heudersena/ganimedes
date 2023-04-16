<script setup>
import { RouterLink } from "vue-router";
import { ModalsContainer, VueFinalModal } from "vue-final-modal";
import { onMounted, computed, getCurrentInstance } from "vue";
import CenterSlotComponent from "../../../components/Layout/CenterSlotComponent.vue";
import { BR } from "../../../helpers/BR";

import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();

const saqueStore = useStore();

const app = getCurrentInstance();
const socket = app.appContext.config.globalProperties.$socket;

onMounted(() => {
  saqueStore.dispatch("saque/getSaques");

  socket.on("SOLICITACAO_SAQUE", () => {
    saqueStore.dispatch("saque/getSaques");

    console.log("Eita...");
  });
});

const saques = computed(() => saqueStore.state.saque.saques);
</script>
<template>
  <div class="w-full md:justify-start flex items-center justify-center h-16">
    <RouterLink to="/saque-completed">
      <button class="bg-blue-600 p-2 text-xs uppercase mb-3 rounded hover:bg-blue-600/60">
        <div class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-yellow-500"
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
  <div
    v-if="!saques.length"
    class="text-center text-lg text-stone-100 uppercase mt-8 flex flex-col items-center gap-4"
  >
    <span class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    </span>
    <h1>Sem saques para ser aprovados 😁</h1>
  </div>
  <div v-else class="flex flex-col gap-2">
    <div
      v-for="(saque, i) in saques"
      :key="i"
      class="flex gap-1 bg-slate-800/90 hover:bg-slate-800/50 rounded cursor-pointer transition-all duration-200"
    >
      <div class="w-[150px] flex items-center justify-center border-r border-stone-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </div>
      <div class="ml-2 flex-1 text-xs py-4 w-full">
        <div>
          <div>E-mail: {{ saque.profile.email }}</div>
          <div>Telefone: {{ saque.profile.phone }}</div>
          <div>Chave PIX: {{ saque.profile.keyPix }}</div>
          <div>{{ BR(saque.amount) }}</div>
        </div>
        <div class="mt-2">
          <div
            :class="saque.status === 'processing' ? 'text-yellow-500 font-semibold' : ''"
          >
            {{ saque.status === "processing" ? "EM PROCESSO" : saque.status }}
          </div>
        </div>
      </div>
    </div>
    <div class="z-50">
      <ModalsContainer />
    </div>

    <!-- <table class="table-striped">
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
        </table> -->
  </div>
</template>
