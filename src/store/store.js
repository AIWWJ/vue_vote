import Vue from 'vue'
import VueX from 'vuex'
import getters from './getters'
import actions from './actions'
Vue.use(VueX)

const state = {
  searchNull: false,
  introPic: false,
  voteBtn: false,
  mask: false,
  votePage: false,
  tick: false,
  totalVoteNum: 0,
  dataList: [],
  // datas: {},
  voteArr: []
}

var mutations = {
  getDataList (state, val) {
    state.dataList = val
  },
  // getTotalVoteNum (state, val) {
  //   state.totalVoteNum = val
  // },
  getTickPic (state, val) {
    state.tick = val
  },
  getVoteArr (state, arr) {
    state.voteArr = arr
  },
  getSearchNull (state, val) {
    state.searchNull = val
  },
  getIntroPic (state, val) {
    state.introPic = val
  },
  getVotePage (state, val) {
    state.votePage = val
  },
  getVoteBtn (state, val) {
    state.voteBtn = val
  },
  getMask (state, val) {
    state.mask = val
  }
  // initGetting(state, val) {
  //   state.getting = val;
  // },
}

export default new VueX.Store({
  state,
  mutations,
  getters,
  actions
})
