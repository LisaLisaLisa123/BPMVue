import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/pages/home'
import login from '../views/login'
import menuTitle from './menu'

Vue.use(VueRouter)

const routes = [
  ...menuTitle,

  {
    path: '/',
    redirect: '/Login' 
  },
  {
    path: '/Login',
    name: 'login',
    component: login
  }, 
  {
    path: '/Home',
     //name: "Home",
    component: Home
  }, 
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
