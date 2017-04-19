import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    const baseInfo = this.props.data || []
    return <div styleName='wrap'>
      <header>
        <div styleName='left'>
          <h1>{baseInfo.title}</h1>
          {
            baseInfo.tags
            ? <div styleName='tags'>
              {
                baseInfo.tags.map((item, i) => {
                  return <span styleName='item' key={i}>{item} ></span>
                })
              }
            </div>
            : <div styleName='tags' />
          }
        </div>
        <div styleName='right'>
          <p styleName='curPrice'>￥{baseInfo.curPrice}</p>
          <p styleName='normalPrice'>市场价：￥{baseInfo.normalPrice}</p>
        </div>
      </header>
      <section styleName='main'>
        <div>快递：{baseInfo.farePrice}</div>
        <div>库存：{baseInfo.count}</div>
        <div>发货：{baseInfo.adress}</div>
      </section>
      <footer>
        <ul>
          {
            baseInfo.tips.map((item, i) => <li key={i} styleName='item'>{item}</li>)
          }
        </ul>
      </footer>
    </div>
  }
}
