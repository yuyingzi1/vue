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
        {path: 'productCategorization', component: () => import(/* webpackChunkName: "about" */ '@/views/manager/ProductCategorization.vue')},
        {path: 'notice', component: () => import(/* webpackChunkName: "about" */ '@/views/manager/Notice.vue')},
      ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由守卫
router.beforeEach((to ,from, next) => {
  if (to.path === '/') {
    return next("/login");
  }
  let user = localStorage.getItem("user");
  if (!user && to.path !== '/login' && to.path !== '/register' && to.path !== '/front/index') {
    return next("/login");
  }
  next();
})
export default router
