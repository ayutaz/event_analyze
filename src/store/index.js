import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle: 'home'
  },
  mutations: {
    cahgePageTitle (state, title) {
      const st = state
      st.pageTitle = title
    }
  },
  actions: {
    changePage ({ commit }, title) {
      commit('cahgePageTitle', title)
    }
  },
  modules: {
  },
  pageTitle (state) {
    const st = state
    return st.pageTitle
  }
})
