import {
    loadMicroApp
} from 'qiankun';
import './actions.js';

import {
    microAppConfig
} from './config.js'
import store from '../store';

//  判断当前页签是否是微应用下的页面
export const isMicroApp = function (path) {
    return !!microAppConfig.some(item => {
        return path.startsWith(item.activeRule)
    })
}

// 查找当前匹配微应用
export function findMicroAppByPath(path) {
    return microAppConfig.find(item => {
        return path.startsWith(item.activeRule)
    })
}

// 加载微应用
export const createMicroApp = function (pathObj) {
    let {
        path,
        fullPath
    } = pathObj
    path = fullPath || path
    let installAppMap = {
        ...store.getters['installAppMap']
    }
    let tabsList = store.getters['tabsList']

    //  先判断跳转页面是否存在tabList
    const find = tabsList.find((item) => item.fullPath === path)

    // 如果是非微应用页面直接跳转
    if (!isMicroApp(path)) {
        // 如果不存在活跃tab列表
        if (find) {
            store.dispatch('changeActiveTab', find)
        } else {
            store.dispatch('pushTabsList', {
                appName: 'iframe',
                fullPath: path
            })
            // store.dispatch('pushKeepAliveList', pathObj.name)
        }
        return
    }

    // 否者就是微应用
    try {
        // 否者是微应用页面
        const appConfig = findMicroAppByPath(path) // 获取微应用配置
        // 先判断微应用是否已加载过
        if (Object.hasOwnProperty.call(installAppMap, appConfig.name)) {
            // 如果微应用存在就跳转
            // 如果已经加载过页面了就切换tab
            const find = tabsList.find((item) => item.fullPath === path)
            let replacePath = ''
            if (find) {
                store.dispatch('changeActiveTab', find)
                replacePath = find.fullPath.replace(appConfig.activeRule, '')
            } else {
                store.dispatch('pushTabsList', {
                    name: appConfig.name,
                    fullPath: path
                })
                replacePath = path.replace(appConfig.activeRule, '')
            }
            installAppMap[appConfig.name].update({
                pathObj: {
                    path: replacePath,
                    type: find ? 'replace' : 'push'
                }
            })

            return
        }

        // 否者就加载微应用并跳转
        installAppMap[appConfig.name] = loadMicroApp({
            ...appConfig,
            configuration: {
                singular: true
            },
            props: {
                pathObj: {
                    path: path.replace(appConfig.activeRule, ''),
                    type: 'push'
                }
            }
        })

        store.dispatch('pushInstallMricoAppMap', installAppMap)
        store.dispatch('pushTabsList', {
            name: appConfig.name,
            fullPath: path
        })

    } catch (err) {
        console.log(err)
    }

}