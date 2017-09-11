// export default {
//   fetch (name) {
//     return JSON.parse(window.localStorage.getItem(name) || '')
//   }
//   save (val, name) {
//      window.localStorage.setItem(name, JSON.stringify(items))
//   }
// }
export default {
  fetch (name) {
    return JSON.parse(window.localStorage.getItem(name) || '[]')
    // return window.localStorage.getItem(name) || ''
  },
  save (name, val) {
    window.localStorage.setItem(name, JSON.stringify(val))
  }
}

