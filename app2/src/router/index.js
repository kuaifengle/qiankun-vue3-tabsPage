const appPath = '/app2'
const routes = [
  {
    path: appPath + '/user',
    name: 'User',
    component: () => import( /* webpackChunkName: "user" */ '@/views/user/user.vue'),
    meta: {
      childrenName: ['UserDetail', 'UserInfo']
    }
  },
  {
    path: appPath + '/user/detail',
    name: 'UserDetail',
    component: () => import( /* webpackChunkName: "about" */ '@/views/user/userDetail.vue'),
    meta: {
      parentName: 'User',
    }
  },
  {
    path: appPath + '/user/info',
    name: 'UserInfo',
    component: () => import( /* webpackChunkName: "about" */ '@/views/user/userInfo.vue'),
    meta: {
      parentName: 'User',
    }
  },
  {
    path: appPath + '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '@/views/about.vue')
  },
  {
    path: '/empty',
    name: 'Empty',
    component: () => import( /* webpackChunkName: "empty" */ '../views/empty.vue')
  }
]

export default routes