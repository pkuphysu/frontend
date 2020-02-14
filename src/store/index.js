import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessages: [],
    user: localStorage.getItem('user')
  },
  mutations: {
    alert(state, msg) {
      state.alertMessages.push(msg)
    },
    login(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
