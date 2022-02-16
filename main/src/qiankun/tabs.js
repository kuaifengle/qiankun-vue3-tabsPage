import {
    loadMicroApp
} from 'qiankun';

import {
    menuTitleData
} from '@/menuData/index.js';
import actions from './actions.js';
import {
    microAppConfig
} from './config.js'
import store from '@/store';
import router from '@/router/index.js';

//  判断当前页签是否是微应用下的页面
const isMicroApp = function (path) {
    return !!microAppConfig.some(item => {
        return path.startsWith(item.activeRule)
    })
}

// 查找当前匹配微应用
const findMicroAppByPath = function (path) {
    return microAppConfig.find(item => {
        return path.startsWith(item.activeRule)
    })
}

class Tabs {

    // 切换父级页面
    createIframePage(path, fullPath, query, params, meta, name) {
        //  先判断跳转页面是否存在tabList
        const find = store.getters['tabs/tabsList'].find((item) => item.path === path)
        // 如果不存在活跃tab列表
        if (find) {
            store.dispatch('tabs/changeActiveTab', find)
        } else {
            store.dispatch('tabs/pushTabsList', {
                appName: 'iframe', // 主应用
                path,
                fullPath,
                query,
                params,
                title: meta.title,
                name
            })
            store.dispatch('tabs/pushKeepAliveList', {
                appName: 'iframe', // 主应用
                name: name
            })
        }
    }

    // 切换微应用页面
    createMicoPage(path, fullPath, query, params) {
        // 获取微应用配置
        let installAppMap = {
            ...store.getters['tabs/installAppMap']
        }
        try {
            // 根据路径获取微应用config
            const appConfig = findMicroAppByPath(path)
            const routeObj = {
                appName: appConfig.name,
                path,
                fullPath,
                query,
                params
            }

            // 先判断微应用是否已加载过
            if (Object.hasOwnProperty.call(installAppMap, appConfig.name)) {
                const find = store.getters['tabs/tabsList'].find((item) => item.path === path)

                // 如果已经加载过页面了就切换tab
                if (find) {
                    store.dispatch('tabs/changeActiveTab', find)
                } else {
                    // 否者就添加tab页
                    store.dispatch('tabs/pushTabsList', {
                        ...routeObj,
                        title: menuTitleData[path] || query.pageTabTitle
                    })
                }
                setTimeout(() => {
                    installAppMap[appConfig.name].update({
                        routerEvent: {
                            ...routeObj,
                            type: find ? 'replace' : 'push' // 如果存在就是切换路由  否者就是添加
                        }
                    })
                }, 4)
                return
            }

            // 否者就首次加载微应用并跳转
            installAppMap[appConfig.name] = loadMicroApp({
                ...appConfig,
                configuration: {
                    singular: true
                },
                props: {
                    $parentRouter: router,
                    getGlobalState: actions.getGlobalState,
                    routerEvent: {
                        ...routeObj,
                        type: 'push' // 第一次加载微页面只能push
                    }
                }
            })

            setTimeout(() => {
                routeObj.title = menuTitleData[path] || query.pageTabTitle
                store.dispatch('tabs/pushInstallMricoAppMap', installAppMap)
                store.dispatch('tabs/pushTabsList', routeObj)
            }, 4)
        } catch (err) {
            console.log(err)
        }
    }

    // 打开tab
    openTab(routes) {
        let {
            path, // 普通路径
            fullPath, // 带参路径
            query, // query参数
            params,
            meta, // 其他参数
            name
        } = routes
        if (!isMicroApp(path)) {
            // 如果是非微应用页面直接跳转
            this.createIframePage(path, fullPath, query, params, meta, name)
        } else {
            // 否者就是微应用
            this.createMicoPage(path, fullPath, query, params)
        }
    }

    // 切换tab
    switchTab(item) {
        if (item.path === store.getters['tabs/activeTab'].path) {
            return
        }
        this.openTab(item);
        router.replace(item.fullPath)
    }

    closeTab(item) {
        store.dispatch('tabs/closeTabsList', item)
    }
}

export default new Tabs()