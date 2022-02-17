import Home from '../views/Home.vue'

const appPath = '/app1'

const routes = [{
    path: appPath + '/',
    name: 'Home',
    component: Home
  },
  {
    path: appPath + '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: appPath + '/user',
    name: 'User',
    component: () => import( /* webpackChunkName: "about" */ '../views/user.vue')
  }
]


export default routes