import {
  createStore
} from 'vuex'
import router from '@/router/index.js'

// // tab最多个数
const pageTabMax = 3;

export default createStore({
  state: {
    installAppMap: {}, // 已安装的微应用
    activeTab: {}, // 当前活跃tab索引
    tabsList: [], // 当前存在的tab页
    keepAliveList: {}, // 需要保存状态的页面
  },
  actions: {
    pushInstallMricoAppMap({
      commit
    }, data) {
      commit('PUSH_INSTALL_MRICOAPP_MAP', data)
    },

    pushTabsList({
      // state,
      // dispatch,
      getters,
      commit
    }, data) {
      // 如果tab列表没有超出就直接push
      if (getters.tabsList.length < pageTabMax) {
        commit('PUSH_TABS_LIST', data)
      } else {
        // 否者超出了就删除第一个tab页  再push
        let tabList = [...getters.tabsList]
        let removeItem = tabList[0]
        tabList.shift()

        const appName = removeItem.appName
        // 如果是主应用
        if (appName === 'iframe') {
          getters.keepAliveList['iframe'] = getters.keepAliveList['iframe'].filter((item) => item !== removeItem.name)
        } else {
          // 否者是微应用
          let installApp = {
            ...getters.installAppMap
          }
          // 如果微应用没有活跃的tab了就销毁
          if (!tabList.some((item) => item.appName === appName)) {
            installApp[appName].unmount()
            delete installApp[appName]
            commit('PUSH_INSTALL_MRICOAPP_MAP', installApp)
          } else {
            installApp[appName].update({
              routerEvent: {
                path: removeItem.path,
                type: 'close'
              }
            })
          }
        }

        commit('CLOSE_TABS_LIST', tabList)
        commit('PUSH_TABS_LIST', data)
      }

    },
    closeTabsList({
      getters,
      commit
    }, data) {
      // 只有一条的时候不删除
      if (getters.tabsList.length === 1) return

      let tabList = [...getters.tabsList]
      let frist = tabList[0]
      let last = tabList[tabList.length - 1]

      let activeTab = null;

      if (data.path === last['path']) {
        // 先对比尾部
        tabList.pop()
        activeTab = tabList[tabList.length - 1]
      } else if (data.path === frist['path']) {
        // 再对比头部
        tabList.shift()
        activeTab = tabList[0]
      } else {
        // 都匹配不上就对比中间
        tabList = tabList.filter((item) => item.path !== data.path)
        activeTab = tabList[tabList.length - 1]
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
        if (!getters.tabsList.some((item) => item.appName === appName)) {
          installApp[appName].unmount()
          delete installApp[appName]
          commit('PUSH_INSTALL_MRICOAPP_MAP', installApp)
        } else {
          console.log(data)
          installApp[appName].update({
            routerEvent: {
              path: data.path,
              type: 'close'
            }
          })
        }
      }

      commit('CLOSE_TABS_LIST', tabList)
      commit('CHANGE_ACTIVE_TAB', activeTab)
      router.replace(activeTab.fullPath)
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
    },
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
    keepAliveList: (state) => state.keepAliveList, // 活跃的tab
  }
})