import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/intents/tables',
        component: () => import('../pages/intents/tables/Layout.vue'),
        children: [
            {
                path: '/',
                redirect: '/intent1'
            },
            {
                path: 'intent1',
                component: () => import('../pages/intents/tables/Intent1.vue')
            },
            {
                path: 'intent2',
                component: () => import('../pages/intents/tables/Intent2.vue')
            },
            {
                path: 'intent3',
                component: () => import('../pages/intents/tables/Intent3.vue')
            },
            {
                path: 'intent4',
                component: () => import('../pages/intents/tables/Intent4.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router