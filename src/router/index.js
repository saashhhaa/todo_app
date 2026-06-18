
import { createRouter, createWebHashHistory } from 'vue-router';
import Homepage from '../pages/Homepage.vue'
import AllTasks from '../pages/AllTasks.vue';
import Settings from '../pages/Settings.vue';
import Login from '../pages/Login.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'login',
      component: Login
    },
    {
      path: '/homepage',
      name:'homepage',
      component: Homepage
    },
    {
      path: '/settings',
      name:'settings',
      component: Settings
    },
    {
      path: '/allTasks',
      name:'allTasks',
      component: AllTasks
    }
  ]
})

export default router


