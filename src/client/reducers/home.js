import { fromJS } from 'immutable'
import * as actions from 'actions/home'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_HOT_ITEM:
      return state.merge({data: action.payload})
    case actions.UPDATE_COLLOCATION:
      return state.merge({collocation: action.payload})
    case actions.UPDATE_HOT_ITEMS:
      return state.merge({hotItems: action.payload})
    case actions.UPDATE_BANNER:
      return state.merge({banner: action.payload})
    default:
      return state
  }
}

const protocol = window.location.protocol

const initState = {
  banner: [],
  wantList: [
    {img_url: protocol + '//img.ljcdn.com/lmall/f85ce159-7d98-460e-a0b2-ccb5dc8f052b.png.408x224.png', redirect_url: '/voteList'},
    {img_url: protocol + '//img.ljcdn.com/lmall/aba3e731-e9a6-4a6a-b477-0c90b4484c2f.png.416x224.png', redirect_url: '/want'}
  ],
  collocation: [],    // {picture, productMixDescription, productMixId, productMixName}
  hotItems: []        // {firstPageUrl, marketPrice, productId, productName}
}
