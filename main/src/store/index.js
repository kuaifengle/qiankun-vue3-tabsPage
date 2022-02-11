import {
  createStore
} from 'vuex'
import tabs from './module/tabs.js'

// tab最多个数
const pageTabMax = 3;

export default createStore({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    tabs
  }
})