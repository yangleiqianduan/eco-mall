import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from 'components/Icons/'

import * as actions from 'actions/logistics'

@CSSModules(styles, { allowMultiple: true })
export class Logistics extends PureComponent {

  componentDidMount() {
    const query = this.props.location.query
    this.props.dispatch(actions.getLogisticsList(query))
  }

  render () {
    const logistics = this.props.logistics.toJS() || {}
    const { list , isEnd } = logistics.data

    return <div styleName='wrap'>
      <div styleName='header'>
        <div styleName='express_logo'><img src='' /></div>
        <div styleName='express_info'>
          <p>物流公司：<span>顺丰快递</span></p>
          <p>订单&emsp;号：<span>1981277321</span></p>
        </div>
      </div>
      <div styleName='track'>
        <div styleName='top'></div>
        {isEnd ? <span styleName='icon'><Icon icon='checked' width="16" /></span> : null}
        {
          list.map((item, i) => <div key={i} styleName='item'>
            <div styleName='deal'>
              <span styleName={list.length-1 === i ? 'step last' : 'step'}>
                {list.length - 1 === i ? <span styleName='mask' /> : null}
                <span styleName='circleOuter'>
                  <span styleName='circle' />
                </span>
                <div styleName={i === 0 ? 'content status' : 'content'}>
                  <span>{item.content}</span>                
                </div>
                <div styleName='time'>
                  {item.time}
                </div>
              </span>
            </div>
          </div>)
        }
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  logistics: state.logistics
})

export default connect(mapStateToProps)(Logistics)
