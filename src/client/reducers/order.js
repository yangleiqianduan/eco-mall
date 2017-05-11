import { fromJS } from 'immutable'
import * as actions from 'actions/order'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ORDER_DETAIL:
      return state.merge({data: action.payload})
    default:
      return state
  }
}

const initState = {
  data: {
    payInfo:{},
    itemsList:[],
    operationList:[]
  }
}
