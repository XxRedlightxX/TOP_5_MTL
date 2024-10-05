// Composables
import { createRouter, createWebHistory } from 'vue-router'
import 'vuetify/dist/vuetify.css';

const routes = [
  {
    path: '/',
    //component: () => import('@/layouts/default/Default.vue'),
    children: [
                          // Vue : MenusView
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/MenusView/HomeView.vue'),
      },
      {
        path: '/Events',
        name: 'Events',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/MenusView/AllEventsView.vue'),
      },

      {
        path: '/Login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/MenusView/AllEventsView.vue'),
      },
      {
        path: '/Profile',
        name: 'Profile',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/MenusView/Login-ProfileView.vue'),
      },

                        // Vue : OtherView
      {
        path: '/Event/',
        name: 'Event',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/OtherView/EventView.vue'),
      },

                          // Vue : ProfilesView
      {
        path: '/Gestion Profile',
        name: 'Gestion Profile',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/ProfilesView/GestionProfileView.vue'),
      },
      {
        path: '/Gestion Event',
        name: 'Gestion Event',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/ProfilesView/GestionEventView.vue'),
      },
      {
        path: '/Add Event',
        name: 'Add Event',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/ProfilesView/AddEventView.vue'),
      },


                        // Vue : ErroView
      {
        path: '/error',
        name: 'error',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/ErrorView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router