## Vue3.0 + qiankun.js 实现多tab标签页路由切换

演示地址 [https://kuaifengle.github.io/qiankun-vue3-tabsPage-demo](https://kuaifengle.github.io/qiankun-vue3-tabsPage-demo)

```
原理是通过监听主应用的vue-router的 router.beforeEach 方法来动态加载(loadMicroApp)微应用页面
用vuex来管理已加载的微应用和tab标签数据
监听用initialState的变化来执行对微页面内部的路由跳转
用keep-alive来缓存主应用和微应用的页面
关闭微应用页面的tab时修改keep-alive的值并判断是否需要销毁微应用
```

```
各依赖版本
"element-plus": "^1.3.0-beta.5",
"qiankun": "^2.6.3",
"vue": "^3.0.0",
"vue-router": "^4.0.0-0",
"vuex": "^4.0.0-0"
```

#### Gif演示

<img src="https://github.com/kuaifengle/qiankun-vue3-tabsPage/blob/master/gif/1.gif?raw=true" width="100%"/>
<img src="https://github.com/kuaifengle/qiankun-vue3-tabsPage/blob/master/gif/3.gif?raw=true" width="100%"/>
<img src="https://github.com/kuaifengle/qiankun-vue3-tabsPage/blob/master/gif/4.gif?raw=true" width="100%"/>
<img src="https://github.com/kuaifengle/qiankun-vue3-tabsPage/blob/master/gif/5.gif?raw=true" width="100%"/>

#### 路由配置修改
```
主应用使用的是: createWebHistory();
微应用使用的是: createMemoryHistory(window.__POWERED_BY_QIANKUN__ ? '' : `/subPages/app1/`);

每个vue文件都要定义 [name] 属性, 并且要与 router/index.js 内部定义页面参数的 [name] 相同 如:
lib: src/views/user.vue
export default {
    name: 'App1Detail',         >>>=====|
    setup() {},                         |
    methods: {},                        |
    ...                                 |
}                                       |
                                        |=====>>>  2个name的值要相同
...                                     |
lib: src/router/index.js                |
routes = [                              |
    {                                   |
        path: appPath + '/detail',      |
        name: 'App1Detail',     <<<=====|
        component: () => import( '@/views/app1/detail.vue')
    }
]
```

###  路由使用方法
#### 主应用中路由跳转
```
主应用使用的是原生的vue-router的方法
无论是在主应用中跳转主应用页面          主=>主应用页面
还是在主应用中跳转微应用页面            主=>微应用页面

router.push()
router.replace()
router.go(-1)
...
```
#### 微应用中路由跳转
```
微应用跳转自身页面也和原生的vue-router的使用方法一致
参考lib: app2/src/views/user/**

router.push()
router.replace()
router.go(-1)
...

============================ 分割线  =================================

从A微应用跳转B微应用的子页面, 如:
参考lib: app1/src/views/about.vue
...
    import { getCurrentInstance } from 'vue'

    setup() {
        const instance = getCurrentInstance()

        let jump = () => {
            instance.appContext.config.globalProperties.$parentRouter.push('/app2/user')
        }

        return {
            jump
        }
    }
...

============================ 分割线  =================================

在微应用中关闭当前活跃的tab标签,如:
参考lib: app1/src/views/user.vue

    let closeActiveTab = () => {
    action.setGlobalState({
        changeMicoTabsPath: {
            type: 'closeActiveTab',
        },
    })
}

============================ 分割线  =================================

在微应用中关闭当前已加载的其他tab标签,如:
参考lib: app1/src/views/user.vue

let closeOtherTab = () => {
    action.setGlobalState({
        changeMicoTabsPath: {
            type: 'closeOtherTab',
            path: '/app1/about',
        },
    })
}

```

如果觉得有用的话,还请给个Star😁😁😁
