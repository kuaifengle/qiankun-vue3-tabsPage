// import Home from '../views/Home.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/app2/user',
    name: 'User',
    component: () => import( /* webpackChunkName: "about" */ '../views/user/user.vue'),
    meta: {
      childrenName: ['UserDetail']
    }
  },
  {
    path: '/app2/userDetail',
    name: 'UserDetail',
    component: () => import( /* webpackChunkName: "about" */ '../views/user/userDetail.vue'),
    meta: {
      parentName: 'User',
    }
  },
  {
    path: '/app2/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// export const beforeEach = (router) => {

// }


export default routes