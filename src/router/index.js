import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/manager/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/login', name: 'login', component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')},
  {path: '/register', name: 'register', component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')},
  {path: '/manager', name: 'manager', component: () => import(/* webpackChunkName: "about" */ '../views/MangerLaout.vue'),
      children: [
        {path: 'home', component: () => import(/* webpackChunkName: "about" */ '@/views/manager/HomeView.vue')},
        {path: 'about', component: () => import(/* webpackChunkName: "about" */ '@/views/manager/AboutView.vue')},
        {path: 'admin', component: () => import(/* webpackChunkName: "about" */ '@/views/manager/Admin.vue')},
          {path: 'user', component: () => import(/* webpackChunkName: "about" */ '@/views/manager/User.vue')},
      ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
