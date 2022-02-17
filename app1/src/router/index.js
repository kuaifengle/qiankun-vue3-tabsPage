
const appPath = '/app1'

const routes = [
  {
    path: appPath + '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: appPath + '/user',
    name: 'User',
    component: () => import( /* webpackChunkName: "user" */ '../views/user.vue')
  }
]


export default routes