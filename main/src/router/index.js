import {
  createRouter,
  createWebHistory
} from 'vue-router'

// import store from '@/store/index.js'

import Layout from '@/components/layout/index.vue'
import Child from '@/views/child.vue'
import Home from '../views/Home.vue'
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
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import( /* webpackChunkName: "about" */ '../views/User.vue'),
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
  }
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/views/404.vue')
    // }
  ]
}]

const router = createRouter({
  history: createWebHistory(),
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
router.afterEach(() => { })

export default router;