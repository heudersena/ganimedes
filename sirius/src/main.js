import { createApp } from 'vue'
import { createPinia } from 'pinia';
import VueSocketIO from 'socket.io-client'

import './assets/style.css'

import App from './App.vue'
import { router } from './helpers';
import api from './plugins/axios';

const app = createApp(App);

app.config.globalProperties.$axios = api

const socketIo = VueSocketIO("http://192.168.0.111:4005")
if (!socketIo.socket) {
    socketIo.connect();
}
app.config.globalProperties.$socket = socketIo

app.use(createPinia());
app.use(router);

app.mount('#app');
