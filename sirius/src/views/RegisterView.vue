<script setup>
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

import { useRegisterStore } from "@/stores";

function onSubmit(values, { setErrors }) {
  const authRegister = useRegisterStore();
  const { password, lastname, firstname, email, phone, KeyPix } = values;
  return authRegister
    .register(password, lastname, firstname, email, phone, KeyPix)
    .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ errors, isSubmitting }"
  >
    <label>E-mail</label>
    <Field
      name="email"
      type="text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'is-invalid': errors.email }"
    />
    <div class="invalid-feedback">{{ errors.email }}</div>

    <label>Password</label>
    <Field
      name="password"
      type="password"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'is-invalid': errors.password }"
    />
    <div class="invalid-feedback">{{ errors.password }}</div>

    <label>Primeiro nome</label>
    <Field
      name="lastname"
      type="text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'is-invalid': errors.lastname }"
    />
    <div class="invalid-feedback">{{ errors.lastname }}</div>
    <label>Segundo nome</label>
    <Field
      name="firstname"
      type="text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'is-invalid': errors.firstname }"
    />
    <div class="invalid-feedback">{{ errors.firstname }}</div>

    <label>Celular</label>
    <Field
      name="phone"
      type="text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'is-invalid': errors.phone }"
    />
    <div class="invalid-feedback">{{ errors.phone }}</div>

    <label>Chave PIX</label>
    <Field
      name="KeyPix"
      type="text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'is-invalid': errors.KeyPix }"
    />
    <div class="invalid-feedback">{{ errors.KeyPix }}</div>

    <button class="bg-green-500" :disabled="isSubmitting">
      <span v-show="isSubmitting" class="bg-green-500"></span>
      Resgistrar-se
    </button>

    <div v-if="errors.apiError">
      {{ errors.apiError }}
    </div>
  </Form>
</template>