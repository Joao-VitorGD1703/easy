import { createRouter, createWebHistory } from 'vue-router'
// import { useLoad } from '@/composables/auth'
// import { useCleanInputs } from '@/composables/validationForm'

const allowedRoutes = ['/', '/login', '/forgot-password', '/reset-password']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Specify history mode
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    // { path: '/:pathMatch(.*)*', component: () => import('../views/Home.vue')},
    { path: '/', component: () => import('../views/Home.vue')},
   
  ]
})

export default router