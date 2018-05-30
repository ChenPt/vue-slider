import Vue from 'vue';
import Vuex from 'vuex';
import ls from '../utils/ls.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: Object.assign({
    count: 0,
    userName: null,
    uid: null,
    array: [
      { val: 1, done: false },
      { val: 2, done: true },
      { val: 3, done: true }
    ]
  }, ls.get('state')),
  getters: {
    //可以筛选出那些变化后的状态
    isDone: (state) => {
      return state.array.filter(i => i.done)
    }
  },
  mutations: {
    //type handler
    ADD: (state, n) => {
      state.count += n
      ls.set("state", state)
    },
    SUB: (state, n) => {
      state.count -= n
      ls.set("state", state)
    },
    UPDATEINFO: (state, n) => {
      state.userName = n
      ls.set("state", state)
    }
  },
  actions: {
    addAsync: ({ commit }, num) => {
      setTimeout(() => {
        commit('ADD', num)
      }, 100)
    },
    subAsync: ({ commit }, num) => {
      setTimeout(() => {
        commit('SUB', num)
      }, 100)
    },
    updateInfo: ({ commit }, newVal) => {
      setTimeout(() => {
        commit('UPDATEINFO', newVal)
      }, 100)
    }
  }
})

export default store;