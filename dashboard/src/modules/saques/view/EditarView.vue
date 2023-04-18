<template>
  <div class="">
    <form action="">
      <div>
        <input
          type="text"
          :value="BR(refContent.amount)"
          disabled
          class="w-full mt-1 rounded bg-slate-800 text-slate-500 border-none mb-4"
        />
      </div>
      <div>
        <label for=""></label>
        <input
          type="text"
          :value="router.params.id"
          disabled
          class="w-full mt-1 rounded bg-slate-800 text-slate-500 border-none mb-4"
        />
      </div>
      <div>
        <label for="" class="text-slate-400">Selecionar uma ação</label>
        <select name="" class="w-full rounded mt-1 bg-slate-800 border-none text-xs">
          <option class="text-xs" value="accepted">ACEITAR</option>
          <option class="text-xs" value="refused">RECUSAR</option>
        </select>
      </div>
      <div class="mt-4">
        <label for="" class="text-slate-400">Porque vai recusar?</label>
        <textarea
          name=""
          class="w-full mt-1 rounded bg-slate-800 border-none"
          rows="5"
        ></textarea>
      </div>
      <div class="w-full flex items-center justify-end">
        <!-- <a href="" class="mr-4 text-blue-100 font-thin">vontar</a> -->
        <button
          class="uppercase text-xs p-4 border font-semibold border-yellow-400 rounded hover:bg-yellow-400 hover:text-slate-600"
        >
          Enviar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { BR } from "../../../helpers/BR";
import saqueApi from "../../../http/Saque";
const router = useRoute();
const refContent = ref({});
onMounted(async () => {
  const response = await saqueApi.getById(router.params.id);
  refContent.value = response.data;
});
</script>
