import { createRouter, createWebHistory } from 'vue-router';
import beforeEach from './beforeEach';

import LoginComponent from '../components/Layout/LoginComponent.vue';
import HomeComponent from '../components/Layout/HomeComponent.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'bg-gray-500/80',
    linkExactActiveClass: 'bg-gray-500/80',
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
            ],
        },
    ],
});

router.beforeEach(beforeEach);

export default router;
