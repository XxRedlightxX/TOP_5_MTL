// Composables
import { createRouter, createWebHistory } from "vue-router";
import "vuetify/dist/vuetify.css";

const routes = [
  {
    path: "/",
    //component: () => import('@/layouts/default/Default.vue'),
    children: [
      // Vue : MenusView
      {
        path: "/",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/MenusView/HomeView.vue"),
      },
      {
        path: "/Events",
        name: "Events",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/MenusView/AllEventsView.vue"),
      },

      {
        path: "/Login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/MenusView/AllEventsView.vue"),
      },
      {
        path: "/Profile",
        name: "Profile",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/MenusView/Login-ProfileView.vue"),
      },

      // Vue : OtherView
      {
        path: "/Event",
        name: "Event",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/OtherView/EventView.vue"),
      },
      {
        path: "/Event Organisator",
        name: "Event Organisator",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/OtherView/EventOrganisatorView.vue"),
      },

      // Vue : ProfilesView
      {
        path: "/Gestion Profile",
        name: "Gestion Profile",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/ProfilesView/GestionProfileView.vue"),
      },

      // Vue : ErroView
      {
        path: "/error",
        name: "error",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/ErrorView.vue"),
      },
      {
        path: "/Logo",
        name: "Logo",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/OtherView/LogoView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
