import { createApp } from 'vue';
import VueSocketIO from 'socket.io-client';
import App from './App.vue';
import router from './router';
import { store } from './store';
import './assets/base.css';

const socketIo = VueSocketIO('http://192.168.0.111:4005');

const app = createApp(App);

if (!socketIo.socket) {
    socketIo.connect();
}
app.config.globalProperties.$socket = socketIo;

app.use(router).use(store).mount('#app');
