import { fromJS } from 'immutable'
// import * as actions from 'actions/orderList'
import { UPDATE_CHOOSE_ADDRESS } from 'actions/addressList'
import { UPDATE_CONFIRM_LIST, UPDATE_CONFIRM_AMOUNT, UPDATE_TOKEN, UPDATE_SOURCE, SET_ADDRESS_ID } from 'actions/orderConfirm'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case UPDATE_CHOOSE_ADDRESS:
      return state.set('addressChoose', action.payload)
    case UPDATE_CONFIRM_LIST:
      return state.setIn(['data', 'itemsList'], action.payload)
    case UPDATE_CONFIRM_AMOUNT:
      return state.setIn(['data', 'totalAmount'], action.payload)
    case UPDATE_TOKEN:
      return state.set('token', action.payload)
    case UPDATE_SOURCE:
      return state.set('source', action.payload)
    case SET_ADDRESS_ID:
      return state.set('deliver_address_id', action.payload)
    default:
      return state
  }
}

const initState = {
  addressChoose: -1,
  deliver_address_id: 0,
  token: '',
  source: 0,
  data: {
    itemsList: [
      // {
      //   skuId: 100123411111,
      //   skuCode: 'aaa',
      //   title: '58同',
      //   url: 'http://img.58cdn.com.cn/ui6/index/logo.gif',
      //   quantity: 1,
      //   realPrice: 20,
      //   marketPrice: 20,
      //   saleAttributes: [
      //     {
      //       key: '颜色',
      //       value: '绿色'
      //     }
      //   ]
      // }
    ],
    orderId: '095827146040',
    type: '0',
    totalAmount: ''
  }
}
