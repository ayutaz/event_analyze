import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle: 'home',
    age_list: [
      { text: '~10代', id: 1 },
      { text: '20代', id: 2 },
      { text: '30代', id: 3 },
      { text: '40代', id: 4 },
      { text: '50代', id: 5 },
      { text: '60代~', id: 6 }
    ]
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
