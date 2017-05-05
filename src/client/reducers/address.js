import { fromJS } from 'immutable'
import * as actions from 'actions/address'

import { subStrByByte } from 'common/utils'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_FORM_INPUT:
      return state.setIn([action.key, 'value'], action.payload)
    case actions.UPDATE_SELECT:
      return state.updateIn(action.map, data => data.merge(action.payload))
    case actions.INIT_ADDRESS:
      return state.mergeDeep(action.payload)
    case actions.TO_INIT_ADDRESS:
      return state.merge(initState)
    default:
      return state
  }
}

const initState = {
  id: null,
  receiverName: {
    value: '',
    pattern: (v) => subStrByByte(v, 50, false) === v,
    errorMsg: '收货人不能超过50个字',
    emptyMsg: '收货人不能为空'
  },
  mobile: {
    value: '',
    pattern: /^1[34578]\d{9}$/,
    errorMsg: '请输入正确的手机号',
    emptyMsg: '联系电话不能为空'
  },
  provinceId: {
    value: '',
    label: '省份',
    emptyMsg: '请选择对应省份'
  },
  cityCode: {
    value: '',
    label: '城市',
    emptyMsg: '请选择对应城市'
  },
  addressDetail: {
    value: '',
    pattern: (v) => subStrByByte(v, 100, false) === v,
    errorMsg: '详细地址不能超过100字',
    emptyMsg: '详细地址不能为空'
  },
  isDefault: {
    value: 1
  },
  areaSelect: {
    open: false,
    current: 0,
    data: [{
      value: '',
      label: '省份',
      options: []
    }, {
      value: '',
      label: '城市',
      options: []
    }]
  }
}
