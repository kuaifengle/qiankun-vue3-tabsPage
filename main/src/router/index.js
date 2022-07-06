import {
  createRouter,
  createWebHistory
} from 'vue-router'

// import store from '@/store/index.js'

import Layout from '@/components/layout/index.vue'
import Child from '@/views/child.vue'
import Home from '../views/home.vue'
import tabs from '../qiankun/tabs'


const routes = [{
  path: '/',
  name: 'Layout',
  component: Layout,
  children: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import( /* webpackChunkName: "about" */ '../views/about.vue'),
      meta: {
        title: '关于'
      }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import( /* webpackChunkName: "user" */ '../views/user.vue'),
      meta: {
        title: '用户'
      }
    },
    {
      path: '/app1:pathMatch(.*)',
      component: Child
    },
    {
      path: '/app2:pathMatch(.*)',
      component: Child
    },
    {
      path: '/app3:pathMatch(.*)',
      component: Child
    }
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/views/404.vue')
    // }
  ]
}]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'development' ? '' : '/qiankun-vue3-tabsPage-demo'),
  routes
})

router.beforeEach((to, _form, next) => {
  if (to.fullPath === _form.fullPath) {
    return
  }
  tabs.openTab({
    ...to,
    next
  })
})

// 页面进入之后
router.afterEach(() => {})

export default router;