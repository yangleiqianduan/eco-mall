import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from 'constants/routes'
import Main from 'containers/Main/'
import makeStore from './store/configureStore'

import fetch from 'common/fetch'
import { getWxToken } from 'constants/api'

const store = makeStore({})

// 加载完jsBridge后在执行业务代码，保证请求cookie正确
$ljBridge.ready((bridge, webStatus) => {
  window.nativeBridge = bridge
  window.IS_APP = webStatus && webStatus.isApp
  // 非链家app时注册微信
  if (!$ljBridge.webStatus.isApp && window.wx) {
    // 获取微信token
    fetch(getWxToken, {param: {url: window.location.href.split('#')[0]}})
    .then(res => {
      const result = res.data
      window.wx.config({
        debug: window.env === 'dev', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      // window.wx.onMenuShareAppMessage({
      //   title: '测试', // 分享标题
      //   desc: '测试一下微信分享', // 分享描述
      //   link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: 'https://image1.ljcdn.com/lmall/085949b2-ab4a-4427-8430-71716dd79c66.jpg', // 分享图标
      //   success: function () {
      //     // 用户确认分享后执行的回调函数
      //   },
      //   cancel: function () {
      //     // 用户取消分享后执行的回调函数
      //   }
      // })
    })
  }

  render(<BrowserRouter>
    <Provider store={store}>
      <Main routes={routes} />
    </Provider>
  </BrowserRouter>, document.getElementById('root'))
})
