import { fromJS } from 'immutable'
import * as actions from 'actions/shoppingcart'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_LIST:
      return state.merge({data: action.payload})
    case actions.UPDATE_CHECK:
      return state.updateIn(['data', action.payload], d => d.set('isChecked', !d.get('isChecked')))
    case actions.CHECK_ALL:
      return state.update('data', l => l.map(l => l.set('isChecked', action.payload)))
    case actions.DELETE_ITEM:
      return state.update('data', l => l.delete(action.payload))
    case actions.UPDATE_NUMBER:
      return state.setIn(['data', action.index, 'quantity'], action.payload)
    default:
      return state
  }
}

const initState = {
  data: []
    // {
    //   cart_id: 309515905146,
    //   product_id: '101001003_1483561081439_7308',
    //   merchant_code: 'DESIGN_CENTER',
    //   merchant_name: '设计工程中心',
    //   sku_id: 6109,
    //   uid: 1000000020095146,
    //   quantity: 5,
    //   sku_attribute_ids: '24',
    //   sku_attribute_names: [
    //     '12'
    //   ],
    //   product_img_url: 'http://img.ljcdn.com/lmall/d5e80745-ad62-49b5-97bc-d51f972e7754.jpg.355x355.jpg',
    //   product_name: '测试数据2',
    //   market_price: 12,
    //   sale_price: 12,
    //   payment_id: 60,
    //   paymethod_name: '个人链家币',
    //   per_user_limit: -1,
    //   per_order_limit: -1,
    //   sku_inventory: 12,
    //   currency_code: 1,
    //   is_off_shelf: true
    // }
}
