import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    keepAliveList: []
  },
  mutations: {
    ['PUSH_KEEPALIVE_LIST'](state, data) {
      if (!state.keepAliveList.some((item) => item === data)) {
        state.keepAliveList.push(data)
      }
    },
    ['CLOSE_KEEPALIVE_LIST'](state, data) {
      state.keepAliveList = state.keepAliveList.filter(item => item !== data.name)
    },
  },
  actions: {},
  modules: {},
  getters: {
    keepAliveList: (state) => state.keepAliveList
  }
})