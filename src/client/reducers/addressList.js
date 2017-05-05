import { fromJS } from 'immutable'
import * as actions from 'actions/addressList'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_LIST:
      return state.merge({list: action.payload})
    default:
      return state
  }
}

const initState = {
  list: []
}
