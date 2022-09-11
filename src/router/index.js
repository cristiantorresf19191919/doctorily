import { createRouter, createWebHistory } from 'vue-router'
import PostsView from '../views/PostsView.vue'
import PostView from '../views/PostView.vue'
import AuthorView from '../views/AuthorView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import FormPatientView from '../views/FormPatientView.vue'
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

const router = createRouter({
  history: createWebHistory(), 
  routes: [
    {
      path: '/',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: FormPatientView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/authors',
      name: 'authors',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthorsView.vue')
    },
    { path: '/post/:id', name: 'post', component: PostView },
    { path: '/author/:username', name: 'author', component: AuthorView },
  ]
})

function getCurrentUser(){
  return new Promise((resolve,reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

async function guardRoute(to,from,next) {
  const hasRequiresAuthProp = to.matched.some( record => record.meta.requiresAuth );
  if (hasRequiresAuthProp) {
    if (await getCurrentUser()){
      next();
    } else {
      alert("You don't have access!");
      next("/login");
    }
  } else {
    next();
  }
}
// router.beforeEach(guardRoute);

export default router