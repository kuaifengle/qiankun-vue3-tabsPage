import {
  initGlobalState
} from 'qiankun';
// import tabs from '@/qiankun/tabs.js'
import store from '@/store/index.js'

const initialState = {
  path: '',
  changeMicoTabsPath: {}
}

// 初始化 state
const actions = initGlobalState(initialState);

actions.onGlobalStateChange((state) => {
  // state: 变更后的状态; prev 变更前的状态
  // console.log(state, prev);
  for (const key in state) {
    switch (key) {
      case 'changeMicoTabsPath':
        if (state['changeMicoTabsPath'].type === 'change') {
          let getters = store.getters
          let activeTab = getters.activeTab;
          let tabList = getters.tabsList.slice()
          let index = tabList.indexOf(tabList.find((item) => item.path === activeTab.path))
          let obj = {
            path: state['changeMicoTabsPath']['to']['path'],
            fullPath: state['changeMicoTabsPath']['to']['fullPath'],
            query: state['changeMicoTabsPath']['to']['query'],
            appName: state['changeMicoTabsPath']['appName'],
          }
          tabList[index] = obj
          store.commit('CLOSE_TABS_LIST', tabList)
          store.commit('CHANGE_ACTIVE_TAB', obj)
          // tabs.switchTab(obj)
          state['changeMicoTabsPath'] = null;
        }
        break;
    }
  }
});

export default actions