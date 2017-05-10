import { fromJS } from 'immutable'
import * as actions from 'actions/voteList'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_LIST:
      return state.merge({
        list: action.payload
      })
    default:
      return state
  }
}

const initState = {
  list: []
  // list内的数据结构
  // {
  //   voteId: 1493115501333,
  //   title: 'qiye_delete_modify_026',
  //   description: 'qiye_desc_modify',
  //   coverImage: 'http://img.ljcdn.com/lmall/aa22cb1c-de2f-47e7-820b-3a13b261e0e3.jpg',
  //   voteQuestion: null
  // }
}
