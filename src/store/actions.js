// import controMap from '../js/getMap.js';

// const getPosJson=({commit},toNext)=>{
//     let posJson = {}
//     self.position = {}
//     let arr=new Promise((resolve,reject)=>{
//         controMap.getPosition(posJson,resolve)
//     }).then(()=>{
//         commit('getPos',posJson);
//         toNext();
//     })
// }
// 通过axios获取到的数据
const getDataList = ({commit}, val) => {
  commit('getDataList', val)
}
// 获取总的票数
// const getTotalVoteNum = ({commit}, val) => {
//   commit('getTotalVoteNum', val)
// }
// 显示搜索结果为空
const getSearchNull = ({commit}, val) => {
  commit('getSearchNull', val)
}
// 显示达到投票限度
const getMask = ({commit}, val) => {
  commit('getMask', val)
}
// 显示投票按钮
const getVoteBtn = ({commit}, val) => {
  commit('getVoteBtn', val)
}
// 显示活动介绍
const getIntroPic = ({commit}, val) => {
  commit('getIntroPic', val)
}
// 显示加载动画
const getLoading = ({commit}, val) => {
  commit('getLoading', val)
}
// 显示投票页面
const getVotePage = ({commit}, val) => {
  commit('getVotePage', val)
}
// 出现红色小勾
const getTickPic = ({commit}, val) => {
  commit('getTickPic', val)
}
// // 初始化滚动
// const initGetting=({commit},val)=>{
//     let gettingValue=val||1;
//     commit('initGetting',gettingValue);
// }
export default{
  // getTotalVoteNum,
  getSearchNull,
  getIntroPic,
  getTickPic,
  getVotePage,
  getLoading,
  getVoteBtn,
  getDataList,
  getMask
}
