import { fromJS } from 'immutable'
import * as actions from 'actions/detail'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ITEM_DETAIL:
      return state.merge({reqData: action.payload})
    default:
      return state
  }
}

const initState = {
  ensureInfo: [
    {
      type: 1,
      icon: 'ensureTag1',
      tit: '7天发货',
      info: '链家承诺，非定制商品，下订单次日起7日内发货'
    },
    {
      type: 2,
      icon: 'ensureTag2',
      tit: '送货入户',
      info: '链家承诺，所有商品均送货入户'
    },
    {
      type: 3,
      icon: 'ensureTag3',
      tit: '送货上门取件',
      info: '所有商品30天试用无理由退货，并上门取件退款'
    }
  ]

}
