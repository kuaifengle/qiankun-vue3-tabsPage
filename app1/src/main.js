import './public-path';

import {
    createApp,
    h
} from 'vue';
import {
    createRouter,
    // createWebHashHistory
    createMemoryHistory
} from 'vue-router';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import routes from '@/router';
import App from '@/App.vue';
import store from '@/store/index.js'


let instance = null;
let router = null;

function render(props = {}) {
    const {
        container,
        path
        // onGlobalStateChange,
        // getGlobalState
    } = props;

    router = createRouter({
        history: createMemoryHistory(window.__POWERED_BY_QIANKUN__ ? `/app1` : `/subPages/app1/`),
        routes
    })

    instance = createApp({
        render: () => h(App),
        mounted() {}
    })

    instance.use(ElementPlus, {
        size: 'default',
        zIndex: 3000,
        locale: zhCn
    })

    instance.use(store)
    instance.use(router)
    instance.mount(container ? container.querySelector('#app1') : '#app1');

    path && router.replace(path)
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
    console.log(props)

    render(props);
}
export async function update(props) {
    console.log('update props', props);
    let {
        path
    } = props
    path && router.push(path)
    console.log(path)
}

export async function unmount() {
    console.log('app1销毁了')
    instance.unmount();
    instance._container.innerHTML = '';
    instance = null;
    router = null;
}