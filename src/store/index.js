import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessages: [],
    user: JSON.parse(
      sessionStorage.getItem('user') || localStorage.getItem('user')
    )
  },
  mutations: {
    alert (state, msg) {
      state.alertMessages.push(msg)
    },
    login (state, payload) {
      state.user = payload.user;
      (payload.remember ? localStorage : sessionStorage)
        .setItem('user', JSON.stringify(payload.user));
      (payload.remember ? sessionStorage : localStorage)
        .removeItem('user')
    },
    logout (state) {
      state.user = null
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
    }
  },
  actions: {},
  modules: {}
})
