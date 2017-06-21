import { host, login } from 'constants/api'

var REDIRECT_STATUS = false
export default function (url, op = {}, mock) {
  const isMock = mock === undefined ? false : mock
  let config = {
    method: 'get',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  }
  if ((op.method === 'get' || !op.method) && (op.param)) {
    // 当发送请求为get时，将参数拼在url后面
    let key
    url += '?'
    for (key in op.param) {
      let value = encodeURIComponent((op.param[key] === 0 ? op.param[key] : (op.param[key] || '')).toString())
      url += `${key}=${value}&`
    }
    url = url.substr(0, url.length - 1)
  } else if (op.method === 'post' || op.method === 'POST') {
    if (op.formData) {                                            // 如果后端需要formData
      let formData = new window.FormData()
      let key
      for (key in op.param) {
        formData.append(key, op.param[key])
      }
      op.body = formData
      delete (op.formData)                                        // 去除多余的option
    } else {
      config.headers['Content-Type'] = 'application/json'         // post参数以json的方式传给后端
      op.body = JSON.stringify(op.param)                          // 正常的json传给后端
    }
  }
  delete (op.param)                                               // 去除多余的option
  return fetch((isMock ? '/api' : host[window.ENV]) + url, Object.assign({}, config, op))
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.code === '403') {                                  // 未登陆
        if (window.IS_APP) {
          if (REDIRECT_STATUS === window.location.href) {
            // 防止多次调起app登录页
            return false
          }
          REDIRECT_STATUS = window.location.href
          // 如果在掌链里面，未登录调起app登录页
          window.nativeBridge.actionLogin(window.location.href)
          return false
        }
        return false
        window.location.replace(`${host[window.ENV]}${login}?ru=${encodeURIComponent(window.location)}`)
        return false
      } else {
        REDIRECT_STATUS = false
      }
      return data
    })
}
