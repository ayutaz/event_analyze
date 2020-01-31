import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 'home',
    new_page: ''
  },
  mutations: {
    change_page (state) {
      state.page = state.new_page
    }
  },
  actions: {
  },
  modules: {
  }
})
