// 判断voteProductIds对象属性的长度
// const fn = function () {
const objLength = function (voteProductIds) {
  var count = 0
  for (var i in voteProductIds) {
    if (voteProductIds.hasOwnProperty(i)) {
      count++
    }
  }
  return count
}
export default objLength
