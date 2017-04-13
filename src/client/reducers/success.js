import { fromJS } from 'immutable'
import * as actions from 'actions/home'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.SELECT_ITEM:
      return state.set({'select': action.payload})
    default:
      return state
  }
}

const initState = {
  reason: [
    '价格',
    '材质',
    '设计',
    '品牌',
    '风格',
    '商品介绍',
    '商品性质',
    '有实际需要'
  ],
  selected: '',
  other: ''
}
