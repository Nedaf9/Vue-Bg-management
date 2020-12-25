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
    name: 'Login',
    component: Login
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
