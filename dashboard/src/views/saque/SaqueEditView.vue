<script setup>
import {  getRawFormData, useForm, validateForm, resetForm } from 'vue3-form';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const saqueStore = useStore();

saqueStore.dispatch('saque/getSaqueById', { id: route.params.id });

const form = useForm({
    action: { rules: ['required'] },
    description: { rules: [] }
});

function onSubmit() {
    if (!validateForm(form)) return;
    
    const fields = getRawFormData(form);
    // Enviar para API
    console.log(fields);
    saqueStore.dispatch('saque/updateSaqueById', {fields, id:route.params.id, keycloakid:route.params.keycloakid});
    resetForm(form);
}

</script>

<template>
    <!-- <input type="text" disabled :value="saqueStore.state.saque.saqueId.id"> -->
    <div class="p-2">
        <form @submit.prevent="onSubmit">

            <input type="text" :value="'ID: ' + route.params.id" disabled class="w-full mb-2 h-11 text-gray-500">
            <div>
            <label for=""></label>
            <select v-model="form.fields.action.value" name="action"
                class="w-full h-11 border border-blue-200 rounded"
                :class="form.fields.action.errors != null ? 'border border-red-500' : ''">
                <option value="accepted">ACEITAR</option>
                <option value="refused">RECUSAR</option>
            </select>
                <span class="text-xs uppercase font-semibold text-red-500">{{ form.fields.action.errors != null ? "Preencha o campo corretamente" : "" }}</span>
            </div>
        
            <div v-show="form.fields.action?.value === 'refused'" class="mt-4">
                <label for="" class="text-xs uppercase">Descrição: (Esté espaço é para você justificar o porque está recusando essa solicitação.)</label>
              <textarea v-model="form.fields.description.value" name="description" class="w-full p-3 border border-gray-200" cols="30" rows="10"></textarea>
            
            </div>
             
            <button class="w-full mt-4 bg-blue-500 h-11 rounded font-bold text-white hover:bg-blue-700/80 transition-all">OK</button>
        </form>
    </div>
</template>