<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useAuthStore } from "@/stores";
import axios from "axios";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function onSubmit(values, { setErrors }) {
  const authStore = useAuthStore();
  const { username, password } = values;
  return authStore
    .login(username, password)
    .catch((error) => setErrors({ apiError: error }));
}
</script>


<template>
  <div class="flex">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div>
        <label>Username</label>
        <Field
          name="username"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'is-invalid': errors.username }"
        />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div>
        <label>Password</label>
        <Field
          name="password"
          type="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div>
        <button :disabled="isSubmitting">
          <span v-show="isSubmitting"></span>
          Login
        </button>
      </div>

      <div v-if="errors.apiError">
        {{ errors.apiError }}
      </div>
    </Form>
  </div>
</template>