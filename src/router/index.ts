import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/َAuth/SignUp.vue'
import SignIn from '../views/َAuth/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'MainLayouts'
      }
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp,
      meta: {
        layout: 'AuthLayout'
      }
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn,
      meta: {
        layout: 'AuthLayout'
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('token')

  if (to.name === 'SignIn' || to.name === 'SignUp') {
    if (isAuthenticated) {
      return next('/')
    } else {
      return next()
    }
  }
  if (!isAuthenticated && to.name !== 'SignIn') {
    return next('/SignIn')
  }

  return next()
})



export default router
