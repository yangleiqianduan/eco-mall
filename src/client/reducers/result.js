import { fromJS } from 'immutable'
import * as actions from 'actions/result'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ITEM_LIST:
      return state.merge({list: action.payload.list}).update('page', page => page.merge(action.payload.page))
    case actions.ADD_ITEM_LIST:
      return state.update('list', list => list.concat(fromJS(action.payload.list))).update('page', page => page.merge(action.payload.page))
    // case actions.UPDATE_PAGE:
    //   return state.update('page', page => page.merge(action.payload))
    default:
      return state
  }
}

const initState = {
  list: [],         // {firstPageUrl, marketPrice, productId, productName}
  page: {
    currentPage: 1,
    pageSize: 10
  }
}
