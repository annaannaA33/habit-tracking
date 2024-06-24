import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import DayView from '../views/DayView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/day/:date',
    name: 'DayView',
    component: DayView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
