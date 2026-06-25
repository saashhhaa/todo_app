import { createRouter, createWebHashHistory } from "vue-router";
import Homepage from "../pages/Homepage.vue";
import Login from "../pages/Login.vue";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/homepage",
      name: "homepage",
      component: Homepage,
    },
  ],
});

export default router;
