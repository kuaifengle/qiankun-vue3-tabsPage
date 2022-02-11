# qiankun-vue3-tabsPage
qiankun+vue3.0+vue-router4.0+ vuex4.0 实现tabs标签的路由切换

### 使用方法
```
    每个vue文件都要定义 [name] 属性, 并且要与 router/index.js 内部定义页面参数的 [name] 相同 如:
    export default {
        name: 'App1Detail',
        setup() {},
        methods: {}
    }

    ...
     routes = [
        {
            path: appPath + '/detail',
            name: 'App1Detail',
            component: () => import( '@/views/app1/detail.vue'),
            meta: {
                childrenName: ['Zftdcrzrsfsb', 'Zffcjysbhzlfsb']
            }
        }
     ]
```

### 路由使用方法
```
router.push 只能用于跳转当前微应用页面

跳转非当前微应用的其他路由页面, 如
    import { getCurrentInstance } from 'vue'
    const instance = getCurrentInstance()
    let jump = () => {
     instance.appContext.config.globalProperties.$parentRouter.push('/home')
    }

关闭当前活跃tab
    store.dispatch('global/setGlobalState', {
        changeMicoTabsPath: {
            type: "closeActiveTab"
        }
    })

```