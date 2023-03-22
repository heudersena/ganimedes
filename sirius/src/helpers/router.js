import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores';

import { HomeView, LoginView, RegisterView } from '@/views';

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: HomeView },
        { path: '/login', component: LoginView },
        { path: '/register', component: RegisterView }
    ]
});





router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();    

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        window.document.location.href = "/login"
    }

});