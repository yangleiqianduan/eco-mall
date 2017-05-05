import { fromJS } from 'immutable'
import * as actions from 'actions/orderList'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ORDER_LIST:
      return state
        .update('orders', orders => orders.concat(fromJS(action.payload.orders)))
        .update('page', page => page.merge(action.payload.page))
    case actions.REPLACE_ORDER_LIST:
      return state
        .merge({orders: action.payload.orders})
        .update('page', page => page.merge(action.payload.page))
    case actions.DELETE_ORDER:
      return state.update('orders', orders => orders.delete(action.payload))
    default:
      return state
  }
}

const initState = {
  orders: [],
  page: {
    current_page: 1,
    page_size: 10
  }
}
