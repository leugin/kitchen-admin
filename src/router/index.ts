import { createRouter, createWebHistory } from 'vue-router'
import AuthenticateLayout from '../components/layout/AuthenticateLayout.vue'
import ChekAuth from "@/middleware/ChekAuth";

export enum RouterAlias {
  KITCHEN = 'kitchen',
  HISTORICAL = 'historical',
  LOGIN = 'login'
}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AuthenticateLayout,
      children: [
        {
          path:'/',
          name:RouterAlias.KITCHEN,
          component: () => import('../views/KitchenView.vue')
        },
        {
          path:'/historical',
          name:RouterAlias.HISTORICAL,
          component: () => import('../views/HistoricalView.vue')
        }
      ]
    },
    {
      path: '/auth/login',
      name: RouterAlias.LOGIN,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    }
  ]
})
router.beforeEach(ChekAuth)
export default router
