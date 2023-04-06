import { createRouter, createWebHistory } from 'vue-router';


import { HomeView, LoginView, RegisterView, DespositView, SaqueView, MeView } from '@/views';

import Guard from "../service/middleware"

import DashboardLayout from "../components/Layout/DashboardLayout"
import LoginLayout from "../components/Layout/LoginLayout"
import MeLayout from "../components/Layout/MeLayout"

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'bg-teal-500/80',
    linkExactActiveClass: 'bg-teal-500/80',
    routes: [
        {
            path: '/',
            component: DashboardLayout,
            beforeEnter: Guard.redirectIfNotAuthenticated,
            children: [
                {
                    path: "/",
                    name: "index",
                    component: HomeView
                },
                {
                    path: "/deposit",
                    name: "deposit",
                    component: DespositView
                },
                {
                    path: "/saque",
                    name: "saque",
                    component: SaqueView
                }

            ]
        },
        {
            path: '/me',
            component: MeLayout,
            beforeEnter: Guard.redirectIfNotAuthenticated,
            children: [
                {
                    path: "",
                    name: "me",
                    component: MeView
                }
            ]

        },
        {
            path: '/login',
            component: LoginLayout,
            beforeEnter: Guard.redirectIfAuthenticated,
            children: [{
                path: "",
                name: "login",
                component: LoginView
            }]
        },
        {
            path: '/register',
            component: RegisterView
        }
    ]
});





// router.beforeEach(async (to) => {
//     const publicPages = ['/login', '/register'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth = useAuthStore();

//     if (authRequired && !auth.user) {
//         auth.returnUrl = to.fullPath;
//         window.document.location.href = "/login"
//     }

// });