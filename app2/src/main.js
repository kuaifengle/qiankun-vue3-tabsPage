import './public-path';

import {
    createApp,
    h
} from 'vue';
import {
    createRouter,
    createMemoryHistory
} from 'vue-router';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import routes from '@/router';
import App from '@/App.vue';
import store from '@/store/index.js'
import action from '@/shared/action.js';

let instance = null;
let router = null;

function render(props = {}) {
    const {
        container,
        $parentRouter,
        routerEvent,
    } = props;

    router = createRouter({
        history: createMemoryHistory(window.__POWERED_BY_QIANKUN__ ? '' : `/subPages/app2/`),
        routes
    })

    router.beforeEach((to, _form, next) => {
        if (_form.path !== '/') {
            if (to.path === '/empty') {
                next()
                return
            }
            let {
                parentName,
                childrenName
            } = to.meta

            // 判断如果是父级跳转子集页面 或者 子集跳转父级页面
            if ((parentName && parentName === _form.name) || (childrenName && childrenName.some((item) => item === _form.name)) || (parentName && _form.meta.parentName && parentName === _form.meta.parentName)) {
                store.commit('CLOSE_KEEPALIVE_LIST', _form)
                store.commit('PUSH_KEEPALIVE_LIST', to['name'])
                action.setGlobalState({
                    changeMicoTabsPath: {
                        to: to,
                        appName: 'app2',
                        type: "change"
                    }
                })
            }
        }

        next()
    })

    instance = createApp({
        render: () => h(App),
        methods: {}
    })

    // 定义父组件路由对象
    instance.config.globalProperties.$parentRouter = $parentRouter

    instance.use(ElementPlus, {
        size: 'default',
        zIndex: 3000,
        locale: zhCn
    })

    instance.use(store)
    instance.use(router)

    instance.mount(container ? container.querySelector('#app2') : '#app2');
    if (routerEvent) {
        // 如果首次跳转子页面就直接跳到父级页面 
        let path = routes.find(item => item.path === routerEvent.path)
        // 页面路由跳转加上?mustJump=true  可以强制跳转子页面
        if ((path && path.mate && path.meta.parentName) && !(routerEvent && routerEvent.query && routerEvent.query.mustJump)) {
            let parent = routes.find(item => item.name === path['meta']['parentName'])
            $parentRouter.push(parent.path)
            store.commit('PUSH_KEEPALIVE_LIST', parent.name)
            action.setGlobalState({
                changeMicoTabsPath: {
                    to: {
                        path: parent.path,
                        fullPath: parent.path,
                        query: {},
                    },
                    appName: 'app2',
                    type: "change"
                }
            })
            return
        } else {
            // 否者 首次加载微页面
            router.push({
                path: routerEvent.fullPath,
                query: routerEvent.query
            })
            let find = routes.find(item => item.path === routerEvent.path)
            find && store.commit('PUSH_KEEPALIVE_LIST', find.name)
        }

        requestAnimationFrame(() => {
            action.setGlobalState({
                changeMicoTabsPath: {
                    type: "changeLoading",
                    loading: false
                }
            })
        })
    }
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    // console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
    // console.log('[vue] props from main framework', props);
    action.setActions(props)
    console.log('app2  渲染')

    render(props);
}

export async function update(props) {
    // console.log('update props', props);
    let {
        routerEvent
    } = props

    if (routerEvent) {
        switch (routerEvent.type) {
            case 'push': {
                router.push(routerEvent.fullPath)
                store.commit('PUSH_KEEPALIVE_LIST', routes.find(item => item.path === routerEvent.path)['name'])
            }
            break
        case 'replace': {
            router.replace(routerEvent.fullPath)
        }
        break
        case 'close': {
            store.commit('CLOSE_KEEPALIVE_LIST', routes.find(item => item.path === routerEvent.path))
        }
        break
        case 'visible': {
            router.push('/empty')
        }
        break
        }
    }
}


export async function unmount() {
    instance.unmount();
    instance._container.innerHTML = '';
    instance = null;
    router = null;
}