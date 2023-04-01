<template>
  <div class="">

    <div class="flex items-center justify-center ">

      <div class="flex items-center mt-8 text-sm">
        <div class=" p-10">
          <!-- <img :src="'https://ui-avatars.com/api/?name='+users.first_name+users.second_name" class="rounded-full w-[130px]"> -->
          <img src="https://github.com/heudersena.png" class="rounded-full w-[130px]">
        </div>
        <div>
          <div class="flex space-x-4 text-md">
            <div class="font-bold">{{ users.email }}</div>
            <button class="py-1 px-2 rounded text-white text-[9px] bg-[#7159c1] hover:bg-[#7159c1]/80">Editar
              perfil</button>
            <button @click="authStore.logout()">
              <LogoutIcon class="text-yellow-500" />
            </button>
          </div>


          <div class="flex mt-2 space-x-4">
            <div class="flex items-center space-x-1">
              <CashMultipleIcon class="text-green-500" /> <span>{{ moneuBr(users.balance) }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <PlusCircleIcon class="text-blue-500" /> <span>{{ moneuBr(users.bonus) }}</span>
            </div>
          </div>
          <div class="mt-6 text-gray-400 text-xs">
            <div class="uppercase ">#id 54471-85465-96364-85h5-96584j</div>
            <div>{{ users.first_name }} {{ users.second_name }}</div>
            <div> {{ users.phone }}</div>
            <div>Chave Pix: {{ users.keyPix }}</div>
          </div>
          <div class="mt-2">
            <button v-if="!showOpenClose" @click="open()"
              class="flex items-center space-x-1  text-gray-500 hover:text-green-500 ">
              <CartIcon /> <span></span>
            </button>
            <button v-else @click="close()" class="flex items-center space-x-1 text-gray-500 hover:text-purple-500 ">
              <CartOffIcon /> <span></span>
            </button>
          </div>
        </div>
      </div>


    </div>
    <div class="w-[574px] m-auto">
      <div class="border-b border-gray-200"></div>
      <div>
        <NavigationComponent />
      </div>
      <RouterView />
    </div>
    <div v-show="showOpenClose" class="absolute top-0 right-0 w-[380px] bg-gray-200 h-full z-50">
      <FormDepositComponet />
    </div>
  </div>
</template>

        

<script setup>

import { RouterView, RouterLink } from "vue-router";
import LogoutIcon from "vue-material-design-icons/Logout.vue"
import CashSyncIcon from "vue-material-design-icons/CashSync.vue"
import PlusCircleIcon from "vue-material-design-icons/PlusCircle.vue"
import CashMultipleIcon from "vue-material-design-icons/CashMultiple.vue"
import CartIcon from "vue-material-design-icons/Cart.vue"
import CartOffIcon from "vue-material-design-icons/CartOff.vue"
import { useAuthStore } from "@/stores";

import { useAuth } from "../../composables/useAuth"
import { useOpenClose } from "../../composables/useOpenClose"

import MenuComponent from "../MenuComponent.vue"
import FormDepositComponet from "../FormDepositComponet.vue"
import NavigationComponent from "../NavigationComponent"


// Logount
const authStore = useAuthStore();

const { open, close, showOpenClose } = useOpenClose()
const { users } = useAuth()


function moneuBr(money) {
  return Number(money).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

</script>   