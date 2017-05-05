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
  deleteAddress
} from 'actions/addressList'

@CSSModules(styles, { allowMultiple: true })
export class AddressList extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getAddressList())
  }

  handleEditAddress = (address) => this.props.dispatch(toEditAddress(address))
  hadnleDeleteAddress = (id) => {
    if (window.confirm('确认删除该收货地址？')) this.props.dispatch(deleteAddress(id))
  }

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
            <div styleName='setDefaultArea'><Icon icon={classNames({checked: a.isDefault, unChecked: !a.isDefault})} width={18} />&nbsp;默认地址</div>
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
