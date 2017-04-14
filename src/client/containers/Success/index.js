import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import SelectItems from 'components/SelectItems/'
import * as actions from 'actions/success'

@CSSModules(styles, { allowMultiple: true })
export class Success extends PureComponent {

  changeItem = (value) => {
    this.props.dispatch(actions.selectItem(value));
  };
  render () {
    const { reason, selected } = this.props.data.toJS();
    let limited = 3;
    return <div styleName='wrap'>
      <div styleName='title'>恭喜你预约成功</div>
      <div styleName='tip'>开卖前会短信通知</div>
      <div styleName='reason'>
        <div styleName='line left'></div>
        <div styleName='head'>商品的什么特点吸引了你？</div>
        <div styleName='line right'></div>
        <div styleName='tip'>最多可以选3个</div>
        <SelectItems list={reason} selected={selected} limited={limited} onChange={this.changeItem.bind(this)}/>
        <div styleName='tip'>以上皆不是，有其他理由</div>
        <textarea/>
        <div styleName='submit'>提交</div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  data: state.success
})

export default connect(mapStateToProps)(Success)