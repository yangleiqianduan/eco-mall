import pathToRegexp from 'path-to-regexp'
import { stat } from './stat'

// 创建一个数组，params: 数组长度{number}；规则{function{i}}
export const createArray = (length, rule = 1) => {
  let newArray = []
  for (let i = 0; i < length; i++) {
    newArray.push(typeof rule === 'function' ? rule(i) : rule)
  }
  return newArray
}

// 格式化时间，目前只能YYYY-MM-DD HH:mm:ss
export const formatTime = (time) => {
  if (typeof time !== 'number') return '-'
  const Time = new Date(time)
  return `${Time.getFullYear()}-${Time.getMonth() + 1}-${joinNumber(Time.getDate())} ${joinNumber(Time.getHours())}:${joinNumber(Time.getMinutes())}:${joinNumber(Time.getSeconds())}`
}

export const joinNumber = (numb) => numb < 10 ? '0' + numb : numb

// 将一个数组按指定长度分成几个数组
export const sliceArr = (arr, len) => {
  const newArray = arr.slice()
  const finalArray = []
  const trans = Math.floor(newArray.length / len)
  const length = trans === (newArray.length / len) ? trans : (trans + 1)
  for (let i = 0; i < length; i++) {
    finalArray.push(newArray.splice(0, len))
  }
  return finalArray
}

// 按字节截断字符串
export const subStrByByte = (str, limit, showMore = true) => {
  let newStr = ''
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if ((/[^\x00-\xff]/g).test(str[i])) {
      len += 2
    } else {
      len += 1
    }
    if (len > limit) {
      newStr = str.substr(0, i)
      return showMore ? newStr + '...' : newStr
    }
  }
  return str
}

// 为空判断
export const isEmpty = function () {
  const checkEmpty = (a) => {
    switch (typeof a) {
      case 'number':
        return !Number.isFinite(a)
      case 'string':
        return !a.trim()
      default:
        return !a
    }
  }
  for (let i = 0; i < arguments.length; i++) {
    if (checkEmpty(arguments[i])) {
      return true
    }
  }
  return false
}

// location变化时，更新页面title
export const updateTitle = (location = window.location, routes) => {
  const cheeckCurrent = (routes) => {
    if (!Array.isArray(routes)) return
    for (let i = 0; i < routes.length; i++) {
      if (comparePath(routes[i].path, location.pathname)) {
        document.title = routes[i].title
        stat('pv', routes[i].title)
        return
      } else if (routes[i].routes) {
        cheeckCurrent(routes[i].routes)
      }
    }
  }
  const comparePath = (a = '', b = '') => pathToRegexp(a).exec(b)

  cheeckCurrent(routes)
}

// 将?search=123 解析成 {search: 123}; 以后可以做完善一点
export const parseQueryString = (search = '') => {
  const query = {}
  let string = search[0] === '?' ? search.slice(1) : search
  if (string[string.length] === '&') {
    string = string.slice(0, search.length - 1)
  }
  const strArr = string.split('&')
  strArr.map(pair => {
    const pairArr = pair.split('=')
    if (pairArr[1]) {
      query[pairArr[0]] = decodeURIComponent(pairArr[1])
    }
  })
  return query
}

// 延时函数
export const delay = (t) => new Promise((resolve) => {
  setTimeout(() => resolve(), t * 1000)
})

// 设置cookie
export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}
// 获取cookie
export const getCookie = cname => {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}
// 清除cookie
export const clearCookie = (name) => {
  setCookie(name, '', -1)
}
export const checkCookie = () => {
  var user = getCookie('username')
  if (user !== '') {
    alert('Welcome again ' + user)
  } else {
    user = prompt('Please enter your name:', '')
    if (user !== '' && user != null) {
      setCookie('username', user, 365)
    }
  }
}

let lastPositionTop = 0

export const updateBodyScroll = (type) => {
  if (type) {
    document.body.style.position = 'static'
    document.body.style.overflowY = 'auto'
    document.body.scrollTop = lastPositionTop
  } else {
    lastPositionTop = document.body.scrollTop
    document.body.style.top = -lastPositionTop + 'px'
    document.body.style.overflowY = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.left = 0
    document.body.style.width = '100%'
    // document.body.style.height = '100%'
  }
}
