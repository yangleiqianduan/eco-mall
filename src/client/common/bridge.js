import fetch from './fetch'
import * as api from 'constants/api'
import { defaultSharedImg, appShareIcon } from 'constants/img'

export const setShare = ({title, description, img, url}, isShareImg) => {
  // 设置分享内容，isShareImg为true的话是在app中分享一张图片出去
  if (window.IS_APP) {
    // 链家app内分享
    // setRightButton2 需要提供icon url
    window.nativeBridge.setRightButton2(JSON.stringify([{
      name: '分享',
      clickUrl: isShareImg ? 'lianjia://share_image' : 'lianjia://share',
      imageUrl: appShareIcon
    }]))
    if (isShareImg) {
      // 分享图片
      return getQrcode({content: url, width: 330, height: 330}).then(qrUrl => {
        window.nativeBridge.setShareConfigWithString(JSON.stringify({
          html2img: createSharedImage(img, title, description, qrUrl),
          requestUrl: url || window.location.href
        }))
      })
    }
    // 默认分享首页
    window.nativeBridge.setShareConfigWithString(JSON.stringify({
      articleTitle: title || '一站式家居平台-链家家居',
      articleDiscription: description || '贵一点，好很多的，链家家居为你工厂直采高质低价家居商品',
      headImageUrl: img || defaultSharedImg,
      requestUrl: url || window.location.origin
    }))
  } else {
    // 微信下分享
    const shareArgument = {
      title: title || '一站式家居平台-链家家居', // 分享标题
      desc: description || '贵一点，好很多的，链家家居为你工厂直采高质低价家居商品',
      link: url || window.location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: img || defaultSharedImg, // 分享图标
      success: () => {},
      cancel: () => {}
    }
    fetch(api.getWxToken, {param: {url: window.location.href.split('#')[0]}})
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
      window.wx.onMenuShareTimeline(shareArgument)
      window.wx.onMenuShareAppMessage(shareArgument)
      window.wx.onMenuShareQQ(shareArgument)
    })
  }
}

// 获取二维码
export const getQrcode = (str) => fetch(api.getQrcode, {param: str})
.then(res => {
  if (res.code === '1') return res.data
})

const textConfig = {
  logo: '链家家居',
  description: '让每个家住好一点',
  qrText: '长按二维码查看商品详情'
}

export const createSharedImage = (imgUrl, title, description, qrUrl, cw = document.body.clientWidth * 0.8) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <title>Document</title>
  </head>
  <style>
    ::-webkit-scrollbar {/*隐藏滚轮*/
      display: none;
    }
    html, body {
      background: #fff;
      overflow-y: hidden;
      padding: 0;
      margin: 0;
      font-size: ${cw / 3.75}px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft Yahei", "微软雅黑", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    section {
      display: block;
      border-top: 1px solid transparent;
    }
    .container {
      padding: 0.35rem 0.2rem 0.2rem;
      line-height: 0;
      letter-spacing: 0;
    }
    @media screen and (min-width: 412px) and (max-height: 736px) {
      .container {
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
      }
    }
    .header {
      height: 0.2rem;
      line-height: 0.2rem;
    }
    .logo {
      float: left;
      /* width: 0.39rem; */
      /* height: 0.18rem; */
      /* 链家家居: */
      opacity: 0.5;
      font-family: STSongti-SC-Regular;
      font-size: 0.2rem;
      color: #394043;
      letter-spacing: 0;
    }
    .headerDescription {
      float: right;
      opacity: 0.3;
      font-family: PingFangSC-Regular;
      font-weight: 200;
      font-size: 0.14rem;
      color: #394043;
      text-align: right;
    }
    .imageContainer {
      margin: 0.1rem auto 0;
      padding: 0.05rem 0.05rem 0.2rem;
      box-shadow: 0 0.04rem 0.12rem 0 rgba(0,0,0,0.08);
    }
    .mainImage {
      margin-bottom: 0.22rem;
      width:  100%;
    }
    .title {
      font-weight: normal;
      font-family: PingFangSC-Medium;
      font-size: 0.22rem;
      color: #394043;
      line-height: 0.22rem;
      text-align: center;
      margin: 0 auto;
    }
    .split {
      width: 0.3rem;
      border: none;
      border-top: 1px solid #6B7072;
      margin: 0.1rem auto;
    }
    .description {
      font-weight: 200;
      font-family: PingFangSC-Light;
      font-size: 0.16rem;
      color: #9C9FA1;
      line-height: 0.22rem;
      text-align: center;
      margin: 0 0.2rem;
      display: -webkit-box !important;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .qrContainer {
      width: 0.6rem;
      height: 0.6rem;
      margin: 0.3rem auto 0.1rem;
      text-align: center;
    }
    .qrContainer img {
      width: 0.6rem;
      height: 0.6rem;
    }
    .note {
      font-weight: 200;
      opacity: 0.6;
      font-family: PingFangSC-Light;
      font-size: 0.12rem;
      line-height: 0.12rem;
      color: #9C9FA1;
      margin: 0 auto;
      text-align: center;
    }
  </style>
  <body>
    <div class="container">
      <section>
        <div class="header">
          <div class="logo">${textConfig.logo}</div>
          <div class="headerDescription">${textConfig.description}</div>
        </div>
        <div class="imageContainer">
          <img class="mainImage" src="${imgUrl}" alt="${title}">
          <h1 class="title">${title}</h1>
          <hr class="split" />
          <p class="description">${description}</p>
        </div>
      </section>
      <section>
        <div class="qrContainer"><img src="${qrUrl}" /></div>
        <div class="note">${textConfig.qrText}</div>
      </section>
    </div>
  </body>
  </html>
`
