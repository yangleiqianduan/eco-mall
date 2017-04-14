import { fromJS } from 'immutable'
import * as actionType from 'actions/success'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actionType.SELECT_ITEM:
      return state.updateIn(['selected'], list => list.includes(action.payload) ? list.filter(i => i != action.payload) : list.push(action.payload))
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
  selected: ['价格'],
  other: ''
}
