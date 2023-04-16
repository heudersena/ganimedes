import { createApp } from 'vue';
import VueSocketIO from 'socket.io-client';
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
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

app.use(router)
app.use(store)
app.use(createVfm())
app.mount('#app');

// https://youtu.be/6JK0WJG9JIs
// https://gitlab.com/DanCruise/laraproducts