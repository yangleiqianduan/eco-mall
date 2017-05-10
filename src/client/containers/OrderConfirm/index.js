import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
// import classNames from 'classnames/bind'

import LabelItem from 'components/LabelItem/'
import Icon from 'components/Icons/'

@CSSModules(styles, { allowMultiple: true })
export class OrderConfirm extends PureComponent {
  render () {
    const { data } = this.props.data.toJS()
    const { itemsList, totalAmount } = data
    return <div styleName='wrap'>
      <section styleName='pannel address'>
        <div styleName='icon'><Icon icon='location' width={16} /></div>
        <div>
          <div>王聪 18810541172</div>
          <div styleName='detail'>
            <div styleName='addressDetail'>北京市 朝阳区 太阳宫街道四环到五环102号院7号楼 1单元1501</div>
            <div><Icon icon='right' /></div>
          </div>
        </div>
      </section>
      <section styleName='content pannel'>
        {itemsList.map((item, i) => <LabelItem vertical={false} data={item} key={i} noBorder={i === (itemsList.length - 1)} />)}
      </section>
      <section styleName='footer'>
        <div styleName='priceArea'>总计:￥{totalAmount}</div>
        <div>下单</div>
      </section>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.orderConfirm
})

export default connect(mapStateToProps)(OrderConfirm)
