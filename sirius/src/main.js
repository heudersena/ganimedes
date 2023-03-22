import { createApp } from 'vue'
import { createPinia } from 'pinia';

import './assets/tailwindcss.css'

import App from './App.vue'
import { router } from './helpers';
import api from './plugins/axios';

const app = createApp(App);

app.config.globalProperties.$axios = api

app.use(createPinia());
app.use(router);

app.mount('#app');
