import { fromJS } from 'immutable'
import * as actions from 'actions/vote'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ITEM_DETAIL:
      return state.merge({reqData: action.payload})
    default:
      return state
  }
}

const initState = {

}
