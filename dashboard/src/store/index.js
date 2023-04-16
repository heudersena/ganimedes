import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';
import secureLS from 'secure-ls';

import auth from './modules/auth';
import transaction from './modules/transaction';
import menu from './modules/menu';
import saque from './modules/saque';

const ls = new secureLS({ isCompression: false, encodingType: 'aes' });
const CHAVE_LOCAL = 'c7dc0ec8-e4d1-4782-856f-b697c7c4c812';

console.log(localStorage.getItem(CHAVE_LOCAL));

export const store = createStore({
    strict: true,
    modules: {
        auth,
        transaction,
        menu,
        saque
    },
    plugins: [
        persistedstate({
            key: CHAVE_LOCAL,
            paths: ['transaction', 'auth', 'menu'],
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ],
});
