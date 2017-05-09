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
  setDefault
} from 'actions/addressList'

import { alert } from 'actions/'

@CSSModules(styles, { allowMultiple: true })
export class AddressList extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getAddressList())
  }

  handleEditAddress = (address) => this.props.dispatch(toEditAddress(address))
  hadnleDeleteAddress = (id) => {
    this.props.dispatch(alert({
      text: '确认删除该收货地址？',
      type: 'confirm',
      onSure: () => {
        this.props.dispatch(deleteAddress(id))
        this.props.dispatch(alert({show: false}))
      }
    }))
  }
  handleSetDefault = (id) => this.props.dispatch(setDefault(id))

  render () {
    const { list } = this.props.data.toJS()
    console.log(list)
    return <div styleName='wrap'>
      {
        list.map((a, i) => <div key={i} styleName='pannel'>
          <section styleName='header'>{a.receiverName}&nbsp;{a.phoneNumber}</section>
          <section styleName='content'>{a.provinceName} {a.cityName} {a.detailAddress}</section>
          <hr styleName='split' />
          <section styleName='footer'>
            <div styleName='setDefaultArea'><span onClick={() => this.handleSetDefault(a.id)}><Icon icon={classNames({checked: a.isDefault, unChecked: !a.isDefault})} width={18} />&nbsp;{a.isDefault ? '默认地址' : '设为默认地址'}</span></div>
            <div>
              <a styleName='edit' onClick={() => this.handleEditAddress(a)}>编辑</a>
              <a styleName='delete' onClick={() => this.hadnleDeleteAddress(a.id)}>删除</a>
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
