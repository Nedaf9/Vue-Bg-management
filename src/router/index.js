import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'


Vue.use(VueRouter)
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location){
  return originalPush.call(this,location).catch((err) =>{})
};



const routes = [
  {
    path: '/',
<<<<<<< HEAD
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
=======
    name: 'Login',
    component: Login
>>>>>>> 30981ac2199038667878f050de74c24b72886161
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Dashboard'),
    children:[
          {
            path:"/",
            component: ()=>import("../components/Home"),
            meta:[{name:"首页",to:""}]
          },
          {
            path:"/Website",
            component: ()=>import("../components/Home"),
            meta:[{name:"网站",to:""}]
          },
          {
            path:"/exit",
            component: ()=>import("/"),
            meta:[{name:"FTP",to:""}]
          },
    ],
  
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function(to,from,next){
     console.log("全局前置导航守卫");
     let is_login = localStorage.getItem("is_login");
     if(is_login || to.path === "/"){
        next();
     }else {
       next("/"); //否则情况下跳转登录页面
     }
})
export default router
