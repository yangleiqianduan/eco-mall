import { fromJS } from 'immutable'
import * as actions from 'actions/index'

export default (state = initState, action) => {
  switch (action.type) {
    case actions.CHANGE_ROUTER:
      return state.merge({
        transRoute: action.payload
      })

    case actions.UPDATE_LOADING:
      return state.merge({
        loading: !!action.payload
      })

    case actions.UPDATE_USER:
      return state.merge({
        userInfo: action.payload
      })

    case actions.SHOW_SEARCH:
      return state.merge({
        showSearch: action.payload
      })

    case actions.UPDATE_MODAL:
      return state.merge({
        modal: action.payload
      })

    case actions.UPDATE_CATEGPRYLIST:
      return state.merge({
        categoryList: action.payload.map((item) => Object.assign({}, item, {icon: mapName2Icon(item)}))
      })

    case actions.UPDATE_SHOPCART_COUNT:
      return state.set('shoppingCartCount', action.payload)

    case actions.UPDATE_TOAST:
      return state.merge({
        toast: action.payload
      })

    case actions.UPDATE_CART_COUNT:
      return state.merge({
        cartCount: action.payload
      })

    case actions.UPDATE_USERINFO:
      return state.merge({
        userInfo: action.payload
      })

    case actions.UPDATE_ORDER_COUNT:
    // 更新订单条数
      return state.merge({
        orderCount: action.payload
      })

    default:
      return state
  }
}

const mapName2Icon = (icon) => {
  switch (icon.categoryName) {
    case '椅凳':
      return 'chari'
    case '柜架':
      return 'wooden'
    case '睡床':
      return 'bedroom'
    case '床垫':
      return 'mattess'
  }
}

const initState = fromJS({
  loading: false,
  loaded: {},
  toast: {
    show: false,
    text: ''
  },
  orderCount: [],
  userInfo: {},
  modal: {
    show: false,
    overlap: true,
    onSure: () => {},
    onCancel: () => {},
    onClose: () => {},
    type: 'alert',
    text: ''
  },
  categoryList: [
    // {'categoryId': 100, 'categoryName': '卧室床品', 'icon': 'bedroom'}
  ],
  transRoute: {
    to: ''
  },
  cartCount: 0
  // orderInfo: {
  //   price: '2310',
  //   info: '预定111111111111112222222222333333',
  //   img: 'https://gw.alicdn.com/imgextra/i1/833274142/TB2IaQTX00opuFjSZFxXXaDNVXa_!!833274142.jpg_970x970q50s150.jpg_.webp',
  //   content: [
  //     {label: '手机号', type: 'text', value: '', key: 'user_id'},
  //     {label: '系统号', type: 'text', value: '', key: 'phone'}
  //   ]
  // }
})
