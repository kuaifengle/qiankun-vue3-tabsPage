import {
    loadMicroApp
} from 'qiankun';
import store from '@/store';
import router from '@/router/index.js';
import {
    menuTitleData
} from '@/menuData/index.js';
import actions from './actions.js';
import {
    microAppConfig
} from './config.js'

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
        return new Promise((resolve) => {
            //  先判断跳转页面是否存在tabList 或者 存在它的父页面
            const find = store.getters['tabs/tabsList'].find((item) => item.path.startsWith(path))
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
            resolve(true)
        })
    }

    // 切换微应用页面
    createMicoPage(path, fullPath, query, params) {
        return new Promise((resolve, reject) => {
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

                // 隐藏所有app页面 减少页面dom元素
                const visibleAllApp = async () => {
                    for (let appName in installAppMap) {
                        if (appName === appConfig.name) {
                            continue;
                        }
                        await installAppMap[appName].update({
                            routerEvent: {
                                type: 'visible' // 如果不是当前活跃的就隐藏
                            }
                        })
                    }
                }

                // 先判断微应用是否已加载过
                if (Object.hasOwnProperty.call(installAppMap, appConfig.name)) {
                    const find = store.getters['tabs/tabsList'].find((item) => item.path === path)

                    // 如果已经加载过页面了就切换tab
                    if (find) {
                        if (decodeURI(find.fullPath) !== decodeURI(fullPath) && find.path === path) {
                            /* eslint-disable */
                            let bool = confirm('检测到该路由的Tabs标签页已在系统中存在,是否打开新页面或切换旧页面?')
                            if (bool) {
                                visibleAllApp()
                                store.dispatch('tabs/closeTabsList', find)
                                router.push({
                                    path,
                                    query,
                                    params
                                })
                            }
                            resolve(false)
                            return
                        } else {
                            store.dispatch('tabs/changeActiveTab', find)
                        }
                    } else {
                        // 否者就添加tab页
                        store.dispatch('tabs/pushTabsList', {
                            ...routeObj,
                            title: menuTitleData[path] || query.pageTabTitle
                        })
                    }
                    visibleAllApp()

                    installAppMap[appConfig.name] && installAppMap[appConfig.name].update({
                        routerEvent: {
                            ...routeObj,
                            type: find ? 'replace' : 'push' // 如果存在就是切换路由  否者就是添加
                        }
                    })
                    resolve(true)
                    return
                }

                // 否者就首次加载微应用并跳转
                visibleAllApp()
                installAppMap[appConfig.name] = loadMicroApp({
                    ...appConfig,
                    configuration: {
                        singular: true
                    },
                    props: {
                        $parentRouter: router,
                        actions: actions,
                        routerEvent: {
                            ...routeObj,
                            type: 'push' // 第一次加载微页面只能push
                        }
                    }
                })

                routeObj.title = menuTitleData[path] || query.pageTabTitle
                store.dispatch('tabs/pushInstallMricoAppMap', installAppMap)
                store.dispatch('tabs/pushTabsList', routeObj)

                resolve(true)
            } catch (err) {
                console.log(err)
                reject(false)
            }
        })
    }

    // 打开tab
    openTab(routes) {
        let {
            path, // 普通路径
            fullPath, // 带参路径
            query, // query参数
            params,
            meta, // 其他参数
            name,
            next
        } = routes
        if (!isMicroApp(path)) {
            // 如果是非微应用页面直接跳转
            this.createIframePage(path, fullPath, query, params, meta, name).then((bool) => {
                next(bool)
            })
        } else {
            // 否者就是微应用
            this.createMicoPage(path, fullPath, query, params).then((bool) => {
                next(bool)
            })
        }

    }

    // 切换tab
    switchTab(item) {
        if (item.path === store.getters['tabs/activeTab'].path) {
            return
        }
        router.push(item.fullPath)
    }

    closeTab(item) {
        store.dispatch('tabs/closeTabsList', item)
    }
}

export default new Tabs()