import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  render () {
    // 所有的保障类型List（在FE维护）
    const { ensureInfo, reqData } = this.props.data || []
    // 具体产品拥有的
    let choose = []
    reqData.service_assurance_info.map(item => {
      choose.push(item.service_assurance_code)
    })
    let curEnsureInfo = []
    choose.map((chooseType, i) => {
      const chooseItem = ensureInfo.filter(item => item.type === chooseType)
      curEnsureInfo.push(chooseItem[0])
    })

    return <div styleName='wrap'>
      <h2>售后保障</h2>
      <ul>
        {
          curEnsureInfo.map((item, i) => <li key={i}>
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
