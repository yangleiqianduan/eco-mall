import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import { cancelOrderPhoneNumber } from 'constants/text'

import * as actions from 'actions/cancelOrder'
import { changeRouter } from 'actions/'
import { isAndroid } from 'common/utils'

@CSSModules(styles, { allowMultiple: true })
export class CancelOrder extends PureComponent {
  componentDidMount () {
    const query = this.props.location.query
    this.props.dispatch(actions.getOrderDetail(query))
  }
  confirmTel = (e) => {
    e.stopPropagation()
    if (window.confirm(`是否拨打电话：${cancelOrderPhoneNumber}`)) {
      if (window.IS_APP && isAndroid) {
        return window.nativeBridge.actionWithUrl(`lianjia://phonenum/customerservices?telephone=${cancelOrderPhoneNumber}`)
      }
      this.refs.tel.click()
    }
  }
  
  handleCancel = (id, dec) => {
    this.props.dispatch(actions.cancelOrder(id, dec))
  }

  changeRemark = (value) => {
    this.props.dispatch(actions.UPDATE_REMARK_VALUE_ACTION(value))
  }

  render () {
    const data = this.props.data.toJS() || {}
    const { orderId, payInfo } = data.data

    return <div>
      <section styleName='amountInfo'>
        <h3>退款金额：</h3>
        <p>￥{payInfo.payAmount}</p>
      </section>
      <section styleName='remarkInfo'>
        <textarea placeholder='请输入退款备注' styleName='remark' data={data.remark}
                  onChange={(e) => this.changeRemark(e.target.value)} />
      </section>
      <section styleName='explainInfo'>
        <p>退款说明：</p>
        <p>1.若确认未发货，链家家居商城会在24小时内处理您的退款申请</p>
        <p>2.您的退款将被原路返还至您的账户</p>
        <p>3.不同的银行处理时间不同，预计1-5个工作日到账</p>
        <p>4.有任何问题都可以拨打<span styleName='tel' onClick={(e) => {this.confirmTel(e)}}>010-2314454</span>在线解答</p>
      </section>
      <section styleName='footer'>
        <div styleName='btn' onClick={() => {this.handleCancel(orderId, data.remark)}}>提交</div>
      </section>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data:state.cancelOrder
})

export default connect(mapStateToProps)(CancelOrder)
