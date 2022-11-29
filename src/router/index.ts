import { createRouter, createWebHistory } from "vue-router"
import LoginView from "../views/LoginView.vue"
import ResetPasswordView from "../views/ResetPasswordView.vue"
import SetPasswordView from "../views/SetPasswordView.vue"
import DashboardView from "../views/DashboardView.vue"
import NotFound from "../views/NotFound.vue"
import { authedUser } from '@/firebase/firebaseConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: "/:pathMatch(.*)*", 
      name: "not-found", 
      component: NotFound, 
  },
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/reset",
      name: "reset",
      component: ResetPasswordView,
    },
    {
      path: "/update",
      name: "update",
      component: SetPasswordView,
    },
  ],
})

// If not signed in re-direct to login 
router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(val => val.meta.requiresAuth)
  const isLoggedIn = await authedUser()
  
  if (requiresAuth && !isLoggedIn) next({ path: '/login', query: { redirect: to.fullPath } })
  else if (!requiresAuth && isLoggedIn) next('/')
  else if (!requiresAuth && !isLoggedIn) next()
  else next()
})

export default router;
