import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessages: []
  },
  mutations: {
    alert(state, msg) {
      state.alertMessages.push(msg)
    }
  },
  actions: {
  },
  modules: {
  }
})
