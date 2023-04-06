<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
    <div class="flex h-full">
        <div class="md:w-[30%]  h-full flex items-center justify-end relative border border-r-gray-200"
            :class="$route.name === 'me' ? 'text-red-500' : 'text-purple-500'">
            <RouterLink to="/" class="absolute top-6 mr-3 flex space-x-4 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>Voltar</span>
            </RouterLink>
        </div>
        <div class="ml-4">
            <div class="font-bold mt-11">Meu perfil</div>
            <div
                class="rounded-full w-[90px] h-[90px]  mr-3 bg-gray-400 flex items-center justify-center  border border-spacing-11 border-[#7159C1]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-white cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>

            </div>
            $route.name: {{ $route.name }}
        </div>
    </div>
</template>