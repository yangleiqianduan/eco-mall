import { fromJS } from 'immutable'
// import * as actions from 'actions/orderList'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    default:
      return state
  }
}

const initState = {
  data: {
    itemsList: [
      {
        skuId: 100123411111,
        skuCode: 'aaa',
        title: '58同',
        url: 'http://img.58cdn.com.cn/ui6/index/logo.gif',
        quantity: 1,
        realPrice: 20,
        marketPrice: 20,
        saleAttributes: [
          {
            key: '颜色',
            value: '绿色'
          }
        ]
      }, {
        skuId: 100123411111,
        skuCode: 'aaa',
        title: '58同',
        url: 'http://img.58cdn.com.cn/ui6/index/logo.gif',
        quantity: 1,
        realPrice: 20,
        marketPrice: 20,
        saleAttributes: [
          {
            key: '颜色',
            value: '绿色'
          }
        ]
      }, {
        skuId: 100123411111,
        skuCode: 'aaa',
        title: '58同',
        url: 'http://img.58cdn.com.cn/ui6/index/logo.gif',
        quantity: 1,
        realPrice: 20,
        marketPrice: 20,
        saleAttributes: [
          {
            key: '颜色',
            value: '绿色'
          }
        ]
      }
    ],
    orderId: '095827146040',
    type: '0',
    totalAmount: '20'
  }
}
