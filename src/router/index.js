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
<<<<<<< HEAD
        name: 'Database',
        component: () => import('../components/dashboard/Database')
      }
=======
        name: 'ftp',
        component: () => import('../components/dashboard/ftp')
      },

>>>>>>> 53584fe0bbf7b54e7bd53f397c17b25c00c7271b
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
