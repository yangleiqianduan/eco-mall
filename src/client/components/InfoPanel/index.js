import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Icon from 'components/Icons'

import styles from './index.styl'
import classNames from 'classnames/bind'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  static propTypes = {
    show: PropTypes.bool
  }

  getInfoPannelList = (data, type) => {
    let list = []
    if (type === 1) {
      list = data.service_assurance_info.map(item => ({
        label: item.service_assurance_name,
        value: item.service_detail
      }))
    } else if (type === 2) {
      list = data.product_attribute_info.spu_attribute_info.map(item => ({
        label: item.spu_attribute_key_name,
        value: item.spu_attribute_value_info.map(t => t.value).join('，')
      }))
    }
    return list
  }

  render () {
    const { show, onClose, title, data, type } = this.props
    const list = this.getInfoPannelList(data, type)
    return <div styleName='wrap'>
      {
      show
      ? <div styleName='cover' onClick={onClose} />
      : null
      }
      <div styleName={show ? 'infoContainer show' : 'infoContainer hide'}>
        <div styleName='title'>
          <h2>{title}</h2>
          <div styleName='close' onClick={onClose}><Icon icon='layerClose' width={40} /></div>
        </div>
        <ul styleName='content'>
          {
          list.map((item, i) => <li key={i} styleName={classNames({service: type === 1, param: type === 2})}>
            <div styleName='label'>{type === 1 ? <div><span styleName='dot' /></div> : null}{item.label}</div>
            <div styleName='value'>{item.value}</div>
          </li>)
          }
        </ul>
      </div>
    </div>
  }
}
