import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/bookB116',
    name: 'bookingIndex',
    component: () => import('@/views/BookingIndex')
  },
  {
    path: '/bookB116/book',
    name: 'bookingMain',
    component: () => import('@/views/BookingMain')
  },
  {
    path: '/html/:src',
    name: 'markdownView',
    props: true,
    component: () => import('@/views/MarkdownView')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
