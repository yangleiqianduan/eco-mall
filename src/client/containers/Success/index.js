import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import SelectItems from 'components/SelectItems/'
import * as actions from 'actions/success'

@CSSModules(styles, { allowMultiple: true })
export class Success extends PureComponent {

  changeItem = (value) => {
    console.log(value, 'sss')
    this.props.dispatch(actions.selectItem(value));
    console.log(this.props.data.toJS().selected)
  };
  render () {
    const { reason, selected } = this.props.data.toJS();
    let limited = 3;
    return <div styleName='wrap'>
      <div styleName='title'>恭喜你预约成功</div>
      <div styleName='tip'>开卖前会短信通知</div>
      <div styleName='reason'>
        <div styleName='head'>商品的什么特点吸引了你？</div>
        <div styleName='tip'>最多可以选3个</div>
        <SelectItems list={reason} selected={selected} limited={limited} onChange={this.changeItem.bind(this)}/>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  data: state.success
})

export default connect(mapStateToProps)(Success)