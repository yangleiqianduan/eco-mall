import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const ensureInfo = this.props.data || []
    return <div styleName='wrap'>
      <h2>售后保障</h2>
      <ul>
        {
          ensureInfo.map((item, i) => <li key={i}>
            <div styleName='picWrap'><img src={item.icon} /></div>
            <div>
              <p styleName='tit'>{item.tit}</p>
              <p styleName='info'>{item.info}</p>
            </div>
          </li>)
        }
      </ul>
    </div>
  }
}
