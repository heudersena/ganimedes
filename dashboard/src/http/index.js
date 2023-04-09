import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const http = Vue.http;

Vue.http.options.root = 'http://192.168.0.111:4005';

export { http };
