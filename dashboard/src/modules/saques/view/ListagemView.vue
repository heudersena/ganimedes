<script setup>
import { RouterLink } from "vue-router";
import { onMounted, computed, getCurrentInstance } from "vue";
import { BR } from "../../../helpers/BR";
import ListagemSolicitacaoSaques from "../components/ListagemSolicitacaoSaques.vue";
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
  });
});

const saques = computed(() => saqueStore.state.saque.saques);

function getOneSaque(item) {
  route.console.log(item);
}
</script>
<template>
  <div class="w-full md:justify-start flex items-center justify-center h-16 relative">
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
  <div v-else class="flex flex-col gap-2 mb-8">
    <RouterLink
      v-for="(saque, i) in saques"
      :key="i"
      class="flex gap-1 bg-slate-800/90 hover:bg-slate-800/50 rounded cursor-pointer transition-all duration-200"
      :to="'/saques/editar/' + saque.id"
    >
      <ListagemSolicitacaoSaques :saque="saque" />
    </RouterLink>

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
