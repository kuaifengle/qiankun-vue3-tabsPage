import {
  initGlobalState,
  addGlobalUncaughtErrorHandler
} from 'qiankun';
import {
  reactive
} from 'vue'
import store from '@/store/index'

let initialState = reactive({
  changeMicoTabsPath: {} // 微应用tab数据
})

// 全局状态
const actions = initGlobalState(initialState);

let errorCount = 0
// 全局的未捕获异常处理器
addGlobalUncaughtErrorHandler((event) => {
  errorCount += 1
  if (errorCount === 3) {
    errorCount = 0
    store.dispatch('tabs/changeAppLoading', false)
    if (String(event.reason) === 'TypeError: Failed to fetch') {
      /* eslint-disable */
      alert('页面加载失败,即将关闭当前标签页!')
      store.dispatch('tabs/closeTabsList', store.getters['tabs/activeTab'])
    }
  }
});

actions.onGlobalStateChange((newState) => {
  console.log(newState)
  // state: 变更后的状态; prev 变更前的状态
  for (const key in newState) {
    switch (key) {
      // 监听微应用tab切换
      case 'changeMicoTabsPath': {
        let newPathObj = newState['changeMicoTabsPath']
        if (newPathObj.type === 'changeLoading') {
          store.dispatch('tabs/changeAppLoading', newPathObj.loading)
          initialState['changeMicoTabsPath'] = {};
        } else if (newPathObj.type === 'change') {
          // 改变微应用子页面
          let activeTab = store.getters['tabs/activeTab'];
          let tabList = store.getters['tabs/tabsList'].slice()
          if (tabList.length) {
            let index = tabList.indexOf(tabList.find((item) => item.path === activeTab.path))

            let obj = {
              title: tabList[index]['title'],
              path: newPathObj['to']['path'],
              fullPath: newPathObj['to']['fullPath'],
              query: newPathObj['to']['query'],
              appName: newPathObj['appName']
            }
            tabList[index] = obj
            store.commit('tabs/CLOSE_TABS_LIST', tabList)
            store.commit('tabs/CHANGE_ACTIVE_TAB', obj)
          }
        } else if (newPathObj.type === 'closeActiveTab') {
          // 关闭当前活跃的tab
          store.dispatch('tabs/closeTabsList', store.getters['tabs/activeTab'])
          initialState['changeMicoTabsPath'] = {};
        } else if (newPathObj.type === 'closeOtherTab') {
          // 关闭其他的的tab
          let find = store.getters['tabs/tabsList'].find((item) => item.path === newPathObj.path)
          if (find) {
            store.dispatch('tabs/closeTabsList', find)
          } else {
            console.warn(newPathObj.path + '关闭失败,该页面不在[tabs/tabsList]中!!!')
          }
        }
      }
      break;
    default:
      initialState[key] = newState[key]
      break;
    }
  }
}, false)

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = async function (key) {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  switch (key) {
    default:
      return key ? initialState[key] : initialState
  }
}

export default actions;