import fetch from 'common/fetch'
import * as api from 'constants/api'
import { isEmpty } from 'common/utils'
import {
  showToast,
  UPDATE_LOADING_ACTION
  // changeRouter
} from './index'

export const UPDATE_FORM_INPUT = 'UPDATE_FORM_INPUT_ADDRESS'
export const UPDATE_FORM_INPUT_ACTION = (key, payload) => ({
  type: UPDATE_FORM_INPUT,
  key,
  payload
})

export const UPDATE_SELECT = 'UPDATE_SELECT_ADDRESS'
export const UPDATE_SELECT_ACTION = (map, payload) => ({
  type: UPDATE_SELECT,
  map,
  payload
})

export const TO_INIT_ADDRESS = 'TO_INIT_ADDRESS_ADDRESS'
export const TO_INIT_ADDRESS_ACTION = () => ({
  type: TO_INIT_ADDRESS
})

export const INIT_ADDRESS = 'INIT_ADDRESS_ADDRESS'
export const INIT_ADDRESS_ACTION = (payload) => ({
  type: INIT_ADDRESS,
  payload
})

const getOptions = (param) => fetch(api.getArea, {param})

export const initAddress = payload => async dispatch => {
  // payload = {
  //   id: 8,
  //   receiverName: '王聪',
  //   provinceCode: 110000,
  //   cityCode: 110000,
  //   detailAddress: '阿道夫',
  //   phoneNumber: '18810541172',
  //   postcode: null,
  //   isDefault: 1,
  //   provinceName: '北京市',
  //   cityName: '北京市'
  // }
  dispatch(INIT_ADDRESS_ACTION({
    id: payload.id,
    receiverName: {value: payload.receiverName},
    mobile: {value: payload.phoneNumber},
    provinceId: {value: payload.provinceCode, label: payload.provinceName},
    cityCode: {value: payload.cityCode, label: payload.cityName},
    addressDetail: {value: payload.detailAddress},
    isDefault: {value: payload.isDefault}
  }))
  dispatch(UPDATE_SELECT_ACTION(['areaSelect', 'data', 0], {
    value: payload.provinceCode,
    label: payload.provinceName
  }))
  const result = await getOptions({type: '1', province_id: payload.provinceCode})
  dispatch(UPDATE_SELECT_ACTION(['areaSelect', 'data', 1], {
    value: payload.cityCode,
    label: payload.cityName,
    options: (result.data || []).map(op => ({label: op.name, value: op.gbCode}))
  }))
}

export const updateSelectValue = payload => async dispatch => {
  const { current, data, select } = payload
  const isLast = current === (data.length - 1)
  dispatch(UPDATE_SELECT_ACTION(['areaSelect'], {
    current: isLast ? current : (current + 1)             // 如果点击的是最后一个，不用移到下一个选项
  }))
  if (current === 0) {                                    // 如果点击第一个，清空第二个的选择
    dispatch(UPDATE_SELECT_ACTION(['areaSelect', 'data', 1], {value: '', label: '城市'}))
  }
  dispatch(UPDATE_SELECT_ACTION(['areaSelect', 'data', current], select))
  if (!isLast) {
    const result = await getOptions({type: '1', province_id: select.value})
    dispatch(UPDATE_SELECT_ACTION(['areaSelect', 'data', current + 1], {
      options: (result.data || []).map(op => ({label: op.name, value: op.gbCode}))
    }))
  }
}

export const getProvience = data => async dispatch => {
  const result = await getOptions({type: '0'})
  dispatch(UPDATE_SELECT_ACTION(['areaSelect', 'data', 0], {
    options: (result.data || []).map(op => ({label: op.name, value: op.gbCode}))
  }))
}

export const selectOnSure = data => dispatch => {
  dispatch(UPDATE_SELECT_ACTION([], {provinceId: {value: data[0].value, label: data[0].label}, cityCode: {value: data[1].value, label: data[1].label}}))
  dispatch(UPDATE_SELECT_ACTION(['areaSelect'], {open: false}))
}

export const submit = (data, cb) => async dispatch => {
  const params = [
    ['receiverName', 'receiver_name'],
    ['mobile', 'mobile'],
    ['provinceId', 'province_id'],
    ['cityCode', 'city_code'],
    ['addressDetail', 'address_detail'],
    ['isDefault', 'is_default']
  ]
  const reqParams = {}
  let url = api.addAddress
  for (let i = 0; i < params.length; i++) {
    const current = data[params[i][0]]
    if (isEmpty(current.value)) {                   // 为空校验
      return dispatch(showToast(current.emptyMsg))
    }
    if (current.pattern) {                          // 格式校验
      if ((current.pattern.constructor === Function && !current.pattern(current.value)) || (current.pattern.constructor === RegExp && !current.pattern.test(current.value))) {
        return dispatch(showToast(current.errorMsg))
      }
    }
    reqParams[params[i][1]] = current.value         // 校验通过
  }
  if (data.id) {                                    // 如果是编辑 增加编辑参数
    url = api.editAddress
    reqParams.deliver_address_id = data.id
  }
  dispatch(UPDATE_LOADING_ACTION(true))
  const result = await fetch(url, {param: reqParams, method: 'post', formData: true})
  dispatch(UPDATE_LOADING_ACTION(false))
  if (result.code === '1') {
    // dispatch(changeRouter({to: 'addressList', replace: true}))
    window.history.back()
  } else {
    dispatch(showToast(result.msg || '保存失败'))
  }
}
