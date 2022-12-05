import { createRouter, createWebHashHistory } from "vue-router"
import LoginView from "../views/LoginView.vue"
import ResetPasswordView from "../views/ResetPasswordView.vue"
import SetPasswordView from "../views/SetPasswordView.vue"
import DesignView from "../views/DesignView.vue"
import DependencyList from "../views/DependencyList.vue"
import NotFound from "../views/NotFound.vue"
import { authedUser } from '@/firebase/firebaseConfig'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: "/",
      name: "dashboard",
      component: DependencyList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/design",
      name: "design",
      component: DesignView,
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
    { 
      path: "/:pathMatch(.*)", 
      name: "not-found", 
      component: NotFound, 
  },
  ],
})

// If not signed in re-direct to login 
router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(val => val.meta.requiresAuth)
  const isLoggedIn = await authedUser()
  
  // User requires auth and is not signed in (occurs on the Login screen before auth)
  if (requiresAuth && !isLoggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } // User does not require auth and is signed in (occurs on Login screen after auth)
  else if (!requiresAuth && isLoggedIn) {
    next('/')
  } // User does not require auth and is not signed in 
  else if (!requiresAuth && !isLoggedIn) {
    next()
  } // Any other scenario
  else next()
})

export default router;
