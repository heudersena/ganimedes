

<template>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }"
        class="w-[50%] bg-gray-100 h-full flex justify-center items-center">
        <div class="w-full p-16">
            <div v-if="errorLogin === true" class="mb-4 text-gray-900 p-4 border-l-4 border-red-400 rounded-sm">
                OPS! E-mail ou Senha incorretos!
            </div>

            <div>
                <label>E-mail</label>
                <Field name="username" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :class="{ 'is-invalid': errors.username }" />
                <div class="text-red-300">{{ errors.username }}</div>
            </div>
            <div>
                <label>Senha</label>
                <Field name="password" type="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :class="{ 'is-invalid': errors.password }" />
                <div class="text-red-300">{{ errors.password }}</div>
            </div>

            <div class="space-x-4">
                <button :disabled="isSubmitting"
                    class="mt-6 inline-flex items-center justify-center border focus:outline-none transition ease-in-out font-medium dark:font-semibold rounded-lg duration-150 text-white dark:text-teal-900 bg-[#F9A826] hover:bg--[#F9A826]/20 border--[#F9A826] text-sm px-4 py-2">
                    <span v-show="isSubmitting">carregando...</span>
                    Entrar
                </button>
                <RouterLink to="/register" class="text-blue-700 hover:text-blue-700/80">
                    Já possui uma conta?
                </RouterLink>
            </div>
        </div>
    </Form>
</template>


<script setup>
import { RouterLink } from "vue-router";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useAuthStore } from "@/stores";
import axios from "axios";
import { ref } from "vue";

const errorLogin = ref(false);

const schema = Yup.object().shape({
    username: Yup.string().required("O campo e-mail é obrigatório"),
    password: Yup.string().required("O campo senha é obrigatório"),
});

function onSubmit(values, { setErrors }) {
    const { username, password } = values;

    const authStore = useAuthStore();

    return authStore.login(username, password).catch((error) => {
        errorLogin.value = true;
        setErrors({ apiError: error });
    });
}
</script>
