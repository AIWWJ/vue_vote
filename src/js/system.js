const isPc = function () {
  var sUserAgent = navigator.userAgent
  var mobileAgents = ['Android', 'iPhone', 'Symbian', 'WindowsPhone', 'iPod', 'BlackBerry', 'Windows CE']
  var flag = true
  for (var i = 0; i < mobileAgents.length; i++) {
    if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
      flag = false
      break
    }
  }
  return flag
}
export default isPc()
