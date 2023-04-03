<script setup>
import { RouterLink } from "vue-router";
import { useRegisterStore } from "@/stores";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O E-mail é obrigatório"),
  password: Yup.string().required("O campo senha é obrigátório"),
  lastname: Yup.string().required("O campo primeiro nome é obrigátório"),
  firstname: Yup.string().required("O campo segundo nome é obrigátório"),
  phone: Yup.string().required("O campo telefone é obrigátório"),
  KeyPix: Yup.string().required("O campochave pix é obrigátório"),
});


function onSubmit(values, { setErrors }) {
  const authRegister = useRegisterStore();
  const { password, lastname, firstname, email, phone, KeyPix } = values;
  return authRegister.register(password, lastname, firstname, email, phone, KeyPix)
}
</script>

<template>
  <div class="flex items-center h-screen w-screen p-6">
    <div class="w-[50%] h-full flex items-center justify-center p-4">
      <img src="../assets/register.svg" alt="">
    </div>
    <div class="w-[50%] h-full  flex items-center justify-center ">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="w-full p-6 text-xs space-y-6">
        <div>
          <label>E-mail</label>
          <Field name="email" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.email }" />
          <div class="text-xs text-red-500 uppercase">{{ errors.email }}</div>
        </div>

        <div>
          <label>Password</label>
          <Field name="password" type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.password }" />
          <div class="text-xs text-red-500 uppercase">{{ errors.password }}</div>
        </div>

        <div>
          <label>Primeiro nome</label>
          <Field name="lastname" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.lastname }" />
          <div class="text-xs text-red-500 uppercase">{{ errors.lastname }}</div>
        </div>

        <div>
          <label>Segundo nome</label>
          <Field name="firstname" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.firstname }" />
          <div class="text-xs text-red-500 uppercase">{{ errors.firstname }}</div>
        </div>

        <div>
          <label>Celular</label>
          <Field name="phone" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.phone }" />
          <div class="text-xs text-red-500 uppercase">{{ errors.phone }}</div>
        </div>

        <div>
          <label>Chave PIX</label>
          <Field name="KeyPix" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.KeyPix }" />
          <div class="text-xs text-red-500 uppercase">{{ errors.KeyPix }}</div>
        </div>

        <div class="flex space-x-2 mt-4 items-center">
          <button class="bg-yellow-500 hover:bg-yellow-500/80 p-4 rounded uppercase font-bold text-gray-700 cursor-pointer" 
            :disabled="isSubmitting">
            <span v-show="isSubmitting" class="bg-green-500"></span>
            Resgistrar-se
          </button>
          <RouterLink to="/login" clRouterLinkss="text-blue-800 hover:text-blue-800/80">
            Já possui uma conta?
          </RouterLink>
        </div>

      </Form>

    </div>
  </div>
</template>