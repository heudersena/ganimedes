import { createRouter, createWebHistory } from 'vue-router';
import beforeEach from './beforeEach';

import LoginComponent from '../components/Layout/LoginComponent.vue';
import HomeComponent from '../components/Layout/HomeComponent.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'text-yellow-500',
    linkExactActiveClass: 'text-yellow-500',
    routes: [
        {
            path: '/',
            component: LoginComponent,
            children: [
                {
                    path: '/',
                    name: 'login',
                    component: () =>
                        import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
                },
            ],
        },
        {
            path: '/',
            component: HomeComponent,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () =>
                        import(/* webpackChunkName: "login" */ '../views/HomeView.vue'),
                },
                {
                    path: '/saque',
                    name: 'saque',
                    component: () =>
                        import(/* webpackChunkName: "login" */ '../views/SaqueView.vue'),
                },
                {
                    path: '/saque-completed',
                    name: 'saque-completed',
                    component: () =>
                        import(/* webpackChunkName: "login" */ '../views/saque/SaqueCompletedView.vue'),
                },
                {
                    path: '/saque-editar/:id/:keycloakid',
                    name: 'saque-editar',
                    component: () =>
                        import(/* webpackChunkName: "login" */ '../views/saque/SaqueEditView.vue'),
                },
                {
                    path: "/listagem-de-saques",
                    name: "listagem-de-saques",
                    component: () => import(/* webpackChunkName: "ListagemView" */ '../modules/saques/view/ListagemView.vue'),
                },
                {
                    path: "/saques/editar/:id",
                    name: "saques-editar",
                    component: () => import(/* webpackChunkName: "saques-editar" */ '../modules/saques/view/EditarView.vue'),
                },
            ],
        },
    ],
});

router.beforeEach(beforeEach);

export default router;
