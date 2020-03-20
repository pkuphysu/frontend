import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  //   meta: {
  //     title: 'Home'
  //   }
  // },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login')
  },
  {
    path: '/bookB116',
    name: 'bookingIndex',
    component: () =>
      import(/* webpackChunkName: "bookingIndex" */ '@/views/BookingIndex')
  },
  {
    path: '/bookB116/book',
    name: 'bookingMain',
    component: () =>
      import(/* webpackChunkName: "bookingMain" */ '@/views/BookingMain')
  },
  {
    path: '/html/:src',
    name: 'markdownView',
    props: true,
    component: () =>
      import(/* webpackChunkName: "markdown" */ '@/views/MarkdownView')
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */'@/views/Error')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
