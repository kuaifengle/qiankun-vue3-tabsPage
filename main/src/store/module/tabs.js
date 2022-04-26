import router from '@/router/index.js'
import {
    ElMessageBox
} from 'element-plus'

// tab最多个数
const pageTabMax = 3;

export default {
    namespaced: true,
    state: {
        installAppMap: new Map(), // 已安装的微应用
        activeTab: {}, // 当前活跃tab索引
        tabsList: [], // 当前存在的tab页
        keepAliveList: {} // 需要保存状态的页面
    },
    actions: {
        pushInstallMricoAppMap({
            commit
        }, data) {
            commit('PUSH_INSTALL_MRICOAPP_MAP', data)
        },
        pushTabsList({
            getters,
            commit
        }, data) {
            // 如果tab列表没有超出就直接push
            if (getters.tabsList.length < pageTabMax) {
                commit('PUSH_TABS_LIST', data)
            } else {
                // 不允许tabs的数量超过pageTabMax个数
                ElMessageBox.confirm(
                    '系统能同时存在最多' + pageTabMax + '个路由Tabs标签页,请删除不重要的Tabs后再跳转!',
                    '提示', {
                        showCancelButton: false,
                        confirmButtonText: '确定',
                        type: 'warning'
                    }
                ).then(() => {
                    router.back()
                })

                // 否者超出了就删除第一个tab页  再push
                // if (window.alert('系统能同时存在最多' + pageTabMax + '个路由Tabs标签页,超出限制时将关闭第一个Tabs标签页!确定跳转并关闭首个Tabs标签页吗?')) {
                //     let tabList = [...getters.tabsList]
                //     let removeItem = tabList[0]
                //     tabList.shift()

                //     const appName = removeItem.appName
                //     // 如果是主应用
                //     if (appName === 'iframe') {
                //         getters.keepAliveList['iframe'] = getters.keepAliveList['iframe'].filter((item) => item !== removeItem.name)
                //     } else {
                //         // 否者是微应用
                //         let installApp = {
                //             ...getters.installAppMap
                //         }
                //         // 如果微应用没有活跃的tab了就销毁 并且 跳转的不是当前微应用的页面
                //         if (!tabList.some((item) => item.appName === appName) && appName !== data.appName) {
                //             console.warn('🚀🚀🚀微页面[' + appName + ']已经销毁了!!!')
                //             installApp[appName].unmount()
                //             delete installApp[appName]
                //             commit('PUSH_INSTALL_MRICOAPP_MAP', installApp)
                //         } else {
                //             installApp[appName] && installApp[appName].update({
                //                 routerEvent: {
                //                     path: removeItem.path,
                //                     type: 'close'
                //                 }
                //             })
                //         }
                //     }

                //     commit('CLOSE_TABS_LIST', tabList)
                //     commit('PUSH_TABS_LIST', data)
                // }
            }
        },
        closeTabsList({
            getters,
            commit
        }, data) {
            // 只有一条的时候删除
            if (getters.tabsList.length === 1) {
                commit('CLOSE_TABS_LIST', [])
                commit('CHANGE_ACTIVE_TAB', {})

                try {
                    // 销毁所有微应用
                    for (let name in getters.installAppMap) {
                        console.warn('🚀🚀🚀微页面[' + name + ']已经销毁了!!!')
                        getters.installAppMap[name].unmount()
                    }
                } catch (error) {
                    console.log(error)
                }

                commit('PUSH_INSTALL_MRICOAPP_MAP', {})

                //跳转首页
                router.replace('/')
                return
            }
            let nowActiveTab = JSON.parse(JSON.stringify(getters.activeTab))
            let tabList = [...getters.tabsList]
            let frist = tabList[0]
            let last = tabList[tabList.length - 1]

            let activeTab = null;
            if (nowActiveTab.path === data.path) {
                // 如果删除的是当前活跃的tab
                tabList = tabList.filter((item) => {
                    if (nowActiveTab.path !== item.path) {
                        return item
                    }
                })
                activeTab = tabList[tabList.length - 1]
            } else if (data.path === last['path']) {
                // 先对比尾部
                tabList.pop()
                activeTab = tabList[tabList.length - 1]
            } else if (data.path === frist['path']) {
                // 再对比头部
                tabList.shift()
                activeTab = nowActiveTab
            } else {
                // 都匹配不上就对比中间
                tabList = tabList.filter((item) => {
                    if (item.path !== data.path) {
                        return item
                    }
                })
                activeTab = nowActiveTab
            }

            const appName = data.appName
            // 如果是主应用
            if (appName === 'iframe') {
                getters.keepAliveList['iframe'] = getters.keepAliveList['iframe'].filter((item) => item !== data.name)
            } else {
                // 否者是微应用
                let installApp = {
                    ...getters.installAppMap
                }

                // 如果微应用没有活跃的tab了就销毁
                if (!tabList.some((item) => item.appName === appName)) {
                    try {
                        console.warn('🚀🚀🚀微页面[' + appName + ']已经销毁了!!!')
                        installApp[appName].unmount()
                        delete installApp[appName]
                        commit('PUSH_INSTALL_MRICOAPP_MAP', installApp)
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    installApp[appName].update({
                        routerEvent: {
                            path: data.path,
                            type: 'close'
                        }
                    })
                }
            }

            commit('CLOSE_TABS_LIST', tabList)
            if (activeTab.path !== nowActiveTab.path) {
                commit('CHANGE_ACTIVE_TAB', activeTab)
                router.replace(activeTab.fullPath)
            }
        },
        changeTabsList({
            commit
        }, data) {
            commit('CHANGE_TABS_LIST', data)
        },
        changeActiveTab({
            commit
        }, data) {
            commit('CHANGE_ACTIVE_TAB', data)
        },
        pushKeepAliveList({
            commit
        }, data) {
            commit('PUSH_KEEPALIVE_LIST', data)
        }
    },
    mutations: {
        // 添加挂载微应用
        ['PUSH_INSTALL_MRICOAPP_MAP'](state, data) {
            state.installAppMap = data
        },
        // 添加活跃的tabs
        ['PUSH_TABS_LIST'](state, data) {
            state.tabsList.push(data)
            state.activeTab = data
        },
        // 删除活跃的tabs
        ['CLOSE_TABS_LIST'](state, data) {
            state.tabsList = data
        },
        // 改变活跃的activeTab
        ['CHANGE_ACTIVE_TAB'](state, data) {
            state.activeTab = data
        },
        // 改变活跃的activeTab
        ['PUSH_KEEPALIVE_LIST'](state, data) {
            if (!state.keepAliveList[data.appName]) {
                state.keepAliveList[data.appName] = [data.name]
            } else {
                state.keepAliveList[data.appName].push(data.name)
            }
        }
    },
    getters: {
        installAppMap: (state) => state.installAppMap, // 已经加载过的App
        tabsList: (state) => state.tabsList, // 已存在的tab列表
        activeTab: (state) => state.activeTab, // 活跃的tab
        keepAliveList: (state) => state.keepAliveList // 活跃的tab
    }
}