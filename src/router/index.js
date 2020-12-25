import Vue from 'vue';
import VueRouter from 'vue-router';
// import Dashboard from '../components/dashboard/Dashboard'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../components/dashboard/Dashboard'),
    children: [
      {
        path: '',
        name: 'security',
        component: () => import('../components/dashboard/security')
      },
      {
        path: '',
        name: 'monitoring',
        component: () => import('../components/dashboard/monitoring')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
