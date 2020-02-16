import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessages: [],
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    alert(state, msg) {
      state.alertMessages.push(msg)
    },
    login(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
