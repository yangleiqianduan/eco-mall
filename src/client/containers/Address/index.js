import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Switch from 'components/Switch/'
import Button from 'components/Button/'
import Icon from 'components/Icons'
import FullSelect from 'components/FullSelect/'

import {
  UPDATE_FORM_INPUT_ACTION,
  UPDATE_SELECT_ACTION,
  updateSelectValue,
  getProvience,
  selectOnSure,
  submit,
  TO_INIT_ADDRESS_ACTION
} from 'actions/address'

@CSSModules(styles, { allowMultiple: true })
export class Address extends PureComponent {
  state = {
    isDefault: false
  }

  handleSubmit = (data) => {
    this.props.dispatch(submit(data))
  }

  handleChangeInput = (key, value) => this.props.dispatch(UPDATE_FORM_INPUT_ACTION(key, value))

  openSelect = (payload) => this.props.dispatch(UPDATE_SELECT_ACTION(['areaSelect'], {open: payload}))

  changeSelect = (map, payload) => this.props.dispatch(UPDATE_SELECT_ACTION(map, payload))

  changeSelectValue = (payload) => this.props.dispatch(updateSelectValue(payload))

  selectOnSure = (payload) => this.props.dispatch(selectOnSure(payload))

  componentWillMount () {
    if (this.props.location.query.id) {
      document.title = '编辑地址'
    }
  }

  componentDidMount () {
    this.props.dispatch(getProvience())           // 获取所有省
  }

  componentWillUnmount () {
    this.props.dispatch(TO_INIT_ADDRESS_ACTION())
  }

  render () {
    const data = this.props.data.toJS()
    return <div styleName='wrap'>
      <section styleName='form'>
        <div styleName='info'>
          <label styleName='label'>
            <span styleName='inputLabel'>收&nbsp;&nbsp;货&nbsp;&nbsp;人</span>：
            <input type='text' value={data.receiverName.value} onChange={(e) => this.handleChangeInput('receiverName', e.target.value)} />
          </label>
        </div>
        <div styleName='info'>
          <label styleName='label'>
            <span styleName='inputLabel'>手机号码</span>：
            <input type='tel' value={data.mobile.value} onChange={(e) => this.handleChangeInput('mobile', e.target.value)} />
          </label>
        </div>
        <div styleName='info'>
          <div onClick={() => this.openSelect(true)}>
            {data.provinceId.value && data.cityCode.value
              ? <span>{data.provinceId.label}&nbsp;{data.cityCode.label}</span>
              : <span><span styleName='inputLabel'>所在地区</span><span>：</span></span>
            }
            <div styleName='right'><Icon icon='right' /></div>
          </div>
        </div>
        <div styleName='address'>
          <textarea placeholder='填写详细地址，不少于5个字' styleName='textarea' value={data.addressDetail.value} onChange={(e) => this.handleChangeInput('addressDetail', e.target.value)} />
        </div>
      </section>
      <section styleName='panel'>
        <div styleName='long'>设置为默认地址</div>
        <Switch value={data.isDefault.value} onChange={(v) => this.handleChangeInput('isDefault', v + 0)} />
      </section>
      <div styleName='btnSave'>
        <Button onClick={() => this.handleSubmit(data)}>保存</Button>
      </div>
      <FullSelect {...data.areaSelect} onChange={this.changeSelect} onChangeValue={this.changeSelectValue} onSure={this.selectOnSure} onClose={() => this.openSelect(false)} />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.address
})

export default connect(mapStateToProps)(Address)
