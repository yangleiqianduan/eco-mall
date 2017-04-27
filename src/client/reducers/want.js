import { fromJS } from 'immutable'

import * as actions from 'actions/want'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_TEXT:
      return state.set('text', action.payload)
    case actions.CLEAR_DATA:
      return state.setIn(['imgList'], fromJS([])).setIn(['text'], '')
    case actions.ADD_IMAGE:
      return state.updateIn(['imgList'], list => {
        let nl = list.toJS()
        nl.push(action.payload)
        return fromJS(nl)
      })
    case actions.DEL_IMAGE:
      return state.update('imgList', imgs => imgs.delete(action.payload))
    default:
      return state
  }
}

const initState = {
  text: '',
  imgList: []
}
