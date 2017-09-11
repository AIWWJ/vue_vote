/* 是否达到数据最大数的标志 */
var isEnd = false
/* 判断是否属于搜索内容为空时触发的事件 */
var isSearch = false
// 加载第一页
var page = 0
/* 首次加载 */
getData(page)

/* 监听加载更多 */
// 简单的节流函数
function throttle (func, wait, mustRun) {
  var timeout
  var startTime = new Date()

  return function () {
    var context = this
    var args = arguments
    var curTime = new Date()
    clearTimeout(timeout)
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= mustRun) {
      func.apply(context, args)
      startTime = curTime
      // 没达到触发间隔，重新设定定时器
    } else {
      timeout = setTimeout(func, wait)
    }
  }
}
// 实际想绑定在 scroll 事件上的 scrollHandler
function scrollHandler () {
  // 当滚动到最底部以上500像素时， 加载新内容
  if ($(document).height() - $(this).scrollTop() - $(this).height() < 600) {
    if (isSearch === true || isEnd === true) {
      return
    } else {
      page++
      getData(page)
    }
  }
}
// 采用节流函数
var loadMore = window.addEventListener('scroll', throttle(scrollHandler, 500, 1000))
export default loadMore
