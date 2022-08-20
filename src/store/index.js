import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  platform: 'PS4', // 平台
  flashSize: {
    actualSize: 0,
    normalSize: 0
  }, // 硬盘容量
  flashSizeMap: {},
  totalGames: [],
  selectGames: [],
  curGameType: '',
  tableIndex: 1
}

const getters = {
  platform: (state) => state.platform,
  flashSize: (state) => state.flashSize,
  selectGames: (state) => state.totalGames.filter((item) => item.checked) || [],
  totalGames: (state) => state.totalGames,
  curGameType: (state) => state.curGameType,
  curPlatform: (state) => state.curPlatform,
  tableIndex: (state) => state.tableIndex
}

const mutations = {
  setValue: (state, payload) => {
    const { name, value } = payload
    state[name] = value
  }
}

const actions = {
  // 平台选择
  setPlatform({ commit }, payload) {
    commit('setValue', { name: 'platform', value: payload })
  },
  // 容量选择
  setFlashSize({ commit }, payload) {
    commit('setValue', { name: 'flashSize', value: payload })
  },
  // 游戏选择
  setSelectGames({ commit }, payload) {
    commit('setValue', { name: 'selectGames', value: payload })
  },
  // 游戏选择
  setTotalGames({ commit }, payload) {
    commit('setValue', { name: 'totalGames', value: payload })
  },
  // 选择类型
  setCurGameType({ commit }, payload) {
    commit('setValue', { name: 'curGameType', value: payload })
  },
  // 选择平台
  setCurPlatform({ commit }, payload) {
    commit('setValue', { name: 'curPlatform', value: payload })
  },
  // 选择平台
  setTableIndex({ commit }, payload) {
    commit('setValue', { name: 'tableIndex', value: payload })
  },
  // 选择平台
  setFlashSizeMap({ commit }, payload) {
    commit('setValue', { name: 'flashSizeMap', value: payload })
  }
}

const modules = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
