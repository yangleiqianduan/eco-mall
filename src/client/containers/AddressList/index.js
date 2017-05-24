import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'

import Icon from 'components/Icons/'
import Button from 'components/Button/'
import { Link } from 'react-router-dom'

import {
  getAddressList,
  toEditAddress,
  deleteAddress,
  setDefault,
  UPDATE_CHOOSE_ADDRESS_ACTION
} from 'actions/addressList'

// import { alert } from 'actions/'

@CSSModules(styles, { allowMultiple: true })
export class AddressList extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getAddressList())
  }

  handleEditAddress = (e, address) => {
    e.stopPropagation()
    this.props.dispatch(toEditAddress(address))
  }
  hadnleDeleteAddress = (e, id) => {
    e.stopPropagation()
    if (window.confirm('确认删除该收货地址？')) {
      this.props.dispatch(deleteAddress(id))
    }
    // this.props.dispatch(alert({
    //   text: '确认删除该收货地址？',
    //   type: 'confirm',
    //   onSure: () => {
    //     this.props.dispatch(deleteAddress(id))
    //     this.props.dispatch(alert({show: false}))
    //   }
    // }))
  }
  handleSetDefault = (e, id) => {
    e.stopPropagation()
    this.props.dispatch(setDefault(id))
  }
  chooseAddress = (index) => {
    if (!this.props.location.query.choose) return false
    this.props.dispatch(UPDATE_CHOOSE_ADDRESS_ACTION(index))
    window.history.back()
  }

  render () {
    const { list } = this.props.data.toJS()
    return <div styleName='wrap'>
      {
        list.map((a, i) => <div key={i} styleName='pannel' onClick={(e) => this.chooseAddress(i)}>
          <section styleName='header'>{a.receiverName}&nbsp;{a.phoneNumber}</section>
          <section styleName='content'>{a.provinceName} {a.cityName} {a.areaName} {a.detailAddress}</section>
          <hr styleName='split' />
          <section styleName='footer'>
            <div styleName='setDefaultArea'><span onClick={(e) => this.handleSetDefault(e, a.id)}><Icon icon={classNames({checked: a.isDefault, unChecked: !a.isDefault})} width={18} />&nbsp;{a.isDefault ? '默认地址' : '设为默认地址'}</span></div>
            <div>
              <a styleName='edit' onClick={(e) => this.handleEditAddress(e, a)}>编辑</a>
              <a styleName='delete' onClick={(e) => this.hadnleDeleteAddress(e, a.id)}>删除</a>
            </div>
          </section>
        </div>)
      }
      <div styleName='bottom'>
        <Link to='/address'><Button>新建地址</Button></Link>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.addressList
})

export default connect(mapStateToProps)(AddressList)
