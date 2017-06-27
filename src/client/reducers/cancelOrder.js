import { fromJS } from 'immutable'
import * as actions from 'actions/cancelOrder'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ORDER_DETAIL:
      return state.merge({data: action.payload})
    case actions.UPDATE_REMARK_VALUE:
      return state.set('remark', action.payload)
    default:
      return state
  }
}

const initState = {
  data: {
    payInfo:{},
    itemsList:[],
    operationList:[],
    receiverInfo:{}
  },
  remark: ''
}
