import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showTotal: 0,
  },
  mutations: {
    setTotal(state,showTotal){
      state.showTotal = showTotal
    }
  },
  actions: {
  },
  modules: {
  }
})

