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
<<<<<<< HEAD
        path: '',
        name: 'security',
        component: () => import('../components/dashboard/security')
      },
      {
        path: '',
        name: 'monitoring',
        component: () => import('../components/dashboard/monitoring')
=======
        path: '/ftp',
        name: 'ftp',
        component: () => import('@/components/dashboard/ftp')
      }, {
        path: '/project',
        name: 'Project',
        component: () => import('@/components/dashboard/Project')
      }, {
        path: '/set',
        name: 'Set',
        component: () => import('@/components/dashboard/Set')
      }, {
        path: '/apps',
        name: 'apps',
        component: () => import('../components/dashboard/apps')
      }, {
        path: 'pages',
        name: 'pages',
        component: () => import('../components/dashboard/pages')
>>>>>>> 516cae988210bfeb52a51a0f381c6f19f558c7d1
      }
      , {
        path: '/document',
        name: 'Document',
        component: () => import('@/components/dashboard/Document')
      },

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
