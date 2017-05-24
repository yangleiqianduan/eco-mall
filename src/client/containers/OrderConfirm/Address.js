import React from 'react'

import CSSModules from 'react-css-modules'
import styles from './Address.styl'
// import classNames from 'classnames/bind'

import { Link } from 'react-router-dom'
import Icon from 'components/Icons/'

export default CSSModules(({ data }) => <div styleName='address'>
  <div styleName='icon'><Icon icon='location' width={14} /></div>
  <div styleName='right'>
    {
      data
      ? <Link to='/addressList?choose=1'>
        <div>{data.receiverName} {data.phoneNumber}</div>
        <div styleName='detail'>
          <div styleName='addressDetail'>{data.provinceName} {data.cityName} {data.areaName} {data.detailAddress}</div>
          <div styleName='next'><Icon icon='right' /></div>
        </div>
      </Link>
      : <Link to='/address'>
        <div styleName='detail'>
          <div styleName='addressDetail'>暂无收货地址，点击添加</div>
          <div styleName='next oneLine'><Icon icon='right' /></div>
        </div>
      </Link>
    }
  </div>
</div>, styles, { allowMultiple: true })
