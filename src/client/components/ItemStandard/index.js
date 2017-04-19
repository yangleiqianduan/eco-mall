import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const goodsStandard = this.props.data || []
    return <div styleName='wrap'>
      <h2>规则参数</h2>
      <ul>
        {
          goodsStandard.map((item, i) => {
            return <li key={i} styleName={item.long && 'long'}>
              <p styleName='tit'>{item.key}：</p>
              <p>{item.value}</p>
            </li>
          })
        }
      </ul>
    </div>
  }
}
