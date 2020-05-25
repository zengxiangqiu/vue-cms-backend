import VueRouter from 'vue-router'

const Tags = () => import('@/components/Tags')
const Menu = () => import('@/views/Menu')
const Entries = () => import('@/components/Entries')
const EntryEdit = () => import('@/components/EntryEdit')
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')

const routes = [
  {
    path:'/login',
    component: Login,
  },
  {
    path:'/',
    components:{
      default: Home
    },
    meta:{
      requireAuth:  true
    },
    children:[
      {
        path: 'menus',
        components: {
          default: Menu
        },
      },
      {
        path: 'entries',
        name: 'Entries',
        components: {
          default: Entries
        },
        children:[
          {
            path: ':id',
            name: 'EntryEdit',
            components: {
              default: EntryEdit
            },
          }
        ]
      },
      {
        path: '/:mc',
        component: Tags,
        props: (route) => ({
          mc: route.params.mc
        })
      },
    ]
  },
  {
    path:'*',
    component: ()=>import('../components/404')
  }
]

var router = new VueRouter({
  mode: 'history',
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


router.beforeEach((to , from ,next)=>{
  const token = localStorage.getItem('token');
  if(to.meta.requireAuth){
    if(token){
      next();
    }
    else{
      next({
        path: '/login',
        query:{ redirect: to.fullPath}
      })
    }
  }
  else{
    next();
  }
})

export default router;