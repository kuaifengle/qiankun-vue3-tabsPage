import {
  initGlobalState
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

actions.onGlobalStateChange((newState) => {
  // state: 变更后的状态; prev 变更前的状态
  // console.log('main change', JSON.stringify(newState), JSON.stringify(prev))
  for (const key in newState) {
    switch (key) {
      // 监听微应用tab切换
      case 'changeMicoTabsPath':
        if (newState['changeMicoTabsPath'].type === 'change') {
          // 改变微应用子页面
          let getters = store.getters
          let activeTab = getters['tabs/activeTab'];
          let tabList = getters['tabs/tabsList'].slice()
          let index = tabList.indexOf(tabList.find((item) => item.path === activeTab.path))
          let obj = {
            title: tabList[index]['title'],
            path: newState['changeMicoTabsPath']['to']['path'],
            fullPath: newState['changeMicoTabsPath']['to']['fullPath'],
            query: newState['changeMicoTabsPath']['to']['query'],
            appName: newState['changeMicoTabsPath']['appName']
          }
          tabList[index] = obj
          store.commit('tabs/CLOSE_TABS_LIST', tabList)
          store.commit('tabs/CHANGE_ACTIVE_TAB', obj)
          newState['changeMicoTabsPath'] = null;
        } else if (newState['changeMicoTabsPath'].type === 'closeActiveTab') {
          // 关闭当前活跃的tab
          store.dispatch('tabs/closeTabsList', store.getters['tabs/activeTab'])
          newState['changeMicoTabsPath'] = null;
        } else if (newState['changeMicoTabsPath'].type === 'closeOtherTab') {
          // 关闭其他的的tab
          let find = store.getters['tabs/tabsList'].find((item) => item.path === newState['changeMicoTabsPath'].path)
          if (find) {
            store.dispatch('tabs/closeTabsList', find)
          } else {
            console.warn(newState['changeMicoTabsPath'].path + '关闭失败,该页面不在[tabs/tabsList]中!!!')
          }
          newState['changeMicoTabsPath'] = null;
        }
        break;
      default:
        initialState[key] = newState[key]
        break;
    }
  }
})

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