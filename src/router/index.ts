import { createRouter, createWebHistory } from 'vue-router'
// import NProgress from 'nprogress'
// if (!NProgress.isStarted()) {
//   NProgress.start()
// }
// NProgress.done()
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/About.vue')
        }
      ]
    }
  ]
})

export default router
