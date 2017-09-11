// rem适配，一开始加载
(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 10 * (clientWidth / 750) + 'px'
    // css默认body隐藏，加载完适配后展现
    doc.body.style.display = 'block'
  }
  doc.body.style.height = docEl.clientHeight + 'px'
  doc.body.style.overflow = 'auto'
  if (!doc.addEventListener) return
  recalc()
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
