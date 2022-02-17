const appPath = '/app2'
const routes = [{
    path: appPath + '/user',
    name: 'User',
    component: () => import( /* webpackChunkName: "about" */ '../views/user/user.vue'),
    meta: {
      childrenName: ['UserDetail']
    }
  },
  {
    path: appPath + '/user/detail',
    name: 'UserDetail',
    component: () => import( /* webpackChunkName: "about" */ '../views/user/userDetail.vue'),
    meta: {
      parentName: 'User',
    }
  },
  {
    path: appPath + '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/about.vue')
  }
]

export default routes