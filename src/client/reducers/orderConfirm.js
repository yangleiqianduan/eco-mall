import { fromJS } from 'immutable'
// import * as actions from 'actions/orderList'
import { UPDATE_CHOOSE_ADDRESS } from 'actions/addressList'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case UPDATE_CHOOSE_ADDRESS:
      return state.set('addressChoose', action.payload)
    default:
      return state
  }
}

const initState = {
  addressChoose: -1,
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
